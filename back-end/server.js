const express = require('express');
const { pool } = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Generate JWT function
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
        expiresIn: '1h',
    });
};

// Route for user signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Check if user already exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            return res.status(400).json({ error: 'Email is already in use.' });
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
        res.cookie('token', token, { httpOnly: true, secure: false }); // secure: true for production

        // Respond with the new user data (exclude password)
        const user = {
            id: newUser.rows[0].id,
            email: newUser.rows[0].email,
        };
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Server error during signup.' });
    }
});

// Other routes can go here...

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
