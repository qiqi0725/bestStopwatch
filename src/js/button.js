class Button {

    constructor(name) {
        this.name = name;
    }

    buttonAction() {
        console.log("This is a button.");
    }

    switchButton(hide, show) {
        hide.style.display = "none";
        show.style.display = "block";
    }
}