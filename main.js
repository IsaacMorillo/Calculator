const screenContainer = document.querySelector(".operation");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const contentButton = button.textContent;
    screenContainer.textContent += contentButton + " ";
  });
});


