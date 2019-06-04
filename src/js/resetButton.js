import Button from 'Button';

class resetButton extends Button {
    constructor(name) {
        super(name);
    }

    buttonAction() {
        console.log("This is a Reset button.");
        var hide = document.getElementById("restart");
        var show = document.getElementById("lap");
        switchButton(hide, show);
        var hide = document.getElementById("restart");
        var show = document.getElementById("start");
        switchButton(hide, show);
    }
}