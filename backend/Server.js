const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Create an Express app
const app = express();
const port = 3000; // You can change the port if needed

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// MongoDB Connection URL (replace with your own MongoDB URI)
const mongoUri = 'mongodb://localhost:27017'; // Or use MongoDB Atlas URL
const dbName = 'your-database-name';
let db;

// Connect to MongoDB
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define the posts collection
const postsCollection = db ? db.collection('posts') : null;

// Fetch all posts
app.get('/api/posts', (req, res) => {
    if (!postsCollection) {
        return res.status(500).send('Database not connected');
    }
    postsCollection.find().toArray()
        .then((posts) => {
            res.json(posts);
        })
        .catch((error) => {
            res.status(500).send('Error fetching posts');
        });
});

// Add a new post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Title and content are required');
    }

    const newPost = { title, content, createdAt: new Date() };

    postsCollection.insertOne(newPost)
        .then((result) => {
            res.status(201).json(result.ops[0]);
        })
        .catch((error) => {
            res.status(500).send('Error adding post');
        });
});

// Delete all posts
app.delete('/api/posts', (req, res) => {
    if (!postsCollection) {
        return res.status(500).send('Database not connected');
    }

    postsCollection.deleteMany({})
        .then(() => {
            res.status(200).send('All posts deleted');
        })
        .catch((error) => {
            res.status(500).send('Error deleting posts');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
