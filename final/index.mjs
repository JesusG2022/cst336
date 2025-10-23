import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// For Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

// Setting up database connection pool
const pool = mysql.createPool({
    host: "jesusgarcialoyola.site",
    user: "jesusgar_final_project",
    password: "Jesus583213@",
    database: "jesusgar_final_test",
    connectionLimit: 10,
    waitForConnections: true,
});

// Routes
app.get('/', async(req, res) => {
    let conn = await pool.getConnection();
    const sql = `SELECT * FROM dinosaurs 
                ORDER BY RAND()
                LIMIT 3;`;
    const [rows] = await conn.query(sql);
    console.log(rows);
    res.render('home', { dinosaurs: rows });
});

app.get('/adddino',async (req, res) => {
    let conn = await pool.getConnection();
    const sql = `SELECT era_id,era_name FROM dino_eras ;`;
    const [rows] = await conn.query(sql);
    // console.log(rows);
    res.render('adddino', { eras: rows });
    // res.render('adddino');
});

app.post('/adddino', async (req, res) => {
    let dino_name = req.body.name;
    console.log(dino_name);
    let dino_desc = req.body.description;
    console.log(dino_desc);
    let dino_height = req.body.height;
    console.log(dino_height);
    let dino_weight = req.body.weight;
    console.log(dino_weight);
    let dino_image = req.body.image;
    console.log(dino_image);
    let dino_era = req.body.era_id;
    console.log(dino_era);
    let conn = await pool.getConnection();
    const sql = `INSERT INTO dinosaurs (name, description, height, weight, image, era_id) 
                VALUES (?, ?, ?, ?, ?, ?);`;
    const params = [dino_name, dino_desc, dino_height, dino_weight, dino_image, dino_era];
    const [rows] = await conn.query(sql, params);
    console.log(rows);
    res.redirect('/');

}
);

app.get('/dbTest', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const sql = "SELECT CURDATE()";
        const [rows] = await conn.query(sql);
        res.send(rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        if (conn) conn.release(); // Release the connection back to the pool
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Express server running on http://localhost:3000");
});