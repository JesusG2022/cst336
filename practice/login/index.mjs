import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// For Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.set('trust proxy', 1); // Trust first proxy
app.use(session({
  secret: 'cst336_login',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: false } // Set to false for local development
}));

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

// Routes
app.get('/', (req, res) => {
    
  res.render('login');
});

app.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sql = "SELECT * FROM admin WHERE username = ?";
  const [rows] = await conn.query(sql, [username]);

  let hashPassword;
  if (rows.length > 0) {
    hashPassword = rows[0].password;
  }
  const match = await bcrypt.compare(password, hashPassword);
  if (match) {
    req.session.userAUTH = true;
    res.render('home');
  } else {
    req.session.userAUTH = false;
    res.render('login', { "error" : "Invalid username or password" });
  }
});

app.get('/profile', (req, res) => {
  if (req.session.userAUTH) {
    res.render('profile');
  } else {
    res.redirect('/');
  }
});

app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
}); // dbTest

app.listen(3000, () => {
  console.log("Express server running");
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});