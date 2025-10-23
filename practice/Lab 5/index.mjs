import express from "express";
const planets = (await import("npm-solarsystem")).default;
const fetch = (await import("node-fetch")).default;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/", async (req, res) => {
    // res.send("Hello TARS.");
    let url = ("https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=solar%20system&per_page=50&orientation=horizontal");
    let response = await fetch(url);
    let data = await response.json();
    let num = Math.floor(Math.random() * data.hits.length);
    console.log(num);
    res.render("home", {background : data.hits[num].largeImageURL}); // ejs name here.
});

app.get("/mercury", (req, res) => {
    let mercuryInfo = planets.getMercury();
    res.render("mercury", { mercury : mercuryInfo }); 
});

app.get("/venus", (req, res) => {
    let venusInfo = planets.getVenus();
    res.render("venus", { venus : venusInfo }); 
});
app.get("/mars", (req, res) => {
    let marsInfo = planets.getMars();
    res.render("mars", { mars : marsInfo }); 
});
app.get("/saturn", (req, res) => {
    let saturnInfo = planets.getSaturn();
    res.render("saturn", { saturn : saturnInfo }); 
});
app.listen(3000, () => {
    console.log("server running...");
})