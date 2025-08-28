import * as storage from "./storage.js";

export class Question {
  constructor({ id, text, options = [], correctAnswer, category }) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.category = category;
  }

  isCorrectAnswer(selected) {
    return this.correctAnswer === selected;
  }
}

export class TrueFalseQuestion extends Question {
  constructor({ id, text, correctAnswer, category }) {
    super({ id, text, options: ["True", "False"], correctAnswer, category });
  }
}

export class Quiz {
  constructor(questions, storageKey = "quiz-answers") {
    this.questions = questions;
    this.score = 0;
    this.isFinished = false;
    this.storage = storageKey;
    this.categoryKey = "quiz-category";
    this.finishedKey = "quiz-finished";
  }

  calculateScore(answers, filteredQuestions) {
    this.score = 0;
    filteredQuestions.forEach((q) => {
      const ans = answers.find((a) => a.id === q.id);
      if (ans && q.isCorrectAnswer(ans.answer)) {
        this.score++;
      }
    });
    this.isFinished = true;
    return this.score;
  }

  getPercentage(filteredQuestions) {
    return (this.score / filteredQuestions.length) * 100;
  }

  hasPassed(filteredQuestions) {
    return this.getPercentage(filteredQuestions) >= 70;
  }

  saveAnswers(answers) {
    storage.save(this.storage, answers);
  }

  loadAnswers() {
    return storage.load(this.storage, []);
  }

  clearAnswers() {
    storage.clear(this.storage);
  }

  saveCategory(category) {
    storage.save(this.categoryKey, category);
  }

  loadCategory() {
    return storage.load(this.categoryKey, "General");
  }

  clearCategory() {
    storage.clear(this.categoryKey);
  }

  markFinished() {
    storage.save(this.finishedKey, true);
  }

  isQuizFinished() {
    return storage.load(this.finishedKey, false) === true;
  }

  clearFinished() {
    storage.clear(this.finishedKey);
  }
}
