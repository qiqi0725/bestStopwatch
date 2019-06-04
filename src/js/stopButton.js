import Button from 'Button';

class StopButton extends Button {
    constructor(name) {
        super(name);
    }

    // Stop the timer
    // Doesn't reset (separate button)
    buttonAction(intervalID) {
        console.log("This is a Stop button.");
        clearInterval(intervalID);
    }

}