let questions;
let currentQuestion;

const init = () => {
  currentQuestion = questions[0];
  showQuestion();
};

const showQuestion = () => {
  DocumentTimeline.getElementById("question").innerHTML = currentQuestion.question;
  const answersContainer = document.getElementById("answers");
  answersContainer.innerHTML = "";

  for(const [answer, nextQuestion] of Object.entries(currentQuestion.answers)) {
    const button = document.createElement("button");
    button.innerHTML = answer;
    button.onclick = () =>
  }
}

const next = (answer) => {
  if (typeof currentQuestion === "object") {
    currentQuestion = answer ? currentQuestion.yes : currentQuestion.no;
  }
  if (typeof currentQuestion === "string") {
    document.getElementById("question").innerHTML = "";
    document.getElementById("answer").innerHTML = currentQuestion;
    document.getElementById("answer").style.display = "block";
    document.getElementById("yes").style.display = "none";
    document.getElementById("no").style.display = "none";
  } else {
    document.getElementById("question").innerHTML = currentQuestion.question;
  }
};

let questions;
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    init();
  });
