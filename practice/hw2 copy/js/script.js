let dice = [1, 2, 3, 4, 5, 6];
let sum1 = 0;
let sum2 = 0;
let points = 9; // Move points declaration here

document.querySelector("#reset").addEventListener("click", function() {
    // Reset the game
    points = 9;
    document.querySelector("#totalPoints").innerHTML = "";
    document.querySelector("#start").style.display = "block";
    document.querySelector("#roll").style.display = "none";
    document.querySelector("#yourRoll").innerHTML = "";
    document.querySelector("#guess").innerHTML = "";
    document.querySelector("#chosen").style.display = "none";
    document.querySelector("#submit").style.display = "none";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#reset").style.display = "none"; // Hide reset button
    document.querySelector("#points").innerHTML = ""; // Clear points display
    document.querySelector("#diceContainer").style.display = "none"; // Hide the dice container
    document.querySelector("#diceContainer").innerHTML = ""; // Clear the dice image
});

document.querySelector("#stop").addEventListener("click", function() {
    // Stop the game
    end();
    document.querySelector("#reset").style.display = "block"; // Show reset button
    document.querySelector("#yourRoll").innerHTML = "You have stopped the game!";
    document.querySelector("#guess").innerHTML = "";
    document.querySelector("#chosen").style.display = "none";
    document.querySelector("#submit").style.display = "none";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#stop").style.display = "none";
});

document.querySelector("#start").addEventListener("click", function() {
    // Start the game
    document.querySelector("#roll").style.display = "block";
    document.querySelector("#start").style.display = "none";
    document.querySelector("#stop").style.display = "block";
    createDiceImage(); // Create the dice image
    let textPoints = document.querySelector("#points");
    textPoints.innerHTML = "<br> <br> <br> You have " + points + " chips.";
});

function end() {
    let textPoints = document.querySelector("#totalPoints");
    document.querySelector("#roll").style.display = "none";
    document.querySelector("#stop").style.display = "none";
    document.querySelector("#reset").style.display = "block"; // Show reset button
    document.querySelector("#diceContainer").style.display = "none"; // Hide the dice container
    document.querySelector("#diceContainer").innerHTML = ""; // Clear the dice image
    textPoints.innerHTML = "You walk way with " + points + " chips.";
}

document.querySelector("#roll").addEventListener("click", function() {
    document.querySelector("#roll").style.display = "none";
    if (points == 0) {
        end();
        document.querySelector("#reset").style.display = "block"; // Show reset button
        document.querySelector("#yourRoll").innerHTML = "You have no more chips. Game over!";
        document.querySelector("#guess").innerHTML = "";
        document.querySelector("#chosen").style.display = "none";
        document.querySelector("#submit").style.display = "none";
        document.querySelector("#result").innerHTML = "";
        document.querySelector("#stop").style.display = "none";
        return;
    }
    dice = _.shuffle(dice);
    sum1 = rollDice();
    sum2 = rollDice();
    document.querySelector("#yourRoll").innerHTML = "You rolled a " + sum1;
    console.log("MY roll:" + sum1);
    console.log("Dealer roll:" + sum2);
    let guess = document.querySelector("#guess");
    guess.innerHTML = "Guess if your roll is higher or lower than the dealer's roll";
    document.querySelector("#chosen").style.display = "block";
    document.querySelector("#submit").style.display = "block";
});

document.querySelector("#submit").addEventListener("click", function() {
    document.querySelector("#chosen").style.display = "none";
    document.querySelector("#submit").style.display = "none";
    let hORl = document.querySelector("#chosen").value;
    let textResult = document.querySelector("#result");
    if (sum1 < sum2) {
        if (hORl === "higher") {
            points += 1;
            textResult.innerHTML = "You won!";
        } else {
            textResult.innerHTML = "You lost!";
            points -= 1;
        }
    } else if (sum1 > sum2) {
        if (hORl === "lower") {
            textResult.innerHTML = "You won!";
            points += 1;
        } else {
            textResult.innerHTML = "You lost!";
            points -= 1;
        }
    } else if (sum1 == sum2) {
        textResult.innerHTML = "It's a tie!";
        points += 0;
    }
    let textPoints = document.querySelector("#points");
    textPoints.innerHTML = "<br> <br> <br> You have " + points + " chips.";
    document.querySelector("#roll").style.display = "block";
});

function rollDice() {
    dice = _.shuffle(dice);
    let sum = dice[0] + dice[1];
    return sum;
}

function createDiceImage() {
    let diceContainer = document.querySelector("#diceContainer");
    diceContainer.style.display = "block";
    let diceImage = document.createElement("img");
    diceImage.src = "img/dice.jpg";
    diceImage.alt = "Dice Image";
    diceImage.style.width = "100px"; // Set the desired width
    diceImage.style.height = "auto"; // Maintain aspect ratio
    diceContainer.appendChild(diceImage);
}