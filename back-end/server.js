const express = require('express');
const {pool, createUsertable, createPostTable} = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const app = express();
const posts = [];

createUsertable().catch(console.error);
createPostTable().catch(console.error);

// Middleware
app.use(cors({origin: 'http://localhost:8080', credentials: true}));
app.use(express.json());
app.use(cookieParser());

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, 'ourSecretKey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// Generate JWT function
const generateToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, 'your_jwt_secret', {
        expiresIn: '1h',
    });
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(401).send('Invalid Credentials');
    }

    try {
        // Query the database to find the user by email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        // If no user is found with the given email, return an error
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const user = result.rows[0];

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match, return an error
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        // Generate a JWT token for the user
        const token = generateToken(user);

        // Optionally set the token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Return the user data (without the password) and the JWT token
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

app.get('/posts', async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows); // Return the posts from the database
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Failed to fetch posts from database'});
    }
});


app.post('/like-post', async (req, res) => {
    const { id } = req.body; // Extract post ID from request body

    if (!id) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    try {
        // Increment the 'likes' count for the specified post
        const result = await pool.query(
            'UPDATE posttable SET likes = likes + 1 WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Respond with the updated post data
        res.status(200).json({ success: true, post: result.rows[0] });
    } catch (error) {
        console.error('Error updating likes:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// Route for user signup
app.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'Email and password are required.'});
    }

    try {
        // Check if user already exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            return res.status(400).json({error: 'Email is already in use.'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );

        // Generate a JWT token for the user
        const token = generateToken(newUser.rows[0]);

        // Set token in a cookie (optional)
        res.cookie('token', token, {httpOnly: true, secure: false}); // secure: true for production

        // Respond with the new user data (exclude password)
        const user = {
            id: newUser.rows[0].id,
            email: newUser.rows[0].email,
        };
        res.status(201).json({user, token});
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({error: 'Server error during signup.'});
    }
});

app.post('/api/posts/', authenticate, async (req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(title, body, urllink) values ($1, $2, $3)    RETURNING*", [post.title, post.body, post.urllink]
// $1, $2, $3 are mapped to the first, second and third element of the passed array (post.title, post.body, post.urllink) 
// The RETURNING keyword in PostgreSQL allows returning a value from the insert or update statement.
// using "*" after the RETURNING keyword in PostgreSQL, will return everything
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        // The req.params property is an object containing properties mapped to the named route "parameters". 
        // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
        const {id} = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query( // pool.query runs a single query on the database.
            //$1 is mapped to the first element of { id } (which is just the value of id). 
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]);
// we already know that the row array contains a single element, and here we are trying to access it
        // The res.json() function sends a JSON response. 
        // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/api/posts/:id', authenticate, async (req, res) => {
    try {
        const {id} = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posttable SET (title, body, urllink) = ($2, $3, $4) WHERE id = $1", [id, post.title, post.body, post.urllink]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/posts/:id', authenticate, async (req, res) => {
    try {
        const {id} = req.params; // Get the id from the route parameter
        console.log("Delete request for post with ID:", id);

        // Execute the DELETE query
        const deletepost = await pool.query(
            "DELETE FROM posttable WHERE id = $1 RETURNING *;",
            [id]
        );

        // Check if a post was deleted
        if (deletepost.rowCount === 0) {
            return res.status(404).json({message: "Post not found"});
        }

        // Return success message
        res.status(200).json({message: "Post deleted successfully", deletedPost: deletepost.rows[0]});
    } catch (err) {
        console.error("Error deleting post:", err.message);
        res.status(500).json({error: "Internal server error"});
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token if it's stored as a cookie
    res.status(200).json({ message: 'Logged out successfully' });
});



// Other routes can go here...

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
