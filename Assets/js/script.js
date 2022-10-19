var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame);

// start the game

function startGame() {
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    setNextQuestion()
}
console.log(currentQuestionIndex);

// set next question
function setNextQuestion() {


}
// select the answer
function selectAnswer() {

}

var questions = ["1","2","3","4"];