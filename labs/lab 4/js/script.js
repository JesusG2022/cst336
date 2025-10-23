document.querySelector("#zipcode").addEventListener("change", zipcode);
document.querySelector("#username").addEventListener("input", fetchUsernames);
let state2 = "";

let urlPassword = "https://csumb.space/api/suggestedPassword.php?length=8";
document.querySelector("#password").addEventListener("click", password); // Corrected event listener

async function fetchUsernames() {
    let un = document.querySelector("#username").value;
    let urlUser = `https://csumb.space/api/usernamesAPI.php?username=${un}`;
    let response = await fetch(urlUser);
    let data = await response.json();

    if (data.available === false) {
        document.querySelector("#usernameError").style.backgroundColor = "red";
        document.querySelector("#usernameError").innerText = "Username not available";
    } else {
        document.querySelector("#usernameError").style.backgroundColor = "green";
        document.querySelector("#usernameError").innerText = "Username available";
    }
}

async function zipcode() {
    let zip = document.querySelector("#zipcode").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zip}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.city == undefined) {
        console.log("City not found for the given zipcode");
        document.querySelector("#city").textContent = "City not found";
        document.querySelector("#latitude").textContent = "N/A";
        document.querySelector("#longitude").textContent = "N/A";
        return;
    }

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

state();

async function state() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    let temp = document.createElement("option");
    temp.textContent = "none";
    temp.value = "none";
    document.querySelector("#state").appendChild(temp);

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.textContent = data[i].state;
        option.value = data[i].usps;
        document.querySelector("#state").appendChild(option);
    }
}

document.querySelector("#state").addEventListener("change", county);

async function county() {
    state2 = document.querySelector("#state").value;
    console.log("State selected:", state2);
    if (state2 === "" || state2 === "none") {
        alert("Please select a state");
        return;
    }
    let url = `https://csumb.space/api/countyListAPI.php?state=${state2}`;
    let response = await fetch(url);
    let data = await response.json();

    let countySelect = document.querySelector("#county");
    countySelect.innerHTML = "";
    let temp = document.createElement("option");
    temp.textContent = `none (${state2})`;
    countySelect.appendChild(temp);

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.textContent = `${data[i].county} (${state2})`;
        countySelect.appendChild(option);
    }
    console.log(countySelect);
}

async function password() {
    let passwordElement = document.querySelector("#recommendation");
    let response = await fetch(urlPassword);
    let data = await response.json();
    console.log("password:", data.password);
    passwordElement.textContent = "We recommend: " + data.password;
}

document.querySelector("#submit").addEventListener("click", submit); // Corrected event listener

function submit() {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let match = document.querySelector("#passwordR").value;

    if (!username || !password || !match) {
        alert("Please fill out all fields");
        console.log("Please fill out all fields");
        return;
    }

    if (password !== match) {
        alert("Passwords do not match");
        console.log("Passwords do not match");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        console.log("Password must be at least 6 characters");
        return;
    }

    if (username.length < 3) {
        alert("Username must be at least 3 characters");
        console.log("Username must be at least 3 characters");
        return;
    }

    // Proceed with form submission or further processing
    console.log("Form submitted successfully");
}

document.querySelector("#county").addEventListener("change", function() {
    let selectedCounty = document.querySelector("#county").value;
    console.log("County selected:", selectedCounty);
});