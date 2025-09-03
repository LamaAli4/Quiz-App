# 📑 Technical Requirements Document

## 📝 Project: Quiz App

This document defines the functional, non-functional, and technical requirements of the Quiz App based on the provided user stories and implementation plan.
---

## 1. Functional Requirements

### 1.1 Quiz Display
- The app must display **all questions at once**.
- Each question should show:
  - The **question text**.
  - A set of answer options (radio buttons).
  - A mechanism that allows selecting only one option per question.

### 1.2 Question Types
- **Multiple Choice (MCQ)**:
  - Must accept a `text`, an array of `options`, and one `correctAnswer`.
- **True/False**:
  - Must always have two options: `"True"` and `"False"`.

### 1.3 User Actions
- **Submit button**:
  - Validates answers.
  - Calculates score.
  - Displays result with percentage and pass/fail feedback.
  - Locks all answers (disable inputs).
  - Marks quiz as finished in localStorage.
- **Reset button**:
  - Clears all selected answers (UI + localStorage).
  - Allows user to start over.

### 1.4 Persistence (localStorage)
- User answers must be **temporarily saved** in localStorage:
  - If the page is refreshed before submission, saved answers should reload automatically.
  - If the quiz is finished and refreshed, a new attempt should start with empty answers.
- Must store:
  - Selected answers (`quiz-answers`).
  - Current category (`quiz-category`).
  - Quiz finished status (`quiz-finished`).

---

## 2. Non-Functional Requirements
- Must use **OOP principles** in JavaScript:
  - `Question` class (base).
  - `TrueFalseQuestion` subclass.
  - `Quiz` class (manages logic, scoring, persistence).
- Must use **ES6 Modules** (`import/export`).
- Code must be **structured and modular**:
  - `app.js` → Main entry point (initialization + event binding).
  - `classes.js` → Contains classes.
  - `storage.js` → LocalStorage utilities.
  - `questionsData.js` → Raw questions.
  - `questions.js` → Convert data into objects.
  -  `ui.js` → Handles DOM rendering of questions
  - `events.js` → Handles user interactions and events
- Must use **DOM manipulation** for rendering and event handling.
- Project should include **at least 10 questions** (mix of MCQ + TF).

---

## 3. Technical Constraints
- App must run in any modern browser (Chrome, Firefox, Edge).
- No backend is required; runs fully on the client side.
- Requires serving via **local server** (due to ES6 modules restrictions).



