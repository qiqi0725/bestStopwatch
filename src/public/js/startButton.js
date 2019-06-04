import Button from 'Button';

class StartButton extends Button {
    constructor(name) {
        super(name);
    }

    // Start timer
    // Hide Start, show Stop
    buttonAction(intervalID) {
        console.log("This is a Start button.");
        var hide = document.getElementById("start");
        var show = document.getElementById("stop");
        switchButton(hide, show);
    }

}