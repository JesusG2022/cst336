//event listeners

document.querySelector("#dateBtn").addEventListener("click", displayDate);

 

// alert(new Date());

 

let today = new Date();

// alert(today);

console.dir(today);

 

let year = today.getFullYear();

// alert(year);

console.dir(year);

let month = getMonthName(today.getMonth());

console.log(month);

 

function displayDate(){

    let currentDateEl = document.querySelector("h1");

    currentDateEl.innerText = today.toDateString();

}

 

function getMonthName(monthIndex){

    if (monthIndex === 1) {

     return "February!";

    } else {

     return "";

    }

}