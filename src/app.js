import { Quiz } from "./models.js";
import { questions } from "./questions.js";

const quiz = new Quiz(questions);

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const resultDiv = document.getElementById("result");


// render in DOM
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

      input.addEventListener("change", () => {
        const answers = [];
        questions.forEach((q, i) => {
          const selected = document.querySelector(
            `input[name="question${i}"]:checked`
          );
          if (selected) {
            answers.push({ id: q.id, answer: selected.value });
          }
        });

        quiz.saveAnswers(answers);
      });

      label.append(input, document.createTextNode(option));
      qDiv.append(label);
    });

    quizContainer.append(qDiv);
  });
}

renderQuestions();

const storedAnswers = quiz.loadAnswers();
storedAnswers.forEach((ans) => {
  const index = questions.findIndex((q) => q.id === ans.id);
  if (index !== -1) {
    const input = document.querySelector(
      `input[name="question${index}"][value="${ans.answer}"]`
    );
    if (input) input.checked = true;
  }
});

// Submit
submitBtn.addEventListener("click", () => {
  const answers = [];

  questions.forEach((q, i) => {
    const selected = document.querySelector(
      `input[name="question${i}"]:checked`
    );
    if (selected) {
      answers.push({ id: q.id, answer: selected.value });
    }
  });

  const score = quiz.calculateScore(
    questions.map((q) => {
      const ans = answers.find((a) => a.id === q.id);
      return { id: q.id, answer: ans ? ans.answer : null };
    })
  );

  const percentage = quiz.getPercentage();
  const passed = quiz.hasPassed();

  resultDiv.textContent = `Your Score: ${score}/${
    questions.length
  } (${percentage.toFixed(0)}%) - ${passed ? "Passed" : "Failed"}`;

  document
    .querySelectorAll("input[type=radio]")
    .forEach((input) => (input.disabled = true));
  quiz.clearAnswers();
});

// Reset
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
});
