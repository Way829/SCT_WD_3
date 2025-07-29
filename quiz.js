let currentQuestion = 0;
let score = 0;

const quizBox = document.getElementById("quiz-box");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result-box");
const scoreDisplay = document.getElementById("score");

function loadQuestion() {
  quizBox.innerHTML = '';
  const q = questions[currentQuestion];

  const qEl = document.createElement("h3");
  qEl.innerText = `Q${currentQuestion + 1}. ${q.question}`;
  quizBox.appendChild(qEl);

  if (q.type === "single") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.className = "option";
      label.innerHTML = `<input type="radio" name="answer" value="${opt}" /> ${opt}`;
      quizBox.appendChild(label);
    });
  } else if (q.type === "multi") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.className = "option";
      label.innerHTML = `<input type="checkbox" name="answer" value="${opt}" /> ${opt}`;
      quizBox.appendChild(label);
    });
  } else if (q.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "answer";
    input.placeholder = "Type your answer";
    input.style = "width: 100%; padding: 10px; margin-top: 10px;";
    quizBox.appendChild(input);
  }

  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
}

function checkAnswer() {
  const q = questions[currentQuestion];
  let userAnswer;

  if (q.type === "single") {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      userAnswer = selected.value;
    }
  } else if (q.type === "multi") {
    const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked'));
    userAnswer = selected.map(input => input.value);
  } else if (q.type === "fill") {
    const input = document.querySelector('input[name="answer"]');
    userAnswer = input.value.trim();
  }

  let correct = false;

  if (q.type === "multi") {
    correct =
      Array.isArray(userAnswer) &&
      userAnswer.length === q.answer.length &&
      userAnswer.every(val => q.answer.includes(val));
  } else {
    correct = userAnswer === q.answer;
  }

  if (correct) score++;

  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.style.display = "none";
  document.getElementById("controls").style.display = "none";
  resultBox.style.display = "block";
  scoreDisplay.innerText = `You scored ${score} out of ${questions.length}`;
}

submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
