class ButtonManager {
    constructor() {
        this.timeContent = document.getElementById('time');
        this.lapContent = document.getElementById('laps');
        this.startButton = document.getElementById('start');
        this.endButton = document.getElementById('end');
        this.resetButton = document.getElementById('reset');
        this.stopButton = document.getElementById('stop');
        this.lapButton = document.getElementById('lap');
        this.time = 0.0;
        this.timer = null;
        this.lapTimer = null;
        this.lapCounter = 1;
        this.secondClick = false;
    }

    pad(num){
        return num > 10 ? num : '0' + num;
    }

    hide(button){
        button.style.display = 'none';
    }

    show(button){
        button.style.display = 'block';
    }
    
    startTime() {
        let seconds = 0.0;
        let minutes = 0.0;
        let hours = 0.0;

        this.hide(this.startButton);
        this.show(this.stopButton);
        this.show(this.lapButton);

        this.timer = window.setInterval(() => {
            this.time += 0.01;
            seconds += 0.01;
            if (seconds >= 60.0) {
                minutes++;
                seconds = 0.0;
            }
            if (minutes >= 60.0) {
                hours++;
                minutes = 0.0;
            }
            this.timeContent.innerHTML = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds.toFixed(2))}`;
        }, 1);
    }

    stopTime() {
        window.clearInterval(this.timer);
    }

    resetTime() {
        this.time = 0.0;
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