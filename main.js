const screenContainer = document.querySelector(".operation");
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operation-button");
const equalButton = document.querySelector("#equal-button");
const answer = document.querySelector(".answer");

let selectedNumbers = [];
let operator = "";
let term = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number-button")) {
      term = term + button.textContent;
    } else {
      term = Number.parseFloat(term);
      selectedNumbers.push(term);
      term = "";
    }
    if (button != equalButton) {
      const contentButton = button.textContent;
      screenContainer.textContent += contentButton + " ";
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.textContent;
  });
});

equalButton.addEventListener("click", () => {
  let num1 = selectedNumbers[0];
  let num2 = selectedNumbers[1];
  answer.textContent = choseOperation(operator, num1, num2);
});

function choseOperation(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return substract(num1, num2);
      break;
    case "X":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
    case "%":
      return percentage(num1, num2);
      break;
    default:
      return "ERROR";
      console.log("No reconzco esta opcion");
      break;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 == 0) {
    return "ERROR";
  }
  return num1 / num2;
}

function percentage(num1, num2) {
  num1 = num1 / 100;
  return num1 * num2;
}
