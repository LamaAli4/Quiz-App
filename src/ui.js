import { quiz } from "./app.js";
import { questions } from "./questions.js";
import { MultipleChoiceQuestion, TrueFalseQuestion } from "./classes.js";

export function renderQuestions(
  filterCategory,
  quizContainer,
  resultDiv,
  submitBtn,
  resetBtn
) {
  quizContainer.innerHTML = "";

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

      if (question instanceof MultipleChoiceQuestion) {
        input.type = "checkbox";
        input.name = `question${index}[]`;
      }
      else if (question instanceof TrueFalseQuestion) {
        input.type = "radio";
        input.name = `question${index}`;
      }

      input.value = option;

      const saved = storedAnswers.find((a) => a.id === question.id);
      if (saved) {
        if (Array.isArray(saved.answer)) {
          if (saved.answer.includes(option)) input.checked = true;
        } else {
          if (saved.answer === option) input.checked = true;
        }
      }

      input.addEventListener("change", () => {
        const answers = quiz.loadAnswers();
        const updatedAnswers = answers.filter((a) => a.id !== question.id);

        if (question instanceof MultipleChoiceQuestion) {
          const selected = Array.from(
            qDiv.querySelectorAll("input[type='checkbox']:checked")
          ).map((el) => el.value);
          updatedAnswers.push({ id: question.id, answer: selected });
        } else {
          updatedAnswers.push({ id: question.id, answer: input.value });
        }

        quiz.saveAnswers(updatedAnswers);
      });

      label.append(input, document.createTextNode(option));
      qDiv.append(label);
    });

    quizContainer.append(qDiv);
  });
}
