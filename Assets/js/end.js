var username = document.querySelector("#username");
var saveScoreBtn = document.querySelector("#saveScoreBtn");
var finalScore = document.querySelector("#finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");


var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var maxHighScores = 5;

username.addEventListener("keyup", function(){
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    e.preventDefault()

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score;
    })

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
}