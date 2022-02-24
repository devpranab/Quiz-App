//select elements
const myBtn = document.querySelector(".myBtn button");
const rulexBox = document.querySelector(".rulesBox");
const exitQuizBtn = document.querySelector(".exitQuizBtn");
const continueBtn = document.querySelector(".continueBtn");
const questionsSec = document.querySelector(".questions-sec");
const qMyOptionsList = document.querySelector(".q-myOptions");
const qTimeCount = document.querySelector(".q-timeCount .q-time-right");
const timeLines = document.querySelector(".time-lines");


//click to rulexBox page show
myBtn.addEventListener("click", function(){
    rulexBox.classList.add("activeDisplay");
})

//exitQuizBtn
exitQuizBtn.addEventListener("click", function(){
    rulexBox.classList.remove("activeDisplay");
})

//continueBtn start--
continueBtn.addEventListener("click", function(){
    rulexBox.classList.remove("activeDisplay");
    questionsSec.classList.add("activeDisplay");

    // call
    showQuestions(0); //index value pass
    //call
    startTimer(15);
    //call
    startTimerLine(0); 
})

// click on nextBtn, dynamic changing indexing of  showQuestions(0) function call start;
const nextBtn = document.querySelector(".nextBtn");
const resultPage = document.querySelector(".resultPage");
const restartBtn = document.querySelector(".restartBtn");
const quitQuizBtn = document.querySelector(".quitQuizBtn");

//assists var start
let qCount = 0; //not works const in inner block
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;
//assists var end

//nextBtn - comes next Question
nextBtn.addEventListener("click", function(){
    if(qCount < questions.length - 1){
        qCount ++
        showQuestions(qCount);
         //call
        clearInterval(counter);
        startTimer(timeValue);

        //call
        clearInterval(counterLine);
        startTimerLine(widthValue);

        nextBtn.style.display = "none";

    }else{
        console.log("You have completed your tasks");

        //call
        showResultPage();
    }

})
// click on nextBtn, dynamic changing indexing of  showQuestions(0) function call end;


// showQuestions function start
function showQuestions(index){
    // question & option show start
    const qText = document.querySelector(".q-text");
    
    let qTag = "<h3>" + questions[index].numb + "." + questions[index].question + "<h3>";
    qText.innerHTML = qTag;

    const qMyOptionsTag = "<div class='option'>" + questions[index].option[0] + "</div>"
                        + "<div class='option'>" + questions[index].option[1] + "</div>"
                        + "<div class='option'>" + questions[index].option[2] + "</div>"
                        + "<div class='option'>" + questions[index].option[3] + "</div>";
    qMyOptionsList.innerHTML = qMyOptionsTag;
    // question & option show end

    // 1 of 5 Questions show start
    const totalQ = document.querySelector(".total-q");
    const totalQTag = "<p>" + questions[index].numb + " of 5</p>"
    totalQ.innerHTML = totalQTag;
    // 1 of 5 Questions show end

    // optionSelected setAttribute start
    const option = qMyOptionsList.querySelectorAll(".option");
    for(let i=0; i<option.length; i++){
    option[i].setAttribute("onClick", "optionSelected(this)")
  }
    // optionSelected setAttribute end
}
// showQuestions function end


let tickIcon = `<div class="tick icon"><i class="fas fa-check"></i></div>`
let crossIcon = `<div class="cross icon"><i class="fas fa-times"></i></div>`

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);

    let userAns = answer.textContent;
    let correctAns = questions[qCount].answer;
    //console.log(userAns);
    //console.log(correctAns);
    let allOptions = qMyOptionsList.children.length;

    if(userAns == correctAns){
        userScore += 1;
        // console.log(userScore);

        answer.classList.add("correct");
        console.log(correctAns + " - Answer is correct");
        //tickIcon
        answer.insertAdjacentHTML("beforeend", tickIcon);

    }else{
        answer.classList.add("inCorrect");
        console.log(" - Answer is wrong"); 
        //crossIcon
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // even wrong show correct ans start
        for(let i=0; i<allOptions; i++){
            if(qMyOptionsList.children[i].textContent == correctAns){
                qMyOptionsList.children[i].setAttribute("class", "option correct");
                qMyOptionsList.children[i].insertAdjacentHTML("beforeend", tickIcon);
         }
        }

        // even wrong show correct ans end
    }
    // start multi. opt. disable
    for(let i=0; i<allOptions; i++){
        qMyOptionsList.children[i].classList.add("disabled");
    }
    // nextBtn on start
    nextBtn.style.display = "block";
    // nextBtn on end
    // end multi opt. disable
}

// q-timeCount start
function startTimer(time){
   counter = setInterval(timer, 1000);
   function timer(){
    qTimeCount.textContent = time;
    time --

    // add 0 for 09 start
    if(time < 9){
        let addZero = qTimeCount.textContent;
        qTimeCount.textContent = "0" + addZero;
    }
    // add 0 for 09 end

    // - counting solve start
    if(time < 0){
        clearInterval(counter);
        qTimeCount.textContent = "00";
    }
    // - counting solve end
 }
}
// q-timeCount end

// startTimerLine() function start
function startTimerLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1;
        timeLines.style.width = time + "px";
        if(time > 319){
            clearInterval(counterLine);

        }
    }
}
// startTimerLine() function start

// showResultPage function start
function showResultPage(){
    rulexBox.classList.remove("activeDisplay");
    questionsSec.classList.remove("activeDisplay");

    resultPage.classList.add("activeResultPage");

    // score start
    const scoreText = document.querySelector(".resultScore");
    if(userScore > 3){
        let scoreTag = '<span>Congratulations! You got <p> '+ userScore +' </p> out of <p> '+ questions.length +' </p> </span>'; //don't use "" then can't access userScore
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>Carry on! You got <p> '+ userScore +' </p> out of <p> '+ questions.length +' </p> </span>'; //don't use "" then can't access userScore
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Faild! You got <p> '+ userScore +' </p> out of <p> '+ questions.length +' </p> </span>'; //don't use "" then can't access userScore
        scoreText.innerHTML = scoreTag;
    }
    // score end

}
// showResultPage function end

// quitQuizBtn start
quitQuizBtn.addEventListener("click", function(){
    window.location.reload()
})
restartBtn.addEventListener("click", function(){
    window.location.reload()
})
// quitQuizBtn end
