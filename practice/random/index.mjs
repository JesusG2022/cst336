import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

const pool = mysql.createPool({
    host: "jesusgarcialoyola.site",
    user: "jesusgar_webuser",
    password: "Jesus583213@",
    database: "jesusgar_quotes",
    connectionLimit: 10,
    waitForConnections: true
});

const conn = await pool.getConnection();

//routes
app.get('/', (req, res) => {
//    res.send('Hello Express app!')/
   res.render('home.ejs');
});

app.get("/dbTest", async(req, res) => {
    let sql = `SELECT * 
                FROM quotes
                ORDER BY RAND()
                LIMIT 1`;
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.get("/dbTest2", async(req, res) => {
    let sql = `SELECT *
                FROM quotes
                LIMIT 22, 1
`;
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})

 

 

