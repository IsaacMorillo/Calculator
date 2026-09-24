# 🧮 Web Calculator

A clean, responsive web calculator built from scratch using plain **HTML**, **CSS**, and **JavaScript**. 

Instead of taking the easy route with JavaScript's built-in `eval()` function, I built a custom expression parser under the hood to safely handle order of operations, nested parentheses, and keyboard inputs.

---

## 📸 Preview

> 🔗 **Live Demo:** https://isaacmorillo.github.io/Calculator/

---

## ✨ Features

* **Parentheses & Order of Operations:** Evaluates expressions with nested brackets `( )` following standard PEMDAS rules.
* **Implicit Multiplication:** Smart enough to interpret formats like `5(2)` or `(2)(3)` as multiplication without forcing you to type the `*` operator.
* **Smart Sign Handling:** Seamlessly computes expressions with back-to-back negative signs (e.g., `5 - -3` or `-5 + 2`).
* **Full Keyboard Support:** Type out operations naturally using your number pad, hit `Enter` or `=` to calculate, and use `Backspace` to delete digit-by-digit.
* **Error Prevention:** Catches common math errors like division by zero or unmatched parentheses, returning a friendly `ERROR` message on screen.
* **Precision Control:** Cleans up floating-point inaccuracies (like `0.1 + 0.2`) by rounding results neatly up to 4 decimal places.

---

## 🛠️ Built With

* **HTML5:** Semantic layout for the calculator shell, screen display, and control buttons.
* **CSS3:** Custom styles, responsive flexbox layout, and CSS variables (`--var`) for theme consistency.
* **JavaScript (ES6+):** Pure vanilla logic covering DOM manipulation, keyboard event handling, array parsing, and recursive math evaluation.
* **Git & GitHub:** Version control and live hosting via GitHub Pages.

---

## 🧠 Technical Highlights

Building the calculation engine was the meat of this project. Here is a quick look at how the code processes a calculation step-by-step:

1. **Tokenization (`determineNumbers`):** Raw user button clicks or key presses are cleaned up into a structured array of multi-digit numbers, decimals, and individual operators.
2. **Bracket Resolution (`resolveOperationComplete`):** Uses recursion to scan for the innermost set of parentheses, solves that sub-expression first, and injects the result back into the main calculation loop.
3. **Operator Precedence (`determineNextOperator`):** Ensures multiplication and division take priority over addition and subtraction, scanning left-to-right.

---

## 📁 Project Structure

```text
├── index.html
├── styles.css
├── main.js
└── README.md
