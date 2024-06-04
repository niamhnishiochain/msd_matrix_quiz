let questions;
let currentQuestion;
let isFirstQuestion = true;

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      questions = data;
      init();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      showError('Could not load questions. Please try again later.');
    });
});

const init = () => {
  if (questions && questions.length > 0) {
    currentQuestion = questions[0];
    showQuestion();
  } else {
    showError('No questions available.');
  }
};

const showQuestion = () => {
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  
  questionElement.innerHTML = currentQuestion.question;
  answersContainer.innerHTML = ''; // Clear previous answers

  Object.entries(currentQuestion.answers).forEach(([answer, nextQuestion], index) => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = answer;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(answer));
    answersContainer.appendChild(label);
    answersContainer.appendChild(document.createElement('br'));
  });

  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'Submit';
  submitButton.onclick = handleSubmit;
  answersContainer.appendChild(submitButton);
};

const handleSubmit = () => {
  const selectedAnswers = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  processNext(selectedAnswers);
  isFirstQuestion = false;
};

const processNext = (selectedAnswers) => {
  const nextQuestions = selectedAnswers.map(answer => currentQuestion.answers[answer]).filter(Boolean);

  if (nextQuestions.length === 1) {
    next(nextQuestions[0]);
  } else {
    const combinedAnswers = {};
    nextQuestions.forEach(nextQuestion => {
      Object.entries(nextQuestion.answers).forEach(([answer, next]) => {
        if (!combinedAnswers[answer]) {
          combinedAnswers[answer] = next;
        }
      });
    });
    next({ question: 'Combined question', answers: combinedAnswers });
  }
};

const next = (nextQuestion) => {
  if (typeof nextQuestion === 'string') {
    displayFinalMessage(nextQuestion);
  } else if (nextQuestion.question) {
    currentQuestion = nextQuestion;
    showQuestion();
  } else {
    displayFinalMessage(nextQuestion);
  }
};

const displayFinalMessage = (message) => {
  document.getElementById('question').innerHTML = '';
  document.getElementById('answer').innerHTML = message;
  document.getElementById('answer').style.display = 'block';
  document.getElementById('answers').style.display = 'none';
};

const showError = (message) => {
  const errorElement = document.createElement('div');
  errorElement.innerHTML = message;
  errorElement.style.color = 'red';
  document.body.appendChild(errorElement);
};
