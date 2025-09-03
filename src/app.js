import { Quiz } from "./classes.js";
import { questions } from "./questions.js";
import { renderQuestions } from "./ui.js";
import { events } from "./events.js";

export const quiz = new Quiz(questions);

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const resultDiv = document.getElementById("result");
const categorySelect = document.getElementById("category");
const chooseMsg = document.getElementById("choose-msg");

submitBtn.classList.add("hidden");
resetBtn.classList.add("hidden");
resultDiv.classList.add("hidden");
chooseMsg.classList.remove("hidden");

if (quiz.isQuizFinished()) {
  chooseMsg.style.display = "block";
  quiz.clearCategory();
  quiz.clearFinished();
  categorySelect.value = "";
  submitBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  resultDiv.innerHTML = "";
  resultDiv.classList.add("hidden");
} else {
  const savedCategory = quiz.loadCategory();
  const savedAnswers = quiz.loadAnswers();

  if (savedCategory && savedAnswers.length > 0) {
    categorySelect.value = savedCategory;
    renderQuestions(
      savedCategory,
      quizContainer,
      resultDiv,
      submitBtn,
      resetBtn
    );
  } else {
    chooseMsg.style.display = "block";
    quiz.clearCategory();
    categorySelect.value = "";
  }
}

events({ categorySelect, submitBtn, resetBtn, resultDiv, quizContainer });
