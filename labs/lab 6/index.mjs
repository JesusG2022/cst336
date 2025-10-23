import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// For Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

// Setting up database connection pool
const pool = mysql.createPool({
    host: "miguel-lara.site",
    user: "miguella_webuser",
    password: "Cst-336",
    database: "miguella_quotes",
    connectionLimit: 10,
    waitForConnections: true
});

// Routes
app.get('/', async (req, res) => {
    try {
        const sqlAuthors = `SELECT authorId, firstName, lastName FROM authors ORDER BY lastName`;
        const sqlCategories = `SELECT DISTINCT category FROM quotes`;
        const [authors] = await pool.query(sqlAuthors);
        const [categories] = await pool.query(sqlCategories);
        res.render('home.ejs', { authors, categories });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving data.");
    }
});

// API to get all the info for a specific author
app.get('/api/authors/:authorId', async (req, res) => {
    try {
        const id = req.params.authorId;
        const sql = `SELECT * FROM authors WHERE authorId = ?`;
        const [rows] = await pool.query(sql, [id]);
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving author information.");
    }
});

// Search quotes by keyword
app.get('/searchByKeyword', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        if (!keyword || keyword.length < 3) {
            return res.render('quotes.ejs', { rows: [], error: "Keyword must be at least 3 characters long." });
        }
        const sql = `SELECT authorId, quote, firstName, lastName FROM quotes NATURAL JOIN authors WHERE quote LIKE ?`;
        const [rows] = await pool.query(sql, [`%${keyword}%`]);
        console.log("Search by Keyword Results:", rows); // Log results
        res.render('quotes.ejs', { rows, error: null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error searching quotes by keyword.");
    }
});

// Search quotes by likes
app.get('/searchByLikes', async (req, res) => {
    try {
        const likes = parseInt(req.query.likes); // Get the 'likes' parameter from the query string
        console.log("Likes:", likes); // Log the likes value
        if (isNaN(likes)) {
            return res.render('quotes.ejs', { rows: [], error: "Please enter a valid number of likes." });
        }
        const sql = `SELECT quote, firstName, lastName, authorId FROM quotes NATURAL JOIN authors WHERE likes = ?`;
        const [rows] = await pool.query(sql, [likes]); // Use the user's input in the query
        console.log("Search by Likes Results:", rows); // Log results
        res.render('quotes.ejs', { rows, error: null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error searching quotes by likes.");
    }
});

// Search quotes by author
app.get('/searchByAuthors', async (req, res) => {
    try {
        const id = parseInt(req.query.getA, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid author ID.");
        }
        const sql = `SELECT quote, firstName, lastName, authorId FROM quotes NATURAL JOIN authors WHERE authorId = ?`;
        const [rows] = await pool.query(sql, [id]);
        console.log("Search by Author Results:", rows); // Log results
        res.render('quotes.ejs', { rows, error: null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error searching quotes by author.");
    }
});

// Search quotes by category
app.get('/searchByCategory', async (req, res) => {
    try {
        const category = req.query.category;
        const sql = `SELECT quote, firstName, lastName, authorId FROM quotes NATURAL JOIN authors WHERE category = ?`;
        const [rows] = await pool.query(sql, [category]);
        console.log("Search by Category Results:", rows); // Log results
        res.render('quotes.ejs', { rows, error: null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error searching quotes by category.");
    }
});

// Test database connection
app.get("/dbTest", async (req, res) => {
    try {
        const sql = "SELECT CURDATE()";
        const [rows] = await pool.query(sql);
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error testing database connection.");
    }
});

app.listen(3000, () => {
    console.log("Express server running on port 3000");
});