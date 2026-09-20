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
            if (
              operationComplete[operationComplete.length - 1] == "-" &&
              term < 0
            ) {
              term *= -1;
            }
            operationComplete.push(term);
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
      operationComplete.push(operator);
    }
  });
});

equalButton.addEventListener("click", () => {
  console.log(operationComplete);
  result = resolveOperationComplete(operationComplete);
  answer.textContent = result;
  isClickEqual = true;
  operator = "";
  operationComplete = [];
});

acButton.addEventListener("click", () => {
  operator = "";
  screenContainer.textContent = "";
  answer.textContent = "";
  operationComplete = [];
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

function resolveOperation(arrNum, arrOperators) {
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
      if (
        tempNum.length == 1 &&
        tempOperators[0] == "-" &&
        tempOperators.length == 1
      ) {
        tempNum[0] *= -1;
      }
      let result = resolveOperation(tempNum, tempOperators);
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
      return resolveOperation(tempNum, tempOperators);
    }
  } else {
    return validateExpression(arrComplet);
  }
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
