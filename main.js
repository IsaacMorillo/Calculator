const screenContainer = document.querySelector('.screen-container');
const buttons = document.querySelectorAll('button');

buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const contentButton = button.textContent;
        screenContainer.textContent += contentButton;
    })
})