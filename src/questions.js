import { Question, TrueFalseQuestion } from "./models.js";
import { questionsData } from "./questionsData.js";

export const questions = questionsData.map((q) => {
  if (q.type === "mcq") {
    return new Question({
      id: q.id,
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
    });
  } else if (q.type === "tf") {
    return new TrueFalseQuestion({
      id: q.id,
      text: q.text,
      correctAnswer: q.correctAnswer,
    });
  }
});
