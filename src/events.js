import { quiz } from "./app.js";
import { questions } from "./questions.js";
import { renderQuestions } from "./ui.js";

export function events({
  categorySelect,
  submitBtn,
  resetBtn,
  resultDiv,
  quizContainer,
}) {
  categorySelect.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    quiz.saveCategory(selectedCategory);
    renderQuestions(
      selectedCategory,
      quizContainer,
      resultDiv,
      submitBtn,
      resetBtn
    );
  });

  submitBtn.addEventListener("click", () => {
    const selectedCategory = categorySelect.value;
    const filteredQuestions = questions.filter(
      (q) => q.category === selectedCategory
    );

    const answers = [];
    filteredQuestions.forEach((q, i) => {
      const selected = document.querySelector(
        `input[name="question${i}"]:checked`
      );
      if (selected) {
        answers.push({ id: q.id, answer: selected.value });
      }
    });

    const score = quiz.calculateScore(answers, filteredQuestions);
    const percentage = quiz.getPercentage(filteredQuestions);
    const passed = quiz.hasPassed(filteredQuestions);

    resultDiv.textContent = `Your Score: ${score}/${
      filteredQuestions.length
    } (${percentage.toFixed(0)}%) - ${passed ? "Passed" : "Failed"}`;

    document
      .querySelectorAll("input[type=radio]")
      .forEach((input) => (input.disabled = true));

    quiz.clearAnswers();
    quiz.clearCategory();
    quiz.markFinished();
  });

  resetBtn.addEventListener("click", () => {
    document
      .querySelectorAll("input[type=radio]:checked")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input[type=radio]")
      .forEach((input) => (input.disabled = false));

    resultDiv.textContent = "";
    quiz.score = 0;
    quiz.isFinished = false;
    quiz.clearAnswers();

    const selectedCategory = categorySelect.value;
    quiz.saveCategory(selectedCategory);
    renderQuestions(
      selectedCategory,
      quizContainer,
      resultDiv,
      submitBtn,
      resetBtn
    );
    quiz.clearFinished();
  });
}
