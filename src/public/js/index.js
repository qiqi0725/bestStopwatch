const timeContent = document.getElementById('time');
const lapContent = document.getElementById('laps');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const resumeButton = document.getElementById('resume');
const stopButton = document.getElementById('stop');
const lapButton = document.getElementById('lap');

let time = 0.0;
let seconds = 0.0;
let minutes = 0.0;
let hours = 0.0;
let lastTime = 0.0;
let timer = null;
let lapCounter = 1;
let firstClick = false;

/**
 * 
 * @param {int} num
 * Pad the displayed number with a 0 if num < 10 
 */
function pad(num) {
    return num >= 10 ? num : '0' + num;
}

/**
 * 
 * @param {HTMLElement} button
 * Hide the selected element 
 */
function hide(button) {
    button.style.display = 'none';
}

/**
 * 
 * @param {HTMLElement} button
 * Display the selected element 
 */
function show(button) {
    button.style.display = 'block';
}

/**
 * Enable the lap button and update time
 */
function startTime() {
    hide(startButton);
    show(stopButton);
    show(lapButton);
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


/**
 * Stop updating time and display a different set of buttons
 */
function stopTime() {
    window.clearInterval(timer);

    hide(stopButton);
    show(resetButton);
    hide(lapButton);
    show(resumeButton);
}

/**
 * Reset all the components of our stopwatch
 */
function resetTime() {
    time = 0.0;
    seconds = 0.0;
    minutes = 0.0;
    hours = 0.0;
    hide(resetButton);
    show(lapButton);
    hide(resumeButton);
    show(startButton);
    timeContent.innerHTML = '00:00:00.00';
    lapContent.innerHTML = '';
    lapCounter = 1;
    lastTime = 0.0;
}

/**
 * Resume the stopwatch at the previously stopped time
 */
function resumeTime() {
    hide(resumeButton);
    hide(resetButton);
    startTime();

}

/**
 * Display the lap section in descending order and keep the lap time.
 */
function lapTime() {
    const lapTime = pad((time - lastTime).toFixed(2));
    lastTime = time;
    lapCounter = pad(lapCounter);
    const content = `<div id=lap${lapCounter}>\n` +
    `<span>Lap ${lapCounter}</span>\n` +
    `<span>${lapTime}</span>\n` +
    `</div>\n`;
    
    lapContent.innerHTML = content + lapContent.innerHTML;
    lapCounter++;
}