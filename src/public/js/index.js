class ButtonManager {
    constructor() {
        this.timeContent = document.getElementById('time');
        this.lapContent = document.getElementById('laps');
        this.startButton = document.getElementById('start');
        this.resumeButton = document.getElementById('resume');
        this.resetButton = document.getElementById('reset');
        this.stopButton = document.getElementById('stop');
        this.lapButton = document.getElementById('lap');
        this.time = 0.0;
        this.timer = null;
        this.lapTimer = null;
        this.lapCounter = 1;
        this.secondClick = false;
        this.seconds = 0.0;
        this.minutes = 0.0;
        this.hours = 0.0;
    }

    pad(num) {
        return num > 10 ? num : '0' + num;
    }

    hide(button) {
        button.style.display = 'none';
    }

    show(button) {
        button.style.display = 'block';
    }

    startTime() {
        // let seconds = 0.0;
        // let minutes = 0.0;
        // let hours = 0.0;

        this.hide(this.startButton);
        this.show(this.stopButton);
        this.show(this.lapButton);
        this.lapButton.disabled = false;

        this.timer = window.setInterval(() => {
            this.time += 0.01;
            this.seconds += 0.01;
            if (this.seconds >= 60.0) {
                this.minutes++;
                this.seconds = 0.0;
            }
            if (this.minutes >= 60.0) {
                this.hours++;
                this.minutes = 0.0;
            }
            this.timeContent.innerHTML = `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds.toFixed(2))}`;
        }, 1);
    }

    resumeTime() {
        this.hide(this.resumeButton);
        this.hide(this.resetButton);

        this.startTime();

    }

    stopTime() {
        window.clearInterval(this.timer);

        this.hide(this.stopButton);
        this.show(this.resetButton);
        this.hide(this.lapButton);
        this.show(this.resumeButton);
    }

    resetTime() {
        this.time = 0.0;
        this.seconds = 0.0;
        this.minutes = 0.0;
        this.hours = 0.0;

        this.hide(this.resetButton);
        this.show(this.lapButton);
        this.hide(this.resumeButton);
        this.show(this.startButton);

        this.timeContent.innerHTML = '00:00.00';

    }

    lapTime() {
        const beginTime = this.time;
        let endTime = 0.0;
        this.lapTimer = window.setInterval(() => endTime += 0.001, 1);

        if (this.secondClick) {
            window.clearInterval(this.lapTimer);
            const lapTime = endTime - beginTime;

            this.lapContent.innerHtml = `<div id=lap${this.lapCounter}>
            <span>Lap ${lapCounter}</span> 
            <span>${lapTime}</span> 
            </div>`
        }

        this.lapCounter = this.lapCounter++;
        this.secondClick = true;
    }
}

const manager = new ButtonManager();