const screenContainer = document.querySelector(".operation");
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number-button");
let selectedNumbers = [];

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
