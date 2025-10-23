document.querySelector("#textColorbtn").addEventListener("click", changeTextColor);

function changeTextColor(){
    let textColor = document.querySelector("#textColor").value;
    document.querySelector("body").style.color = textColor;
}

document.querySelector("#textSizebtn").addEventListener("click", changeSize);

function changeSize(){
    let textSize = document.querySelector("#textSize").value;
    document.querySelector("body").style.fontSize = textSize + "em";
}

document.querySelector("#Backgroundbtn").addEventListener("click", changeBackground);

function changeBackground(){
    let backgroundColor = document.querySelector("#bgColor").value;
    document.querySelector("body").style.backgroundColor = backgroundColor;
}

document.querySelector("#alignmentbtn").addEventListener("click", changeAlign);

function changeAlign(){
    let alignC = document.querySelector("#alignment").checked;
    if(alignC){
        document.querySelector("body").style.textAlign = "center";
    }
    else{
        document.querySelector("body").style.textAlign = "left";
    }
}
test2()
function test2(){
    for(let i = 0; i < 4; i++){
        let inputTest = document.createElement("input");
        inputTest.type = "radio";
        inputTest.name = "q2";
        inputTest.value = i + 1;
    
        let labelE = document.createElement("label");
        labelE.innerText = i + 1;
    
        labelE.append(inputTest);
    
        document.querySelector("#test").append(labelE);    
    }
}