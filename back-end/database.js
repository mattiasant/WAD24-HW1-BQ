// database.js
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    database: "homeworkIV",
    host: "localhost",
    port: "5432"
});

// Function to create the post table
const createPostTable = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS posttable (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                body VARCHAR(200) NOT NULL,
                urllink VARCHAR(200),
                likes bigint NOT NULL
            );
        `);
    } finally {
        client.release();
    }
};

//function to create user table
const createUsertable = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            `);
        } finally {
            client.release();
        }
    };

// Add a new post
const addPost = async (title, body, urllink) => {
    const result = await pool.query(
        'INSERT INTO posttable (title, body, urllink, likes) VALUES ($1, $2, $3, $4) RETURNING *;',
        [title, body, urllink]
    );
    return result.rows[0];
};

// Get all posts
const getAllPosts = async () => {
    const result = await pool.query('SELECT * FROM posttable;');
    return result.rows;
};

// Get a single post by ID
const getPostById = async (id) => {
    const result = await pool.query('SELECT * FROM posttable WHERE id = $1;', [id]);
    return result.rows[0];
};

// Update a post
const updatePost = async (id, title, body, urllink, likes) => {
    const result = await pool.query(
        'UPDATE posttable SET title = $2, body = $3, urllink = $4, likes = $5 WHERE id = $1 RETURNING *;',
        [id, title, body, urllink, likes]
    );
    return result.rows[0];
};

const likePost = async (id) => {
    try {
        // Query to fetch the post by ID
        const result = await pool.query('SELECT * FROM posttable WHERE id = $1;', [id]);

        // Check if the post was found
        if (result.rows.length > 0) {
            // Log or process the post, e.g., increment the likes
            const post = result.rows[0];
            console.log('Post found:', post);

            // Example: Increment the "likes" for this post
            const updatedPost = await pool.query(
                'UPDATE posttable SET likes = likes + 1 WHERE id = $1 RETURNING *;',
                [id]
            );

            console.log('Post after liking:', updatedPost.rows[0]);
            return updatedPost.rows[0]; // Return the updated post with incremented likes
        } else {
            console.log('Post not found.');
            return null; // Return null if post not found
        }
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error; // Rethrow error to handle in the calling function
    }
};

// Delete a post
const deletePost = async (id) => {
    await pool.query('DELETE FROM posttable WHERE id = $1;', [id]);
};

module.exports = {
    pool,
    createPostTable,
    createUsertable,
    addPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost
};
