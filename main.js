const screenContainer = document.querySelector(".operation");
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operation-button");

let selectedNumbers = [];
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const contentButton = button.textContent;
    screenContainer.textContent += contentButton + " ";
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const numberSelect = Number.parseInt(button.textContent);
    selectedNumbers.push(numberSelect);
    console.log(selectedNumbers);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.textContent;
  });
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
