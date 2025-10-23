import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// For Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

// Setting up database connection pool
const pool = mysql.createPool({
    host: "jesusgarcialoyola.site",
    user: "jesusgar_webuser",
    password: "Jesus583213@",
    database: "jesusgar_quotes",
    connectionLimit: 10,
    waitForConnections: true
});

const conn = await pool.getConnection();

// Session configuration
app.set('trust proxy', 1); // Trust first proxy
app.use(session({
  secret: 'cst336_login',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: false } // Set to false for local development
}));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userAUTH) {
        return next(); // User is authenticated, proceed to the next middleware/route
    }
    res.redirect('/'); // Redirect to login page if not authenticated
}

// Routes
app.get('/', async (req, res) => {
    res.render("login");
});

app.get('/home', isAuthenticated, async (req, res) => {
    res.render("home");
});

app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let sql = "SELECT * FROM admin WHERE username = ?";
    const [rows] = await conn.query(sql, [username]);
    if (rows.length > 0) {
        let hashPassword = rows[0].password;
        const match = await bcrypt.compare(password, hashPassword);

        if (match) {
            req.session.userAUTH = true;
            res.render('home');
        } else {
            req.session.userAUTH = false;
            res.render('login', { "error": "Invalid username or password" });
        }
    } else {
        req.session.userAUTH = false;
        res.render('login', { "error": "Invalid username or password" });
    }
});

app.get('/addAuthor', isAuthenticated, async (req, res) => {
    res.render("addAuthor");
});

app.get('/editAuthor', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "SELECT * FROM authors WHERE authorId = ?";
    const [rows] = await conn.query(sql, [req.query.authorId]);
    conn.release();
    if (rows.length > 0) {
        res.render("editAuthor", { author: rows[0], message: null });
    } else {
        res.status(404).send("Author not found");
    }
});

app.post('/editAuthor', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = `UPDATE authors 
                 SET firstName = ?, lastName = ?, dob = ?, dod = ?, sex = ?, profession = ?, country = ?, portrait = ?, biography = ? 
                 WHERE authorId = ?`;
    const params = [
        req.body.first_name,
        req.body.last_name,
        req.body.birth_date,
        req.body.death_date,
        req.body.sex,
        req.body.pro,
        req.body.country,
        req.body.pic,
        req.body.bio,
        req.body.authorId
    ];
    await conn.query(sql, params);
    conn.release();
    res.redirect('/author');
});

app.get('/author', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "SELECT authorId, firstName, lastName FROM authors";
    const [rows] = await conn.query(sql);
    conn.release();
    res.render("author", { rows: rows });
});

app.get('/quote', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "SELECT * FROM quotes";
    const [rows] = await conn.query(sql);
    conn.release();
    res.render("quote", { rows: rows });
});

app.post('/addAuthor', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = `INSERT INTO authors (firstName, lastName, dob, dod, sex, profession, country, portrait, biography) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        req.body.first_name,
        req.body.last_name,
        req.body.birth_date,
        req.body.death_date,
        req.body.sex,
        req.body.pro,
        req.body.country,
        req.body.pic,
        req.body.bio
    ];
    await conn.query(sql, params);
    conn.release();
    res.render('addAuthor', { message: "Author added successfully!" });
});

app.get("/dbTest", async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    conn.release();
    res.send(rows);
});

app.get('/editQuote', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "SELECT * FROM quotes WHERE quoteId = ?";
    const [rows] = await conn.query(sql, [req.query.quoteId]);
    conn.release();
    if (rows.length > 0) {
        res.render("editQuote", { quote: rows[0], message: null });
    } else {
        res.status(404).send("Quote not found");
    }
});

app.post('/editQuote', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = `UPDATE quotes 
                 SET quote = ?, authorId = ?, category = ?, likes = ? 
                 WHERE quoteId = ?`;
    const params = [
        req.body.quote,
        req.body.authorId,
        req.body.category,
        req.body.likes,
        req.body.quoteId
    ];
    await conn.query(sql, params);
    conn.release();
    res.redirect('/quote');
});

app.get('/addQuote', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const authorsSql = "SELECT authorId, firstName, lastName FROM authors";
    const categoriesSql = "SELECT DISTINCT category FROM quotes";
    const [authors] = await conn.query(authorsSql);
    const [categories] = await conn.query(categoriesSql);
    conn.release();
    res.render("addQuotes", { authors: authors, categories: categories.map(row => row.category), message: null });
});

app.post('/addQuote', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = `INSERT INTO quotes (quote, authorId, category, likes) VALUES (?, ?, ?, ?)`;
    const params = [
        req.body.quote,
        req.body.authorId,
        req.body.category,
        req.body.likes
    ];
    await conn.query(sql, params);
    conn.release();
    res.render("addQuotes", { authors: [], categories: [], message: "Quote added successfully!" });
});

app.post('/deleteAuthor', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "DELETE FROM authors WHERE authorId = ?";
    await conn.query(sql, [req.body.authorId]);
    conn.release();
    res.redirect('/author');
});

app.post('/deleteQuote', isAuthenticated, async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "DELETE FROM quotes WHERE quoteId = ?";
    await conn.query(sql, [req.body.quoteId]);
    conn.release();
    res.redirect('/quote');
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect('/');
    });
});

app.listen(3001, () => {
    console.log("Express server running");
});