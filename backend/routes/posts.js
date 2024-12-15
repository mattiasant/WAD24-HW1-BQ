const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', error: err });
    }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching post', error: err });
    }
});

// Add a new post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: 'Error saving post', error: err });
    }
});

// Delete all posts
router.delete('/', async (req, res) => {
    try {
        await Post.deleteMany();
        res.status(200).json({ message: 'All posts deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting posts', error: err });
    }
});

module.exports = router;
