const screenContainer = document.querySelector(".operation");
const buttons = document.querySelectorAll("button");
const operatorButtons = document.querySelectorAll(".operation-button");
const equalButton = document.querySelector("#equal-button");
const answer = document.querySelector(".answer");
const acButton = document.querySelector("#ac-button");

let operationComplete = [];
let operator = "";
let term = "";
let result;
let isClickEqual = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isClickEqual === true) {
      if (button.classList.contains("operation-button")) {
        screenContainer.textContent = `ANS ${button.textContent} `;
        operationComplete.push(result);
        operator = button.textContent;
      }
      if (button.classList.contains("number-button")) {
        screenContainer.textContent = button.textContent + " ";
        operationComplete.push(button.textContent);
      }
    } else {
      if (button.classList.contains("number-button")) {
        operationComplete.push(button.textContent);
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
    operationComplete.push(button.textContent);
  });
});

equalButton.addEventListener("click", () => {
  console.log(operationComplete);
  startCalculation();
});

acButton.addEventListener("click", () => {
  operator = "";
  screenContainer.textContent = "";
  answer.textContent = "";
  operationComplete = [];
});

function startCalculation() {
  result = resolveOperationComplete(operationComplete);
  answer.textContent = result;
  isClickEqual = true;
  operator = "";
  operationComplete = [];
}

document.addEventListener("keydown", (event) => {
  const input = event.key;
  if (input == "Backspace") {
    deleterChar();
  }
  if (
    Number.isFinite(Number.parseInt(input)) ||
    input == "." ||
    input == "+" ||
    input == "-" ||
    input == "/" ||
    input == "(" ||
    input == ")" ||
    input == "%"
  ) {
    addChar(input);
  }
  if (input == '*'){
      operationComplete.push('X');
  screenContainer.textContent += 'X' + " ";
  }
});

function deleterChar() {
  operationComplete.pop();
  screenContainer.textContent = screenContainer.textContent.slice(
    0,
    screenContainer.textContent.length - 2,
  );
}

function addChar(char) {
  operationComplete.push(char);
  screenContainer.textContent += char + " ";
}

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
    case "(":
      break;
    case ")":
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

function resolveOperationBasic(arrNum, arrOperators) {
  let result = 0;
  do {
    let nextOperator = determineNextOperator(arrNum, arrOperators);
    if (arrNum.length == 1) {
      result = arrNum[0];
    } else {
      result = choseOperation(
        arrOperators[nextOperator],
        arrNum[nextOperator],
        arrNum[nextOperator + 1],
      );
    }
    arrNum.splice(nextOperator, 2, result);
    arrOperators.splice(nextOperator, 1);
  } while (arrNum.length > 1);
  return result;
}

function resolveOperationComplete(arrComplet) {
  arrComplet = determineNumbers(arrComplet);
  console.log(arrComplet);
  let tempNum = [];
  let tempOperators = [];
  if (validateExpression(arrComplet) === true) {
    arrComplet = addImplicitMultiplication(arrComplet);
    if (arrComplet.includes("(")) {
      let indexOpenParenthesis = arrComplet.lastIndexOf("(");
      let indexCloseParenthesis = arrComplet.indexOf(")", indexOpenParenthesis);
      let elementBetweenParenthesis =
        indexCloseParenthesis - indexOpenParenthesis + 1;
      for (let i = indexOpenParenthesis + 1; i < indexCloseParenthesis; i++) {
        classifyNumberOrOperator(arrComplet[i], tempNum, tempOperators);
      }
      transformNegativeNumber(tempNum, tempOperators);
      let result = resolveOperationBasic(tempNum, tempOperators);
      arrComplet.splice(
        indexOpenParenthesis,
        elementBetweenParenthesis,
        result,
      );
      return resolveOperationComplete(arrComplet);
    } else {
      for (let i = 0; i < arrComplet.length; i++) {
        classifyNumberOrOperator(arrComplet[i], tempNum, tempOperators);
      }
      return resolveOperationBasic(tempNum, tempOperators);
    }
  } else {
    return validateExpression(arrComplet);
  }
}

function determineNumbers(arrComplet) {
  let arrCompletCorrect = [];
  for (let i = 0; i < arrComplet.length; i++) {
    if (
      Number.isFinite(Number.parseFloat(arrComplet[i])) ||
      arrComplet[i] == "."
    ) {
      let transformedNumber = arrComplet[i];
      while (
        Number.isFinite(Number.parseFloat(arrComplet[i + 1])) ||
        arrComplet[i + 1] == "."
      ) {
        i++;
        transformedNumber += arrComplet[i];
      }
      arrCompletCorrect.push(Number.parseFloat(transformedNumber));
    } else {
      if (
        (arrComplet[i] == "-" && i == 0) ||
        (arrComplet[i] == "-" &&
          (arrComplet[i - 1] == "X" || arrComplet[i - 1] == "/"))
      ) {
        arrCompletCorrect.push(
          Number.parseFloat(arrComplet[i] + arrComplet[i + 1]),
        );
        i++;
        continue;
      }
      if (multiplyOperators(arrComplet[i], arrComplet[i + 1]) == "-") {
        arrCompletCorrect.push("-");
        i++;
        continue;
      } else if (multiplyOperators(arrComplet[i], arrComplet[i + 1]) == "+") {
        arrCompletCorrect.push("+");
        i++;
        continue;
      }
      arrCompletCorrect.push(arrComplet[i]);
    }
  }
  return arrCompletCorrect;
}

function determineNextOperator(arrNum, arrOperators) {
  let isExistOperatorMul = isExistOperator(arrOperators, "X");
  let isExistOperatorDiv = isExistOperator(arrOperators, "/");
  if (isExistOperatorDiv && isExistOperatorMul) {
    return arrOperators.indexOf("X") < arrOperators.indexOf("/")
      ? arrOperators.indexOf("X")
      : arrOperators.indexOf("/");
  }
  if (isExistOperatorDiv) {
    return arrOperators.indexOf("/");
  }
  if (isExistOperatorMul) {
    return arrOperators.indexOf("X");
  }
  return 0;
}

function isExistOperator(arrOperators, operator) {
  if (arrOperators.includes(operator)) {
    return true;
  }
  return false;
}

function validateExpression(arrComplet) {
  let numParenthesisOpen = arrComplet.filter((element) => {
    return element == "(";
  }).length;
  let numParenthesisClose = arrComplet.filter((element) => {
    return element == ")";
  }).length;
  if (numParenthesisOpen !== numParenthesisClose) {
    return "ERROR";
  }
  return true;
}

function addImplicitMultiplication(arrComplet) {
  let tempArr = [];
  for (let i = 0; i < arrComplet.length; i++) {
    if (
      arrComplet[i] == "(" &&
      (Number.isFinite(arrComplet[i - 1]) || arrComplet[i - 1] == ")")
    ) {
      tempArr.push("X", arrComplet[i]);
    } else if (arrComplet[i] == ")" && Number.isFinite(arrComplet[i + 1])) {
      tempArr.push(arrComplet[i], "X");
    } else {
      tempArr.push(arrComplet[i]);
    }
  }
  return tempArr;
}

function classifyNumberOrOperator(char, arrNumbers, arrOperators) {
  if (Number.isFinite(char)) {
    arrNumbers.push(char);
  } else {
    arrOperators.push(char);
  }
}

function transformNegativeNumber(arrNumbers, arrOperators) {
  if (
    arrNumbers.length == 1 &&
    arrOperators[0] == "-" &&
    arrOperators.length == 1
  ) {
    arrNumbers[0] *= -1;
  }
}

function multiplyOperators(operator1, operator2) {
  if (
    (operator1 == "+" && operator2 == "-") ||
    (operator1 == "-" && operator2 == "+")
  ) {
    return "-";
  }
  if (operator1 == "-" && operator2 == "-") {
    return "+";
  }
  return "";
}
