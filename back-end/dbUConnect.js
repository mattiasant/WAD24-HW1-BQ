const { Client } = require("pg");

// Database connection configuration
const dbConfig = {
    host: "localhost",        // Host (replace with your actual host)
    port: 5432,               // Default PostgreSQL port
    user: "postgres",        // PostgreSQL username
    password: "parool",// PostgreSQL password
    database: "homeworkIV" // Name of your database
};

// Create a new client instance
const client = new Client(dbConfig);

// Connect to the database
async function connectToDatabase(options) {
    try {
        await client.connect(options); // Establish the connection
        console.log("Connected to the database!");

        // Example query to verify the connection
        const result = await client.query("SELECT NOW()");
        console.log("Current time from the database:", result.rows[0].now);
    } catch (err) {
        console.error("Error connecting to the database:", err);
    } finally {
        await client.end(); // Close the connection
        console.log("Database connection closed.");
    }
}

connectToDatabase();
