let background = [];
let cash = 50;
let dice = [1, 2, 3, 4, 5, 6];
let roll1 = 0;
let roll2 = 0; 
let betH1 = [];
let betH2 = [];

document.addEventListener("DOMContentLoaded", () => {
    displayDice1();
    document.querySelector("#update").addEventListener("click", update);
    document.querySelector("#betBtn").addEventListener("click", roll);

    const backgroundSelect = document.querySelector("#background");
    const options = Array.from(backgroundSelect.options);
    const shuffledOptions = _.shuffle(options);
    backgroundSelect.innerHTML = "";
    shuffledOptions.forEach(option => backgroundSelect.appendChild(option));
});

function update() { 
    let background = document.querySelector("#background").value;
    if (background === "none") {
        alert("Please select a background");
        return;
    } else if (background === "coin") {
        document.body.style.backgroundImage = "url('img/bg/coins.jpg')";
    } else if (background === "dice") {
        document.body.style.backgroundImage = "url('img/bg/dice.jpg')";
    } else if (background === "bill") {
        document.body.style.backgroundImage = "url('img/bg/bills.jpg')";
    }
}

function roll() {
    let betM = document.querySelector("#bet").value;
    // let errorMessage = document.querySelector("#errorMessage");
    // errorMessage.textContent = "";

    if (!betM) {
        // errorMessage.textContent = "Bet cannot be blank";
        alert("Bet cannot be blank");
        return;
    }
    if (betM > cash) {
        // errorMessage.textContent = "You don't have enough money to bet";
        alert("You don't have enough money to bet");
        return;
    }
    if (betM >= 10) {
        alert("Bet cannot be more than $10");
        return;
    }

    displayDice2();
    betH1.push(roll1);
    betH2.push(roll2);
    let message = document.querySelector("#yourM");
    let resultMessage = document.querySelector("#wonOrLose");
    if (roll1 > roll2) {
        cash += parseInt(betM);
        message.textContent = `You have: $${cash}`;
        resultMessage = "You won!";

    } else if (roll1 < roll2) {
        cash -= parseInt(betM);
        message.textContent = `You have:$ ${cash}`;
        resultMessage = "You lost!";

    } else {
        resultMessage = "It's a tie!";
    }
    document.querySelector("#wonOrLose").textContent = resultMessage;
    document.querySelector("#result").style.display = "block";

    updateHistory();
}

function displayDice1() {
    let dice1 = document.getElementById("img1");
    let dice2 = document.getElementById("img2");

    let diceImage1 = document.createElement("img");
    let diceImage2 = document.createElement("img");
    rollDice();
    diceImage1.src = `img/dice/player/die${roll1}.png`;
    diceImage1.alt = "Dice Image";
    diceImage1.style.width = "100px";
    diceImage1.style.height = "auto";
    dice1.appendChild(diceImage1);

    diceImage2.src = `img/dice/cpu/die${roll2}.png`;
    diceImage2.alt = "Dice Image";
    diceImage2.style.width = "100px";
    diceImage2.style.height = "auto";
    dice2.appendChild(diceImage2);
}

function displayDice2() {
    let dice1 = document.getElementById("i1");
    let dice2 = document.getElementById("i2");

    let diceImage1 = document.createElement("img");
    let diceImage2 = document.createElement("img");
    rollDice();
    diceImage1.src = `img/dice/player/die${roll1}.png`;
    diceImage1.alt = "Dice Image";
    diceImage1.style.width = "100px";
    diceImage1.style.height = "auto";
    dice1.appendChild(diceImage1);

    diceImage2.src = `img/dice/cpu/die${roll2}.png`;
    diceImage2.alt = "Dice Image";
    diceImage2.style.width = "100px";
    diceImage2.style.height = "auto";
    dice2.appendChild(diceImage2);
}

function rollDice() {
    dice = _.shuffle(dice);
    roll1 = dice[0];
    roll2 = dice[1];
}
document.addEventListener("DOMContentLoaded", () => {
    displayDice1();
    document.querySelector("#update").addEventListener("click", update);
    document.querySelector("#betBtn").addEventListener("click", roll);
    document.querySelector("#history").addEventListener("click", updateHistory);

    const backgroundSelect = document.querySelector("#background");
    const options = Array.from(backgroundSelect.options);
    const shuffledOptions = _.shuffle(options);
    backgroundSelect.innerHTML = "";
    shuffledOptions.forEach(option => backgroundSelect.appendChild(option));
});
function updateHistory() {
    let playerHist = document.querySelector("#playerHist");
    let cpuHist = document.querySelector("#cpuHist");

    playerHist.innerHTML = betH1.map(roll => `<p>${roll}</p>`).reverse().join("");
    cpuHist.innerHTML = betH2.map(roll => `<p>${roll}</p>`).reverse().join("");
}

document.addEventListener("#history", showHistory());

function showHistory() {
let history = document.querySelector("#history");
history.style.display = "block";
}