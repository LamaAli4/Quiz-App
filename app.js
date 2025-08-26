class Question {
  constructor(text, options, correctAnswer) {
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  isCorrectAnswer(selected) {
    return this.correctAnswer === selected;
  }
}

// Array of questions --- I will add more questions later
const questions = [
  new Question(
    "What is the capital of France?",
    ["Berlin", "Paris", "Rome"],
    "Paris"
  ),
  new Question("2 + 2 = ?", ["3", "4", "5"], "4"),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.isFinished = false;
  }

  calculateScore(answers) {
    this.score = 0;
    this.questions.forEach((ques, i) => {
      if (ques.isCorrectAnswer(answers[i])) {
        this.score++;
      }
    });
    this.isFinished = true;
    return this.score;
  }

  getPercentage() {
    return (this.score / this.questions.length) * 100;
  }

  isPassed() {
    return this.getPercentage() >= 70;
  }
}

// Testing the classes 
const quiz = new Quiz(questions);
const userAnswers = ["Paris", "4"];

console.log("User score:", quiz.calculateScore(userAnswers));
console.log("Percentage:", quiz.getPercentage());
console.log("Passed:", quiz.isPassed());

const wrongAnswers = ["Berlin", "4"];
console.log("User score:", quiz.calculateScore(wrongAnswers));
console.log("Percentage:", quiz.getPercentage());
console.log("Passed:", quiz.isPassed());
