import { shuffle } from 'fast-shuffle'


let letter = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log(letter);

let newLetter = shuffle(letter);

console.log(newLetter);

const quotes = (await import("success-motivational-quotes")).default;


displayQ();
function displayQ(){
    let quote = quotes.getTodaysQuote();
    console.log(quote);
    // console.log(quote.getBody());
}


const displayQuote = function() {

    let quote = quotes.getTodaysQuote();
    console.log(quote);
}

displayQuote();