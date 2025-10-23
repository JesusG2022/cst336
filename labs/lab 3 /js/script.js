document.addEventListener("DOMContentLoaded", function() {
    let q2Choices = ["css", "js", "img", "index.html"];
    document.querySelector("#Submit").addEventListener("click", gradeQuiz);

    let score = 0;
    let quizCount = localStorage.getItem("quizCount") ? parseInt(localStorage.getItem("quizCount")) : 0;

    displayQ2Choices();

    function displayQ2Choices() {
        q2Choices = _.shuffle(q2Choices);
    
        for (let i of q2Choices) {
            let inputEl = document.createElement("input");
            inputEl.type = "checkbox";
            inputEl.value = i;
            inputEl.id = i;
    
            let labelEl = document.createElement("label");
            labelEl.setAttribute("for", i); // Associate the label with the input
            labelEl.innerText = i;
    
            let container = document.createElement("div");
            container.appendChild(inputEl);
            container.appendChild(labelEl);
    
            document.querySelector("#q2Choices").append(container);
        }
    }

    function Q2Choices() {
        let answer2List = ["css", "js"];
        let selectedAnswers = [];

        for (let i of q2Choices) {
            let checkbox = document.querySelector("#" + i);
            if (checkbox && checkbox.checked) {
                selectedAnswers.push(i);
            }
        }

        // Check if selected answers match the correct answers
        if (selectedAnswers.length !== answer2List.length) {
            return false;
        }

        for (let answer of selectedAnswers) {
            if (!answer2List.includes(answer)) {
                return false;
            }
        }

        return true;
    }

    function gradeQuiz() {
        console.log("Grading quiz...");
    
        // Reset score to 0 before grading
        score = 0;
    
        let answer1 = document.querySelector("input[name=q1]:checked")?.value;
        console.log("q1: " + answer1);
        console.log(q2Choices);
    
        let answer3 = document.querySelector("#q3").value;
        console.log("q3: " + answer3);
        let answer4 = document.querySelector("#q4").value;
        console.log("q4: " + answer4);
        let answer5 = document.querySelector("#qu5").value;
        console.log("q5: " + answer5);
        console.log("Score before grading: " + score);
        if (answer1 == "color") {
            score += 20;
            document.querySelector("#question1").style.color = "green";
            document.querySelector("#correct1").style.display = "block";
        } else {
            document.querySelector("#question1").style.color = "red";
            document.querySelector("#wrong1").style.display = "block";
        }
    
        if (Q2Choices()) {
            document.querySelector("#correct2").style.display = "block";
            document.querySelector("#question2").style.color = "green";
            score += 20;
        } else {
            document.querySelector("#wrong2").style.display = "block";
            document.querySelector("#question2").style.color = "red";
        }
    
        if (answer3 === "margin") {
            score += 20;
            document.querySelector("#correct3").style.display = "block";
            document.querySelector("#question3").style.color = "green";
        } else {
            document.querySelector("#wrong3").style.display = "block";
            document.querySelector("#question3").style.color = "red";
        }
    
        if (answer4 === "1") {
            score += 20;
            document.querySelector("#question4").style.color = "green";
            document.querySelector("#correct4").style.display = "block";
        } else {
            document.querySelector("#question4").style.color = "red";
            document.querySelector("#wrong4").style.display = "block";
        }
    
        if (answer5 === "a") {
            score += 20;
            document.querySelector("#question5").style.color = "green";
            document.querySelector("#correct5").style.display = "block";
        } else {
            document.querySelector("#question5").style.color = "red";
            document.querySelector("#wrong5").style.display = "block";
        }
    
        console.log("Score after grading: " + score);
    
        if(score >= 80){
            document.querySelector("#scoreText").innerText = "Congratulations! You pass the quiz! Your score is: " + score;
            document.querySelector("#scoreText").style.color = "green";
        }
        else{   
            document.querySelector("#scoreText").innerText = "You did not pass the quiz! Your score is: " + score;
            document.querySelector("#scoreText").style.color = "red";
        }
    
        localStorage.setItem("quizCount", ++quizCount);
        console.log("Quiz count: " + localStorage.getItem("quizCount"));
        document.querySelector("#Submit").style.display = "none";
        document.querySelector("#resetButton").style.display = "inline";
    }
});

document.querySelector("#resetButton").addEventListener("click", function() {
    console.log("Reset button clicked");

    // Reset question colors
    let q1 = document.querySelector("#question1");
    let q2 = document.querySelector("#question2");
    let q3 = document.querySelector("#question3");
    let q4 = document.querySelector("#question4");
    let q5 = document.querySelector("#question5");

    q1.style.color = "black";
    q2.style.color = "black";
    q3.style.color = "black";
    q4.style.color = "black";
    q5.style.color = "black";

    document.querySelector("#correct1").style.display = "none";
    document.querySelector("#wrong1").style.display = "none";

    document.querySelector("#correct2").style.display = "none";
    document.querySelector("#wrong2").style.display = "none";

    document.querySelector("#correct3").style.display = "none";
    document.querySelector("#wrong3").style.display = "none";

    document.querySelector("#correct4").style.display = "none";
    document.querySelector("#wrong4").style.display = "none";

    document.querySelector("#correct5").style.display = "none";
    document.querySelector("#wrong5").style.display = "none";

    // Clear selected answers for question 1
    let q1Radios = document.querySelectorAll("input[name=q1]");
    q1Radios.forEach(radio => radio.checked = false);

    // Clear selected answers for question 2
    let q2Checkboxes = document.querySelectorAll("#q2Choices input[type=checkbox]");
    q2Checkboxes.forEach(checkbox => checkbox.checked = false);

    // Clear input for question 3
    document.querySelector("#q3").value = "";
    document.querySelector("#q3").style.display = "inline";

    // Clear input for question 4
    document.querySelector("#q4").value = "";
    document.querySelector("#q4").style.display = "inline";

    // Clear selected answer for question 5
    document.querySelector("#qu5").value = "";
    document.querySelector("#qu5").style.display = "inline";

    // Clear score text
    document.querySelector("#scoreText").innerText = "";

    // Hide reset button and show submit button
    document.querySelector("#resetButton").style.display = "none";
    document.querySelector("#Submit").style.display = "inline";
});