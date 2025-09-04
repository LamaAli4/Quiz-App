import { quiz } from "./app.js";
import { renderQuestions } from "./ui.js";

export function events({
  categorySelect,
  submitBtn,
  resetBtn,
  resultDiv,
  quizContainer,
}) {
  categorySelect.addEventListener("change", (e) => {
    const category = e.target.value;
    if (category) {
      quiz.saveCategory(category);
      quiz.clearAnswers();

      const chooseMsg = document.getElementById("choose-msg");
      if (chooseMsg) {
        chooseMsg.style.display = "none";
      }

      renderQuestions(category, quizContainer, resultDiv, submitBtn, resetBtn);
    }
  });

  submitBtn.addEventListener("click", () => {
    const category = quiz.loadCategory();
    const filteredQuestions = quiz.questions.filter(
      (q) => q.category === category
    );
    const answers = quiz.loadAnswers();

    if (answers.length < filteredQuestions.length) {
      document.getElementById("warningModal").classList.remove("hidden");
      return;
    }

    const score = quiz.calculateScore(answers, filteredQuestions);
    const percentage = quiz.getPercentage(filteredQuestions);
    const passed = quiz.hasPassed(filteredQuestions);

    resultDiv.innerHTML = `
      <div>Score: ${score}/${filteredQuestions.length}</div>
      <div>Percentage: ${percentage.toFixed(1)}%</div>
      <div>${
        passed
          ? "Congratulations! You passed! 🎉"
          : "Sorry, you didn't pass. Try again!"
      }</div>
    `;

    resultDiv.className = passed ? "success" : "failure";
    resultDiv.classList.remove("hidden");

    const allOptions = quizContainer.querySelectorAll("input[type='radio']");
    allOptions.forEach((input) => (input.disabled = true));

    quiz.markFinished();
    quiz.clearAnswers();
    submitBtn.classList.add("hidden");
  });

  resetBtn.addEventListener("click", () => {
    document.getElementById("resetModal").classList.remove("hidden");
  });

  document.getElementById("confirmReset").addEventListener("click", () => {
    quiz.clearAnswers();
    quiz.clearFinished();

    if (!quiz.isFinished) {
      categorySelect.value = quiz.loadCategory();
      renderQuestions(
        categorySelect.value,
        quizContainer,
        resultDiv,
        submitBtn,
        resetBtn
      );
    } else {
      quiz.clearCategory();
      categorySelect.value = "";
      quizContainer.innerHTML =
        '<p id="choose-msg" style="text-align: center; font-size: 18px">Please choose a category to start the quiz 👆</p>';
      submitBtn.classList.add("hidden");
      resetBtn.classList.add("hidden");
      resultDiv.innerHTML = "";
      resultDiv.classList.add("hidden");
    }

    document.getElementById("resetModal").classList.add("hidden");
  });

  document.getElementById("cancelReset").addEventListener("click", () => {
    document.getElementById("resetModal").classList.add("hidden");
  });

  document.getElementById("closeWarning").addEventListener("click", () => {
    document.getElementById("warningModal").classList.add("hidden");
  });
}
