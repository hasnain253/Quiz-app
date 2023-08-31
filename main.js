const questions = [
  {
    question: "which is largest animal in world",
    answers: [
      { text: "shark", correct: "false" },
      { text: "blue wahles", correct: "true" },
      { text: "Elephent", correct: "false" },
      { text: "Donkey", correct: "false" },
    ],
  },

  {
    question: "which is smallest country in world",
    answers: [
      { text: "Vatican City", correct: "true" },
      { text: "Pakistan", correct: "false" },
      { text: "Buttan", correct: "false" },
      { text: "India", correct: "false" },
    ],
  },

  {
    question: "which is largest dessert in world",
    answers: [
      { text: "kalhari", correct: "false" },
      { text: "Gobi", correct: "false" },
      { text: "Sahara", correct: "false" },
      { text: "Antarctica", correct: "true" },
    ],
  },
  {
    question: "which is smallest continent in the  world",
    answers: [
      { text: "Asia", correct: "false" },
      { text: "Austrilia", correct: "true" },
      { text: "Africa", correct: "false" },
      { text: "Articia", correct: "false" },
    ],
  },
];
const questionElement = document.getElementById("question");
const answersButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " ." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answersButton.firstChild) {
    answersButton.removeChild(answersButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct == "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answersButton.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButtons() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButtons();
  } else {
    startQuiz();
  }
});
startQuiz();
