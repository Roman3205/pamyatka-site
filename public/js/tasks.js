let output = document.querySelector('.output');
let buttons = document.querySelectorAll('.button');
let reset = document.querySelector(`.reset`)

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        if (output.textContent.length < 12) {
            output.textContent += button.textContent;
        }
    });
});

  
let result = document.querySelector('.result');

result.addEventListener('click', function() {
    let input = output.textContent;
    
    if (input.length>11 || input.includes('//') || input.includes('**') || input.includes('++') || input.includes('--') || input.includes('==')) {
        output.textContent = ``;
    } else {
        output.textContent = eval(input);
    }
});
  
reset.addEventListener(`click`, function() {
    output.style.color = `black`
    output.textContent = ``
})