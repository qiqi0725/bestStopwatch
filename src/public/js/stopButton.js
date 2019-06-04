import Button from 'Button';

class StopButton extends Button {
    constructor(name) {
        super(name);
    }

    // Stop the timer
    // Hide Stop, show Resume
    // Hide Lap, show Reset
    buttonAction(intervalID) {
        console.log("This is a Stop button.");
        clearInterval(intervalID);
        var hide = document.getElementById("stop");
        var show = document.getElementById("resume");
        switchButton(hide, show);
        var hide = document.getElementById("lap");
        var show = document.getElementById("reset");
        switchButton(hide, show);
    }

}