# 📝 Quiz App

## 🎯 Objective
The **Quiz App** is a single-page web application built using **Object-Oriented Programming (OOP)** principles in JavaScript (ES6 classes).  
It allows users to take quizzes with multiple-choice and true/false questions, while maintaining answers in **localStorage** during the attempt.

---

## 🚀 Features
- Display **all questions at once** on the screen.  
- Support for **multiple-choice** and **true/false** questions.  
- **Reset button** to clear answers and restart the quiz.  
- **Submit button** to finish the quiz and show results.  
- Final result showing **score / total questions**.  
- Pass/Fail feedback (**Pass ≥ 70%**).  
- **localStorage integration**:  
  - Keeps answers when the page is refreshed (before submission).  
  - Clears answers once the quiz is finished for a fresh start.

---

## 👤 User Stories
- As a user, I want to **see all questions on the screen at once** so I can answer them in any order.  
- As a user, I want each question to display **multiple options** (multiple-choice or true/false).  
- As a user, I want a **reset button** to clear my answers and restart.  
- As a user, I want a **submit button** to complete the quiz.  
- As a user, I want to see my **final score** after submitting.  
- As a user, I want to know if I **passed or failed** (≥70% = Pass).  
- As a user, I want my answers to be **temporarily saved** so that refreshing the page does not erase them.  
- As a user, once I finish the quiz and refresh, I want the app to **start fresh** with empty answers.  

---

## 🛠️ Tech Stack
- **HTML5**  
- **CSS3**  
- **JavaScript (ES6 Classes)**  
- **localStorage**

---

## 📂 Project Structure

- **/src**
  - **app.js** → Main entry point (UI + events)
  - **models.js** → Classes (Question, TrueFalseQuestion, Quiz)
  - **storage.js** → LocalStorage helpers
  - **questionsData.js** → Raw questions
  - **questions.js** → Question objects initialization
  - **ui.js** → Rendering logic 
  - **events.js** → Event listeners 

---

## ▶️ How to Run
1. Clone the repository or download the project folder.  
   ```bash
   git clone https://github.com/LamaAli4/Quiz-App.git
- Open the project folder.
- open the project with live server

---

## ✅ Requirements
- The quiz displays all questions at once. *

- Each question allows selecting only one option. *

- Submit button shows final score + pass/fail feedback. *

- Reset button clears answers (UI + localStorage). * 

- If refreshed before finishing, answers are restored. *

- If refreshed after finishing, quiz starts fresh. *

- Must follow OOP principles (classes, inheritance, encapsulation, polymorphism). *


