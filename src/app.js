import { Quiz } from "./models.js";
import { questions } from "./questions.js";

const quiz = new Quiz(questions);

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

function renderQuestions(filterCategory) {
  quizContainer.innerHTML = "";
  chooseMsg.style.display = "none";

  const filteredQuestions = questions.filter(
    (q) => q.category === filterCategory
  );

  submitBtn.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
  resultDiv.classList.remove("hidden");

  const storedAnswers = quiz.loadAnswers();

  filteredQuestions.forEach((question, index) => {
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

      const saved = storedAnswers.find((a) => a.id === question.id);
      if (saved && saved.answer === option) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        const answers = quiz.loadAnswers();
        const updatedAnswers = answers.filter((a) => a.id !== question.id);
        updatedAnswers.push({ id: question.id, answer: input.value });
        quiz.saveAnswers(updatedAnswers);
      });

      label.append(input, document.createTextNode(option));
      qDiv.append(label);
    });

    quizContainer.append(qDiv);
  });
}

if (quiz.isQuizFinished()) {
  chooseMsg.style.display = "block";
  quiz.clearCategory();
  quiz.clearFinished();
  categorySelect.value = "";
  submitBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  resultDiv.classList.add("hidden");
} else {
  const savedCategory = quiz.loadCategory();
  const savedAnswers = quiz.loadAnswers();

  if (savedCategory && savedAnswers.length > 0) {
    categorySelect.value = savedCategory;
    renderQuestions(savedCategory);
  } else {
    chooseMsg.style.display = "block";
    quiz.clearCategory();
    categorySelect.value = "";
  }
}

categorySelect.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  quiz.saveCategory(selectedCategory);
  renderQuestions(selectedCategory);
});

// زر Submit
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
  renderQuestions(selectedCategory);
  quiz.clearFinished();
});
