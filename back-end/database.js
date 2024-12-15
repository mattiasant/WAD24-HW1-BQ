// database.js
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "homeworkiv",
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
                urllink VARCHAR(200)
            );
        `);
    } finally {
        client.release();
    }
};

// Add a new post
const addPost = async (title, body, urllink) => {
    const result = await pool.query(
        'INSERT INTO posttable (title, body, urllink) VALUES ($1, $2, $3) RETURNING *;',
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
const updatePost = async (id, title, body, urllink) => {
    const result = await pool.query(
        'UPDATE posttable SET title = $2, body = $3, urllink = $4 WHERE id = $1 RETURNING *;',
        [id, title, body, urllink]
    );
    return result.rows[0];
};

// Delete a post
const deletePost = async (id) => {
    await pool.query('DELETE FROM posttable WHERE id = $1;', [id]);
};

module.exports = {
    pool,
    createPostTable,
    addPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
