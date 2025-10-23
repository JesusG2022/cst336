let person = {
    firstname: 'John',
    lastname: 'Doe',
    age: 25,
    eyecolor: 'blue',
    siblings: [{firstname: 'Jane',
        lastname: 'Doe',
        age: 21,
        eyecolor: 'brown'
    },{
        firstname: 'Jim',
        lastname: 'Doe',
        age: 16,
        eyecolor: 'green'
    }]
}

console.log(person.firstname + ' is ' + person.age + ' years old.');
console.log(person['firstname'] + ' is ' + person['age'] + ' years old.');

// Output
// John is 25 years old.

console.log(person.siblings[0].firstname + ' is ' + person.siblings[0].age + ' years old.');
console.log(person.siblings[1].firstname + ' is ' + person.siblings[1].age + ' years old.');    

// Output
// Jane is 21 years old.
// Jim is 16 years old.

let data = {"type":"FeatureCollection","metadata":{"generated":1740441525000,"url":"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-01-01&endtime=2025-02-19&latitude=36.6&longitude=-121.9&maxradius=10&minmag=4.5","title":"USGS Earthquakes","status":200,"api":"1.14.1","count":2},"features":[{"type":"Feature","properties":{"mag":4.7,"place":"194 km W of Bandon, Oregon","time":1737783401391,"updated":1740203208052,"tz":null,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us6000pm9b","detail":"https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=us6000pm9b&format=geojson","felt":19,"cdi":3.1,"mmi":null,"alert":null,"status":"reviewed","tsunami":0,"sig":346,"net":"us","code":"6000pm9b","ids":",us6000pm9b,","sources":",us,","types":",dyfi,oaf,origin,phase-data,","nst":161,"dmin":1.553,"rms":0.67,"gap":183,"magType":"mb","type":"earthquake","title":"M 4.7 - 194 km W of Bandon, Oregon"},"geometry":{"type":"Point","coordinates":[-126.786,43.3198,10]},"id":"us6000pm9b"},
{"type":"Feature","properties":{"mag":4.65,"place":"4 km NW of Cobb, CA","time":1735785244660,"updated":1740019449993,"tz":null,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc75111126","detail":"https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=nc75111126&format=geojson","felt":704,"cdi":6,"mmi":6.915,"alert":"green","status":"reviewed","tsunami":1,"sig":755,"net":"nc","code":"75111126","ids":",ew1735785240,us6000pgzl,nc75111126,at00spfwgt,","sources":",ew,us,nc,at,","types":",dyfi,focal-mechanism,ground-failure,impact-link,losspager,moment-tensor,nearby-cities,oaf,origin,phase-data,scitech-link,shake-alert,shakemap,","nst":115,"dmin":0.009316,"rms":0.08,"gap":44,"magType":"mw","type":"earthquake","title":"M 4.7 - 4 km NW of Cobb, CA"},"geometry":{"type":"Point","coordinates":[-122.756333333333,38.8455,1.42]},"id":"nc75111126"}],"bbox":[-126.786,38.8455,1.42,-122.75633333333,43.3198,10]}


console.log(data.features[0].properties.place);
console.log(data.features[1].properties.place);

//alert("its' working!")
getMovieData()
async function getMovieData(){
   let url = "https://www.omdbapi.com/?apikey=12215ee6&s=wicked";
   let response = await fetch(url);
   //console.log(response);
   let data = await response.json();
   console.log(data.Search[0].Title);
   let titleEl = document.createElement("h1");
   titleEl.innerText = data.Search[0].Title;
   document.querySelector("#movies").append(titleEl);
   let posterEl = document.createElement("img");
   posterEl.src = data.Search[0].Poster;
   posterEl.width = 300;
   document.querySelector("#movies").append(posterEl);
   //console.log(data.Search[0].Poster);
}
