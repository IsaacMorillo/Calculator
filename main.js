const screenContainer = document.querySelector(".operation");
const buttons = document.querySelectorAll("button");
const operatorButtons = document.querySelectorAll(".operation-button");
const equalButton = document.querySelector("#equal-button");
const answer = document.querySelector(".answer");
const acButton = document.querySelector("#ac-button");

let selectedNumbers = [];
let operator = "";
let term = "";
let termsList = [];
let result;
let isClickEqual = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isClickEqual === true) {
      if (button.classList.contains("operation-button")) {
        screenContainer.textContent = `ANS ${button.textContent}`;
        operator = button.textContent;
      }
      if (button.classList.contains("number-button")) {
        selectedNumbers = [];
        term += button.textContent;
        screenContainer.textContent = button.textContent;
      }
    } else {
      if (button.classList.contains("number-button")) {
        term = term + button.textContent;
      } else {
        if (term == "" && button.textContent == "-") {
          term = term + button.textContent;
        } else {
          if (term != "") {
            term = Number.parseFloat(term);
            selectedNumbers.push(term);
            term = "";
          }
        }
      }
      if (button != equalButton) {
        const contentButton = button.textContent;
        screenContainer.textContent += contentButton + " ";
      }
    }
    isClickEqual = false;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator == "X" && button.textContent == "-") {
      operator = "X";
    } else if (operator == "/" && button.textContent == "-") {
      operator = "/";
    } else {
      operator = button.textContent;
    }
  });
});

equalButton.addEventListener("click", () => {
  result = resolveOperation(selectedNumbers);
  answer.textContent = result;
  isClickEqual = true;
  operator = "";
});

acButton.addEventListener("click", () => {
  selectedNumbers = [];
  operator = "";
  screenContainer.textContent = "";
  answer.textContent = "";
});

function choseOperation(operator, num1, num2) {
  switch (operator) {
    case "+":
      console.log("se llama add");
      return add(num1, num2);
      break;
    case "-":
      console.log("se llama resta");
      return substract(num1, num2);
      break;
    case "X":
      console.log("se llama multiplic");
      return multiply(num1, num2);
      break;
    case "/":
      console.log("se llama divide");
      return divide(num1, num2);
      break;
    case "%":
      return percentage(num1, num2);
      break;
    case "":
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

function resolveOperation(arr) {
  let result = 0;
  do {
    if (arr.length == 1) {
      result =  arr[0];
    } else {
      result = choseOperation(operator, arr[0], arr[1]);
    }
    arr.splice(0,2, result);
    console.log(arr);
  } while (arr.length > 1);
  return result;
}


