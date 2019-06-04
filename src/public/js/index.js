const timeContent = document.getElementById('time');
const lapContent = document.getElementById('laps');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const stopButton = document.getElementById('stop');
const lapButton = document.getElementById('lap');

let time = 0.0;
let lastTime = 0.0;
let timer = null;
let lapCounter = 1;
let firstClick = false;

function pad(num) {
    return num > 10 ? num : '0' + num;
}

function hide(button) {
    button.style.display = 'none';
}

function show(button) {
    button.style.display = 'block';
}

function startTime() {
    let seconds = 0.0;
    let minutes = 0.0;
    let hours = 0.0;

    hide(startButton);
    show(stopButton);
    lapButton.disabled = false;

    timer = window.setInterval(() => {
        time += 0.01;
        seconds += 0.01;
        if (seconds >= 60.0) {
            minutes++;
            seconds = 0.0;
        }
        if (minutes >= 60.0) {
            hours++;
            minutes = 0.0;
        }
        timeContent.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds.toFixed(2))}`;
    }, 1);
}

function stopTime() {
    window.clearInterval(timer);
    time = time.toFixed(2);
}

function resetTime() {
    time = 0.0;
}

function lapTime() {
    const lapTime = (time - lastTime).toFixed(2);
    lastTime = time;
    lapCounter = pad(lapCounter);

    lapContent.innerHTML += `<div id=lap${lapCounter}>\n` +
    `<span>Lap ${lapCounter}</span>\n` + 
    `<span>${lapTime}</span>\n` +
    `</div>\n`;

    lapCounter++;
}