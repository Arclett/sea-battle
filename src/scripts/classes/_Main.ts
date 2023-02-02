import { LoginWindow } from "./loginWindow/_LoginWindow";

export class Main {
    start() {
        document.body.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event) {
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("round-button__link")) {
            const loginWindow = new LoginWindow(document.body);
            loginWindow.start();
        }
    }
}
