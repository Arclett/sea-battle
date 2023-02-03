import { LoginWindow } from "./loginWindow/LoginWindow";

export class Main {
    loginWindow: LoginWindow;

    start() {
        this.loginWindow = new LoginWindow();
        document.body.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event) {
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("round-button__link") || e.target.classList.contains("round-button__text")) {
            this.loginWindow.start();
        }
        if (e.target.classList.contains("login__overlay")) {
            this.loginWindow.closeWindow();
        }
    }
}
