import { TrueFalseQuestion, MultipleChoiceQuestion } from "./classes.js";
import { questionsData } from "./questionsData.js";

export const questions = questionsData.map((q) => {
  if (q.type === "mcq") {
    return new MultipleChoiceQuestion({
      id: q.id,
      text: q.text,
      options: q.options,
      correctAnswers: q.correctAnswers,
      category: q.category,
    });
  } else if (q.type === "tf") {
    return new TrueFalseQuestion({
      id: q.id,
      text: q.text,
      correctAnswer: q.correctAnswer,
      category: q.category,
    });
  }
});
