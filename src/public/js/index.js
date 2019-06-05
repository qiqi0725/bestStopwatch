const timeContent = document.getElementById('time');
const lapContent = document.getElementById('laps');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const resumeButton = document.getElementById('resume');
const stopButton = document.getElementById('stop');
const lapButton = document.getElementById('lap');

let laps = {};
let minLap = {};
let maxLap = {};
let seconds = 0.0;
let minutes = 0.0;
let hours = 0.0;
let _seconds = 0.0;
let _minutes = 0.0;
let _hours = 0.0;
let lapCounter = 1;
let lapTimer = null;
let mainTimer = null;

/**
 * 
 * @param {Number} num
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
 * 
 * @param {Object} time 
 */
function formatTime(time) {
    return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds.toFixed(2))}`;
}

function startMainTimer() {
    const firstLap = document.getElementById('timeLap1');

    mainTimer = window.setInterval(() => {
        seconds += 0.01;

        if (seconds >= 60.0) {
            minutes++;
            seconds = 0.0;
        }
        if (minutes >= 60.0) {
            hours++;
            minutes = 0.0;
        }
        timeOutput = formatTime({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })
        timeContent.innerHTML = timeOutput;
        if (lapCounter === 1) {
            firstLap.innerHTML = timeOutput;
        }
    }, 10);
}

/**
 * Enable the lap button and update time
 */
function startTime() {
    hide(startButton);
    show(stopButton);
    show(lapButton);
    lapButton.disabled = false;
    startMainTimer();
}


/**
 * Stop updating time and display a different set of buttons
 */
function stopTime() {
    window.clearInterval(mainTimer);
    window.clearInterval(lapTimer);
    hide(stopButton);
    show(resetButton);
    hide(lapButton);
    show(resumeButton);
}

/**
 * Reset all the components of our stopwatch
 */
function resetTime() {
    laps = {};
    minLap = {};
    maxLap = {};
    seconds = 0.0;
    minutes = 0.0;
    hours = 0.0;
    lapCounter = 1;
    lapButton.disabled = true;
    timeContent.innerHTML = '00:00:00.00';
    lapContent.innerHTML = `<div id="lapBlock1">\n` +
        `<span id="lap1">Lap 01</span>\n` +
        `<span id="timeLap1">00:00:00.00</span>\n` +
        `</div>\n`;
    hide(resetButton);
    show(lapButton);
    hide(resumeButton);
    show(startButton);
}

/**
 * Resume the stopwatch at the previously stopped time
 */
function resumeTime() {
    hide(resumeButton);
    hide(resetButton);
    startTime();
    startLapTime(true);
}

function startLapTimer(currentLap) {
    lapTimer = setInterval(() => {
        _seconds += 0.01;
        if (_seconds >= 60.0) {
            _minutes++;
            _seconds = 0.0;
        }
        if (_minutes >= 60.0) {
            _hours++;
            _minutes = 0.0;
        }
        
        const timeOutput = formatTime({
            seconds: _seconds,
            minutes: _minutes,
            hours: _hours
        });
        currentLap.innerHTML = timeOutput;
        laps[lapCounter] = _seconds;
        getSlowestLap();
    }, 10);
}

/**
 * Display the lap section in descending order and keep the lap time.
 */
function startLapTime(isResume) {
    if (!isResume) {
        const lap = lapCounter === 1 ? seconds : _seconds;
        laps[lapCounter] = lap;
        if (lapCounter === 1) {
            minLap = {
                position: 0,
                time: seconds
            };
            maxLap = {
                position: 0,
                time: seconds
            };
        }
        getFastestLap();
        _seconds = 0.0;
        _minutes = 0.0;
        _hours = 0.0;
        lapCounter++;
        const content = `<div id="lapBlock${lapCounter}">\n` +
            `<span id="lap${lapCounter}">Lap ${pad(lapCounter)}</span>\n` +
            `<span id="timeLap${lapCounter}">00:00:00.00</span>\n` +
            `</div>\n`;

        if (lapCounter === 2) {
            window.clearInterval(mainTimer);
            startMainTimer();
        } else {
            window.clearInterval(lapTimer);
        }

        lapContent.innerHTML = content + lapContent.innerHTML;
        const currentLap = document.getElementById(`timeLap${lapCounter}`);
        startLapTimer(currentLap);
    } else if (lapCounter !== 1) {
        const currentLap = document.getElementById(`timeLap${lapCounter}`);
        startLapTimer(currentLap);
    }
}

function getFastestLap() {
    for (const [key, value] of Object.entries(laps)) {
        if (value <= minLap.time) {
            const block = document.getElementById(`lapBlock${minLap.position}`);
            if(block){
                block.style.color = "white";
            }
            minLap.time = value;
            minLap.position = key;
            document.getElementById(`lapBlock${key}`).style.color = "green";
        }
    }
}

function getSlowestLap(){
    for (const [key, value] of Object.entries(laps)) {
        if (value >= maxLap.time) {
            const block = document.getElementById(`lapBlock${maxLap.position}`);
            if(block){
                block.style.color = "white";
            }
            maxLap.time = value;
            maxLap.position = key;
            document.getElementById(`lapBlock${key}`).style.color = "red";
        }
    }
}