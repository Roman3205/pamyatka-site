let today = ""; //переменная текущей даты
window.onload = init; //после загрузки страницы
function init() {
    let button = document.getElementById("getresults") //доступ к кнопке
    button.onclick = handleButtonClick; //подключение созданной функции к переменной
}

function handleButtonClick() { //при клике на кнопку
    today = new Date();
    document.getElementById('date').innerText = today;
}

let resultsNode = document.querySelector('.results');
let buttonNode = document.querySelector('#getresults');
let punderbutNode = document.querySelector('.text-danger');
let score = document.querySelector('#score'); // добавлен элемент для отображения баллов
let yourmark = document.querySelector(`#yourmark`)
let body = document.querySelector(`#body`)

buttonNode.addEventListener('click', function(event) {
    let count = 0; // переменная count инициализирована внутри функции
    event.preventDefault();
    let containerNode = document.querySelector('.containeryour');
    let answers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let allInputsFilled = true;

    for (let i = 0; i < answers.length; i++) {
        let inputNode = document.querySelector(`#task${answers[i]}`);
        let inputValue = inputNode.value;
        if (inputValue === '') {
            allInputsFilled = false;
            break;
        }
        containerNode.innerHTML += `
        <li class="ans${answers[i]}">${inputValue}</li>
        `;
    }
    if (allInputsFilled) {
        body.classList.add(`no-scroll`)
        resultsNode.classList.remove('d-none');

        // задание 13
        const checkbox0 = document.querySelector('#inlineCheckbox132');
        const checkbox1 = document.querySelector('#inlineCheckbox133');
        const eans1 = document.querySelector('.eans1');
          if (checkbox0.checked) {
            eans1.innerHTML = `
            <li class="eans1 fiftyfifty">1</li>
            `
            count+=1
          }
          if (checkbox1.checked) {
            eans1.innerHTML = `
            <li class="eans1 true">2</li>
            `
            count+=2
          }
        
        // задание 14
        const checkbox2 = document.querySelector('#inlineCheckbox142');
        const checkbox3 = document.querySelector('#inlineCheckbox143');
        const checkbox4 = document.querySelector('#inlineCheckbox144');
        const eans2 = document.querySelector('.eans2');
        if (checkbox2.checked) {
            eans2.innerHTML = `
            <li class="eans2 fiftyfifty">1</li>
            `
            count+=1
          }
        if (checkbox3.checked) {
            eans2.innerHTML = `
            <li class="eans2 fiftyfifty">2</li>
            `
            count+=2
        }
        if (checkbox4.checked) {
            eans2.innerHTML = `
            <li class="eans2 true">3</li>
            `
            count+=3
        }
        // задание 15
        const checkbox5 = document.querySelector('#inlineCheckbox152');
        const checkbox6 = document.querySelector('#inlineCheckbox153');
        const eans3 = document.querySelector('.eans3');
            if (checkbox5.checked) {
              eans3.innerHTML = `
              <li class="eans3 fiftyfifty">1</li>
              `
              count+=1
        }
        if (checkbox6.checked) {
              eans3.innerHTML = `
              <li class="eans1 true">2</li>
              `
              count+=2
        }

        // задания 1-12
        for (let i = 1; i <= 12; i++) {
            let ansElement = document.querySelector(`.ans${i}`);
            let answer = ansElement.textContent;

            switch (i) {
                case 1:
                    if (answer.toLowerCase() === 'соликамск') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 2:
                    if (answer.toUpperCase() === 'ГБЕАЕА') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 3:
                    if (answer === '2') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 4:
                    if (answer === '7') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 5:
                    if (answer === '3') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 6:
                    if (answer === '4') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 7:
                    if (answer.toUpperCase() === 'ГБЖВЕАД') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 8:
                    if (answer === '1100') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 9:
                    if (answer === '16') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 10:
                    if (answer === '92') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 11:
                    if (answer.toLowerCase() === 'купец') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                case 12:
                    if (answer === '25') {
                        ansElement.classList.add('true');
                        count++;
                    } else {
                        ansElement.classList.add('false');
                    }
                    break;
                default:
                    break;
            }
        }
        score.innerHTML = `
        <h5 id="score" style="margin: 20px 0px 20px 0px; text-align: center;">Набрано баллов: <b>${count}</b></h5>
        `;
        let mark;
        if (count <= 4) {
            mark = 2;
        } else if (count >= 5 && count <= 10) {
            mark = 3;
        } else if (count >= 11 && count <= 15) {
            mark = 4;
        } else if (count >= 16 && count <= 19) {
            mark = 5;
        }

        yourmark.innerHTML = `
        <h2 id="mark" style="margin: 20px 0px 20px 0px; text-align: center;">Ваша оценка <b>${mark}</b></h2>
        `;
    } else {
        containerNode.innerHTML = ``
        punderbutNode.classList.remove('d-none');
        resultsNode.classList.add('d-none');
    }
});

// Таймер //

let timerElement = document.getElementById('timer');
let pauseButton = document.getElementById('pauseButton');

let timer;
let startTime;
let pausedTime = 0;
let isPaused = false;

const initialTime = {
    hours: 2,
    minutes: 30,
    seconds: 0
};

function startTimer() {
    startTime = Date.now() - pausedTime;
    timer = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    pausedTime = Date.now() - startTime;
    isPaused = true;
}

function updateTimer() {
    let elapsedTime = Date.now() - startTime;
    let remainingTime = initialTime.hours * 3600000 + initialTime.minutes * 60000 + initialTime.seconds * 1000 - elapsedTime;

    if (remainingTime <= 0) {
        clearInterval(timer);
        timerElement.textContent = '00:00:00';
        pauseButton.disabled = true;
        return;
    }

    let seconds = Math.floor((remainingTime / 1000) % 60);
    let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    let hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);

    timerElement.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
    return time.toString().padStart(2, '0');
}

pauseButton.addEventListener('click', function() {
    if (isPaused) {
        startTimer();
        pauseButton.textContent = 'Пауза';
        isPaused = false;
    } else {
        pauseTimer();
        pauseButton.textContent = 'Продолжить';
        isPaused = true;
    }
});

startTimer();

// калькулятор
let output = document.querySelector(`.output`)
let reset = document.querySelector(`.reset`)
let buttons = document.querySelectorAll(`.button`)

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
        output.textContent = input;
    }
});

reset.addEventListener(`click`, function() {
    output.style.color = `black`
    output.textContent = ``
})