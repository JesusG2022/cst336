import express from 'express';

const quotes = (await import("success-motivational-quotes")).default;

 

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

 

//routes

//root route

app.get('/', (req, res) => {

   //res.send('<h1>Hello Express app!</h1>')

   res.render("home.ejs")

});

 

app.get('/quote', (req, res) => {

    console.log(quotes.getTodaysQuote());

    res.render("quote.ejs")

 });

 

app.listen(3000, () => {

   console.log('server started');

});