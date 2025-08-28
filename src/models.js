export class Question {
  constructor({ id, text, options = [], correctAnswer }) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
  isCorrectAnswer(selected) {
    return this.correctAnswer === selected;
  }
}

export class TrueFalseQuestion extends Question {
  constructor({ id, text, correctAnswer }) {
    super({ id, text, options: ["True", "False"], correctAnswer });
  }
}

export class Quiz {
  constructor(questions, storageKey = "quiz-answers") {
    this.questions = questions;
    this.score = 0;
    this.isFinished = false;
    this.storage = storageKey;
  }

  calculateScore(answers) {
    this.score = 0;
    this.questions.forEach((q, i) => {
      if (q.isCorrectAnswer(answers[i].answer)) this.score++;
    });
    this.isFinished = true;
    return this.score;
  }

  getPercentage() {
    return (this.score / this.questions.length) * 100;
  }

  hasPassed() {
    return this.getPercentage() >= 70;
  }

  saveAnswers(answers) {
    localStorage.setItem(this.storage, JSON.stringify(answers));
  }

  loadAnswers() {
    return JSON.parse(localStorage.getItem(this.storage) || "[]");
  }

  clearAnswers() {
    localStorage.removeItem(this.storage);
  }
}

