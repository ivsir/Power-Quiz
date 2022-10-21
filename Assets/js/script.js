var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("progressBarFull");

let score = 0;

let time = 60;

let currentQuestion = {};
let acceptedAnswer = true;
let questionCounter = 0;
let availableQuestions = [];

var questions = [
  {
    question: "What is the first law of power?",
    choice1: "Never outshine the master.",
    choice2: "Concentrate your forces.",
    choice3: "Play to people's fantasies",
    choice4: "Avoid the unhappy and unlucky",
    answer: 1,
  },
  {
    question: "What is the 25th law of power?",
    choice1: "Never put too much trust in friends, learn how to use enemies.",
    choice2: "Concentrate your forces.",
    choice3: "Re-create yourself",
    choice4: "Avoid the unhappy and unlucky",
    answer: 3,
  },
  {
    question:
      "Which law is this referring to? : He lives well who conceals himself well.",
    choice1: "Never put too much trust in friends, learn how to use enemies.",
    choice2: "Avoid the unhappy and unlucky",
    choice3: "Re-create yourself",
    choice4: "Think as you like but behave like others",
    answer: 4,
  },
  {
    question:
      "Which law is this referring to? : Do not commit to anyone.",
    choice1: "Law 4",
    choice2: "Law 6",
    choice3: "Law 20",
    choice4: "Law 24",
    answer: 3,
  },
];

var score_points = 100;
var maxQuestions = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    
    // assigns question to the question element
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    var currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // assigns each choice in a box corresponding to its number
    choices.forEach(choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

    // removes the question from the available questions array
    availableQuestions.splice(questionIndex,1);

    acceptedAnswer = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", function(event){
    if(!acceptedAnswer) return;

    acceptedAnswer = false;
    var selectedChoice = event.target
    var selectedAnswer = selectedChoice.dataset["number"];

    var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(score_points);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000)
  })
})

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}

startGame();