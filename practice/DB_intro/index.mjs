import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "jesusgarcialoyola.site",
    user: "jesusgar_webuser",
    password: "Jesus583213@",
    database: "jesusgar_quotes",
    connectionLimit: 10,
    waitForConnections: true
});

app.get('/test', async (req, res) => {
    try {
        const conn = await pool.getConnection(); // Get a connection from the pool
        let sql = `SELECT * FROM authors WHERE sex = 'F'`;
        const [rows] = await conn.query(sql);
        conn.release(); // Release the connection back to the pool
        res.json(rows); // Send rows as JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
});

//routes
app.get('/', (req, res) => {
    res.send('Hello Express app!');
});

app.get('/dbTest', async (req, res) => {
    try {
        const conn = await pool.getConnection(); // Get a connection from the pool
        let sql = "SELECT CURDATE()";
        const [rows] = await conn.query(sql);
        conn.release(); // Release the connection back to the pool
        res.json(rows); // Send rows as JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})

 

