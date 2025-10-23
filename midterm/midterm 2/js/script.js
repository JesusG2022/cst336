let urlRandom = "https://csumb.space/cst/336/midterm/otterAirlines/api/destinationsAPI.php?city=random";
randomDestination();

async function randomDestination() {
    try {
        let randomDestination = await fetch(urlRandom);
        let destination = await randomDestination.json();
        console.log(destination);

        let image = document.querySelector("#place");
        let name = document.querySelector("#name");
        let price = document.querySelector("#price");
        let days = document.querySelector("#days");

        console.log("Image element:", image);
        console.log("Name element:", name);
        console.log("Price element:", price);
        console.log("Days element:", days);

        let img = destination.image;
        console.log("Image URL:", img);

        name.innerHTML = destination.name;
        price.innerHTML = destination.flightPrice;
        let leave = destination.departures;
        days.innerHTML = leave; // Fix to avoid appending multiple times
        image.src = img;
    } catch (error) {
        console.error("Error fetching random destination:", error);
    }
}

document.querySelector('#country').addEventListener('input', searchDestination);
document.querySelector('#city').addEventListener('input', choseDestination); // Add event listener for city selection

async function searchDestination() {
    let country = document.querySelector("#country").value;
    if (country == "none") {
        console.log("Please enter a country.");
        return;
    }

    console.log("Country:", country);

    let urlCities = `https://csumb.space/cst/336/midterm/otterAirlines/api/citiesAPI.php?country=${country}`;
    let response = await fetch(urlCities);
    let cities = await response.json();
    let places = cities;
    console.log(places);
  
    let city = document.querySelector("#city");
    city.innerHTML = ''; // Clear previous options
    let option = document.createElement("option");
    option.value = "none";
    option.innerHTML = "Select";
    city.appendChild(option);
    for (let c in places) {
        let option = document.createElement("option");
        option.value = places[c].id;
        option.innerHTML = places[c].name;
        city.appendChild(option);
    }
}

async function choseDestination() {
    let city = document.querySelector("#city").value;
    if (city == "none") {
        console.log("Please enter a city.");
        return;
    }
    let urlCities = `https://csumb.space/cst/336/midterm/otterAirlines/api/destinationsAPI.php?city=${city}`;
    
    try {
        let randomDestination = await fetch(urlCities);
        let destination = await randomDestination.json();
        console.log(destination);

        let image = document.querySelector("#place");
        let name = document.querySelector("#name");
        let price = document.querySelector("#price");
        let days = document.querySelector("#days");

        console.log("Image element:", image);
        console.log("Name element:", name);
        console.log("Price element:", price);
        console.log("Days element:", days);

        let img = destination.image;
        console.log("Image URL:", img);

        name.innerHTML = destination.name;
        price.innerHTML = destination.flightPrice;
        let leave = destination.departures;
        days.innerHTML = leave; // Fix to avoid appending multiple times
        image.src = img;
    } catch (error) {
        console.error("Error fetching random destination:", error);
    }
}