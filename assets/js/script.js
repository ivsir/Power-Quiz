var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("progressBarFull");
var timerEl = document.querySelector("#current-time");
var choiceResult = document.querySelector("#choice-result")
var timer;
var quizEnd = true;

var score = 0;

var timerCount = 30;

var currentQuestion =  {};
var acceptedAnswer = true;
var questionCounter = 0;
var availableQuestions = [];
var currentIndex = 0;

var questions = [
  {
    question: "What is the first law of power?",
    choice1: "Never outshine the master.",
    choice2: "Concentrate your forces.",
    choice3: "Play to people's fantasies",
    choice4: "Avoid the unhappy and unlucky",
    answer: "1",
  },
  {
    question: "What is the 25th law of power?",
    choice1: "Never put too much trust in friends, learn how to use enemies.",
    choice2: "Concentrate your forces.",
    choice3: "Re-create yourself",
    choice4: "Avoid the unhappy and unlucky",
    answer: "3",
  },
  {
    question:
      "Which law is this referring to? : He lives well who conceals himself well.",
    choice1: "Never put too much trust in friends, learn how to use enemies.",
    choice2: "Avoid the unhappy and unlucky",
    choice3: "Re-create yourself",
    choice4: "Think as you like but behave like others",
    answer: "4",
  },
  {
    question:
      "Which law is this referring to? : Do not commit to anyone.",
    choice1: "Law 4",
    choice2: "Law 6",
    choice3: "Law 20",
    choice4: "Law 24",
    answer: "3",
  },
];

var score_points = 25;
var maxQuestions = 4;
var penalty_time = 5;

function startGame(){
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    quizEnd= false;
    getNewQuestion();
    startTimer();
}

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerEl.innerText= timerCount;
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      timerEl.innerText= 0;
      localStorage.setItem("mostRecentScore", score);
      clearInterval(timer);
      
      choiceResult.innerText = "TIME'S UP!";
      setTimeout(() => {
        quizEnd = true;
        return window.location.href="./end.html";
      }, 1000)
    }
  }, 1000);
}

function getNewQuestion(){

    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.href="./end.html";
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    
    // assigns question to the question element
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    var currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    currentIndex = questionIndex

    // assigns each choice in a box corresponding to its number
    choices.forEach(choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        choice.setAttribute('data-answer',availableQuestions[questionIndex].answer);
    })

    // removes the question from the available questions array
    availableQuestions.splice(questionIndex,1);

    acceptedAnswer = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", function(event){
    if(!acceptedAnswer) return;

    acceptedAnswer = false;
    var selectedChoice = event.target;
    var selectedAnswer = selectedChoice.dataset["number"];
    
    var classToApply = selectedAnswer == this.getAttribute('data-answer') ? "correct" : "incorrect";
    
    

    if(classToApply === "correct") {
      incrementScore(score_points);
      choiceResult.innerText = "RIGHT ANSWER";

      // alert("Correct");

    }

    if(classToApply === "incorrect") {
      decrementTime(penalty_time);
      choiceResult.innerText = "WRONG ANSWER";
      // alert('incorrect');
    }

    // turns button green or red depending on answer
    
    selectedChoice.parentElement.classList.add(classToApply);
    // turns off the red or green button after one second
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
      choiceResult.innerText = " ";
    }, 1000)
  })
})

function incrementScore(num){
  score +=num;
  scoreText.innerText = score;
}

function decrementTime(time){
  timerCount -=time;
  timerCount.innerText = timerCount;

}

startGame();