document.querySelector("#grade").addEventListener("click", printGrade);
document.querySelector("body").style.textAlign = "center";
let textGrade =  document.querySelector("#result");
function printGrade() {
    let grade = document.querySelector("#gradeSelect").value;
    let result = document.querySelector("#result");
    if (grade == 100){
        result.innerHTML = "A+";
        result.style.color = "darkgreen";
        result.style.fontWeight = "bold";
        result.style.fontSize = "2em";
    } else if (grade >= 90) {
     result.innerHTML = "A";
        result.style.color = "green";
     result.style.fontWeight = "bold";
     result.style.fontSize = "2em";
    } else if (grade >= 80) {
        result.innerHTML = "B";
        result.style.color = "orange";
        result.style.fontWeight = "bold";
        result.style.fontSize = "2em";
    } else if (grade >= 70) {
      result.innerHTML = "C";
      result.style.color = "yellow";
      result.style.fontWeight = "bold";
      result.style.fontSize = "2em";
    } else if (grade >= 60) {
       result.innerHTML = "D";
         result.style.color = "red";
       result.style.fontWeight = "bold";
       result.style.fontSize = "2em";
    } else {
       result.innerHTML = "F";
         result.style.color = "darkred";
       result.style.fontWeight = "bold";
       result.style.fontSize = "2em";
    }
    
}