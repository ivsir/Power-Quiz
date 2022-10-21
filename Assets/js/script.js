// var startButton = document.getElementById("start-btn");
// var questionContainer = document.getElementById("question-container");
// var questionElement = document.getElementById("question");
// var answerButtonsElement = document.getElementById("answer-buttons");

// var questionIndex, currentQuestion;

// var acceptedAnswer = true;
// var timer = 60;

// var availableQuestions = [];
// var questions = [
//   {
//     question: "What is the first law of power?",
//     answers: [
//       { text: "Never outshine the master.", correct: true },
//       { text: "Concentrate your forces.", correct: false },
//       { text: "Play to people's fantasies", correct: false },
//       { text: "Avoid the unhappy and unlucky", correct: false },
//     ],
//   },
//   {
//     question: "What is the 25th law of power?",
//     answers: [
//       {
//         text:
//           "Never put too much trust in friends, learn how to use enemies.",
//
//       },
//       { text: "Concentrate your forces.", correct: false },
//       { text: "Re-create yourself", correct: true },
//       { text: "Avoid the unhappy and unlucky", correct: false },
//     ],
//   },
//   {
//     question:
//       "Which law is this referring to? : He lives well who conceals himself well.",
//     answers: [
//       {
//         text:
//           "Never put too much trust in friends, learn how to use enemies.",
//         correct: false,
//       },
//       { text: "Avoid the unhappy and unlucky", correct: false },
//       { text: "Re-create yourself", correct: false },
//       { text: "Think as you like but behave like others", correct: true },
//     ],
//   },
// ];
// var max_questions = 4;

// startButton.addEventListener("click", startGame);

// // start the gameÇ

// function startGame() {
//   startButton.classList.add("hide");
//   questionContainer.classList.remove("hide");

//   // pick a random question
//   questionIndex = Math.floor(Math.random() * questions.length);
// //   var currentQuestion = questions[questionIndex];
// //   question.innerText = currentQuestion.question;
//   setNextQuestion();

// //   question.answers.forEach(answer => {
// //     var button = document.createElement("button");
// //     button.innerText = answer.text;
// //     button.classList.add("btn");
// //     if(answer.correct) {
// //         button.dataset.correct = answer.correct
// //     }
// //     button.addEventListener("click", selectAnswer)
// //     answerButtonsElement.appendChild(button);
// //   });
// }

// // set next question
// function setNextQuestion() {
//     showQuestion(questions[questionIndex]);
// }

// function showQuestion(question) {
//     question.innerText = currentQuestion.question;
// }
// // select the answer
// function selectAnswer(e) {}

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
    // progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`;
    
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    var currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset ["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuestions.splice(questionIndex,1);

    acceptedAnswer = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if(!acceptedAnswers) return;
    acceptedAnswers = false;
    var selectedChoice=e.target;
    var selectedAnswer=selectedChoice.dataset("number");

    var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : 'incorrect';

    if (classToApply === "correct") {
      incrementScore(score_points)
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classLIst.remove(classToApply);
      getNewQuestion();
    }, 1000)
  })
})

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}

startGame();