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

class TrueFalseQuestion extends Question {
  constructor(text, correctAnswer) {
    super(text, ["True", "False"], correctAnswer);
  }
}

// Array of questions (mix MCQ + True/False)
const questions = [
  new Question(
    "What is the capital of France?",
    ["Berlin", "Paris", "Rome"],
    "Paris"
  ),
  new Question("2 + 2 = ?", ["3", "4", "5"], "4"),
  new TrueFalseQuestion("The Earth is flat.", "False"),
  new TrueFalseQuestion("JavaScript is a programming language.", "True"),
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

const quiz = new Quiz(questions);

// Render questions to the DOM
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

// Submit Button
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");

submitBtn.addEventListener("click", () => {
  const answers = [];

  questions.forEach((_, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    answers.push(selected ? selected.value : null);
  });

  const score = quiz.calculateScore(answers);
  const percentage = quiz.getPercentage();
  const passed = quiz.isPassed();

  resultDiv.textContent = `Your Score: ${score}/${
    questions.length
  } (${percentage.toFixed(0)}%) - ${passed ? "Passed 🎉" : "Failed ❌"}`;

  document.querySelectorAll("input[type=radio]").forEach((input) => {
    input.disabled = true;
  });
});

// Reset Button
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  questions.forEach((_, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selected) selected.checked = false;
  });

  resultDiv.textContent = "";

  quiz.score = 0;
  quiz.isFinished = false;

  document.querySelectorAll("input[type=radio]").forEach((input) => {
    input.disabled = false;
  });
});
