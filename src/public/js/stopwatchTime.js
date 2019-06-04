class StopwatchTime{
    constructor(){
        this.time = 0.0;
    }

    startTime(){
        timer = window.setInterval(()=> this.time += 0.001, 1);
    }

    stopTime(){
        window.clearInterval(timer);
    }

    resetTime(){
        this.time = 0.0;
    }

    lapTime(){
        beginTime = this.time;
        endTime = 0.0;
        lapTimer = window.setInterval(()=> endTime += 0.001, 1);
    }
}