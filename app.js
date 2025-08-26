class Question {
  constructor(text, options, correctAnswer) {
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  isCorrectAnswer(selected) {
    return this.correctAnswer === selected;
  }
}

// Array of questions --- I will add more questions later
const questions = [
  new Question(
    "What is the capital of France?",
    ["Berlin", "Paris", "Rome"],
    "Paris"
  ),
  new Question("2 + 2 = ?", ["3", "4", "5"], "4"),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.isFinished = false;
  }

  calculateScore(answers) {
    this.score = 0;
    this.questions.forEach((ques, i) => {
      if (ques.isCorrectAnswer(answers[i])) {
        this.score++;
      }
    });
    this.isFinished = true;
    return this.score;
  }

  getPercentage() {
    return (this.score / this.questions.length) * 100;
  }

  isPassed() {
    return this.getPercentage() >= 70;
  }
}

// Render questions to the DOM instead of console
const quizContainer = document.getElementById("quiz-container");
function renderQuestions() {
  quizContainer.innerHTML = "";
  questions.forEach((question, index) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("question");

    const qText = document.createElement("h3");
    qText.textContent = `${index + 1}. ${question.text}`;
    qDiv.append(qText);

    question.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = option;
      label.append(input, option);
      qDiv.append(label);
    });

    quizContainer.appendChild(qDiv);
  });
}

renderQuestions();
