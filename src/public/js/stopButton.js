import Button from 'Button';

class StopButton extends Button {
    constructor(name) {
        super(name);
    }

    // Stop the timer
    // Doesn't reset (separate button)
    // Hide Lap, show Resume
    buttonAction(intervalID) {
        console.log("This is a Stop button.");
        clearInterval(intervalID);
        var hide = document.getElementById("lap");
        var show = document.getElementById("resume");
        switchButton(hide, show);
    }

}