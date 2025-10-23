import express from 'express';
import randomInteger from 'random-int';
// console.log(randomInteger(1, 100));

const app = express();

let url = `https://rickandmortyapi.com/api`;

app.set("view engine", "ejs");

app.use(express.static("public"));



//routes

//root route

app.get('/', (req, res) => {

   res.render("home.ejs")
});

app.get('/page2', async (req, res) => {
   let numSet = new Set();
   while (numSet.size < 5) {
      numSet.add(randomInteger(1, 20));
   }
   let num = Array.from(numSet);
   let characters1 = await fetch(url + "/character/" + num[0]);
   let characters2 = await fetch(url + "/character/" + num[1]);
   let characters3 = await fetch(url + "/character/" + num[2]);
   let characters4 = await fetch(url + "/character/" + num[3]);
   let characters5 = await fetch(url + "/character/" + num[4]);
   let data = await Promise.all([characters1.json(), characters2.json(), characters3.json(), characters4.json(), characters5.json()]);
   console.log(data);
   res.render("page2.ejs", { char1: data[0], char2: data[1], char3: data[2], char4: data[3], char5: data[4] });
});

app.get('/page3', async (req, res) => {
   // let response = await fetch(url + "/location");
   // let data = await response.json();
   // console.log(data);
   res.render("page3.ejs")
}
);

app.get('/page4', async (req, res) => {
   let response = await fetch(url + "/episode");
   let data = await response.json();
   // console.log(data);
   res.render("page4.ejs")
}
);

app.get('/getLocation', async (req, res) => {
   let locations;
   if (req.query.location === '1') {
      let numSet = new Set();
      while (numSet.size < 5) {
         numSet.add(randomInteger(1, 20));
      }
      let loc1 = await fetch(url + "/location/" + Array.from(numSet)[0]);
      let loc2 = await fetch(url + "/location/" + Array.from(numSet)[1]);
      let loc3 = await fetch(url + "/location/" + Array.from(numSet)[2]);
      let loc4 = await fetch(url + "/location/" + Array.from(numSet)[3]);
      let loc5 = await fetch(url + "/location/" + Array.from(numSet)[4]);

      locations = await Promise.all([loc1.json(), loc2.json(), loc3.json(), loc4.json(), loc5.json()]);
      res.render("getLocation.ejs", { loc1: locations[0], loc2: locations[1], loc3: locations[2], loc4: locations[3], loc5: locations[4] });
     
   } else if (req.query.location === '2') {
      let loc1 = await fetch(url + "/location/1");
      let loc2 = await fetch(url + "/location/2");
      let loc3 = await fetch(url + "/location/3");
      let loc4 = await fetch(url + "/location/4");
      let loc5 = await fetch(url + "/location/5");

      locations = await Promise.all([loc1.json(), loc2.json(), loc3.json(), loc4.json(), loc5.json()]);
      res.render("getLocation.ejs", { loc1: locations[0], loc2: locations[1], loc3: locations[2], loc4: locations[3], loc5: locations[4] });
     
   } else if (req.query.location === '3') {
      let number = randomInteger(1, 16);
      let loc1 = await fetch(url + "/location/" + number);
      let loc2 = await fetch(url + "/location/" + (number + 1));
      let loc3 = await fetch(url + "/location/" + (number + 2));
      let loc4 = await fetch(url + "/location/" + (number + 3));
      let loc5 = await fetch(url + "/location/" + (number + 4));

      locations = await Promise.all([loc1.json(), loc2.json(), loc3.json(), loc4.json(), loc5.json()]);

      res.render("getLocation.ejs", { loc1: locations[0], loc2: locations[1], loc3: locations[2], loc4: locations[3], loc5: locations[4] });
   }
   console.log(locations);
});


app.get('/getEpisode', async (req, res) => {
   let episodes;
   if( req.query.episodes <= 0 || req.query.episodes > 51){
      alert("Please enter a valid episode number");
   }else{
      let ep = await fetch(url + "/episode/" + req.query.episodes);
      episodes = await ep.json();
      console.log(episodes);
      res.render("getEpisode.ejs", { eP: episodes });
   }
});
app.listen(3000, () => {

   console.log('server started');

});