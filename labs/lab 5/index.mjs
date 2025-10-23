import express from 'express';
import fetch from 'node-fetch';

const planets = (await import('npm-solarsystem')).default;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
   try {
      let response = await fetch('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=solar%20system&per_page=50&orientation=horizontal');
      let data = await response.json();
      let bg = data.hits[Math.floor(Math.random() * data.hits.length)];
      res.render('home', { bg: bg.webformatURL });
      console.log("Went to Home");
   } catch (error) {
      console.error("Error fetching data from Pixabay API:", error);
      res.status(500).send("Internal Server Error");
   }
});

app.listen(3000, () => {
   console.log('server started');
});


app.get('/getComets', (req, res) => {
   let others = req.query.other;
   let othersInfo;
   if (others == 'Comet') {
       othersInfo = planets.getComets();
   } else if (others == 'Asteroid') {
       othersInfo = planets.getAsteroids();
   } else {
       console.error("Invalid query parameter for 'other':", others);
       return res.status(400).send("Invalid query parameter");
   }
   console.log("When getInfo: " + othersInfo);
   res.render('getComets', { othersInfo, others });
});

app.get('/venus', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getVenus(), planet: 'Venus' });
});

app.get('/earth', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getEarth(), planet: 'Earth' });
});

app.get('/mars', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getMars(), planet: 'Mars' });
});

app.get('/mercury', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getMercury(), planet: 'Mercury' });
});

app.get('/jupiter', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getJupiter(), planet: 'Jupiter' });
});

app.get('/saturn', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getSaturn(), planet: 'Saturn' });
});

app.get('/uranus', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getUranus(), planet: 'Uranus' });
});

app.get('/neptune', (req, res) => {
   res.render('planetInfo', { planetInfo: planets.getNeptune(), planet: 'Neptune' });
});

app.get('/nasa', async (req, res) => {
   let year = req.query.year;
   let month = req.query.month;
   let day = req.query.day;
   console.log(`Received query params - year: ${year}, month: ${month}, day: ${day}`);

   if (!year || !month || !day || month === 'none') {
       let date = new Date();
       year = date.getFullYear();
       month = date.getMonth() + 1;
       day = date.getDate();
       console.log(`Defaulting to current date - year: ${year}, month: ${month}, day: ${day}`);
   }

   let today = `${year}-${month}-${day}`;
   console.log(`Fetching NASA APOD for date: ${today}`);

   try {
       let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=' + today);
       let data = await response.json();
       console.log(`Received response from NASA API: ${JSON.stringify(data)}`);

       let img = data;
       res.render('nasa', { img: img });
       console.log("Rendered NASA page");
   } catch (error) {
       console.error("Error fetching data from NASA API:", error);
       res.status(500).send("Internal Server Error");
   }
});