console.log('Hello, World!');
let message = document.querySelector('#message');
let button = document.querySelector('#subButton');
let num = getRandomNumber();
let count = 1;
let guessInput = document.querySelector('#GuessInput');
let guessList = document.querySelector('#guessList');

function getRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}
console.log('number to Guess: '+ num);
function printMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}
// fuction
// loop 
    // print number with space or ","
button.addEventListener('click', function() {

    let guess = parseInt(guessInput.value, 10);


 if(count === 7) {
    guessList.innerText += guess ;
    console.log(count-1);
    printMessage('You Lost!', 'red');
    return;
 }

    if (guess === num) {
        guessList.innerText += guess ;
        printMessage('You Won!', 'green');
        return;
    } else if (guess > num) {
        guessList.innerText += guess + ", ";
        count++;
        console.log(count-1);
        printMessage('lower', 'blue');
    } else if (guess < num) {
        guessList.innerText += guess + ", ";
        count++;
        console.log(count-1);
        printMessage('higher', 'blue');
    } 


});