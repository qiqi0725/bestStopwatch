import Button from 'Button';

class resumeButton extends Button {
    constructor(name) {
        super(name);
    }

    // Resume timer
    // Hide Resume, show Stop
    // Hide Reset, show Lap
    buttonAction() {
        console.log("This is a Resume button.");
        var hide = document.getElementById("resume");
        var show = document.getElementById("stop");
        switchButton(hide, show);
        var hide = document.getElementById("reset");
        var show = document.getElementById("lap");
        switchButton(hide, show);
    }
}