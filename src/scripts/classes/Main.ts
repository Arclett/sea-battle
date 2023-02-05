import { LoginWindow } from "./loginWindow/LoginWindow";
import { SinglePlay } from "./singlPlay/SinglePlay";
import { SocketHandler } from "./SocketHandler";

export class Main {
    loginWindow: LoginWindow;

    socketHandler: SocketHandler;

    start() {
        const overlay = document.querySelector(".login__server-overlay");
        if (!(overlay instanceof HTMLElement)) return;
        this.socketHandler = new SocketHandler(overlay);
        this.socketHandler.start();
        this.loginWindow = new LoginWindow();
        document.body.addEventListener("click", this.clickHandler.bind(this));
        window.addEventListener("beforeunload", this.socketHandler.saveToLocalStorage.bind(this));
    }

    clickHandler(e: Event) {
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;

        //Login Window events

        if (e.target.classList.contains("round-button__link") || e.target.classList.contains("round-button__text")) {
            this.loginWindow.start();
        }
        if (e.target.classList.contains("login__overlay")) this.loginWindow.closeWindow();
        if (e.target.classList.contains("login__enter-button")) this.authorization(e.target);
        if (e.target.classList.contains("login__regist-button")) this.loginWindow.switchLoginWindowMode(e.target);

        //PlayFiled events
    }

    authorization(elem: HTMLElement) {
        const elems = this.loginWindow.loginWindowElements;
        const accName = elems.accInput.value;
        const pass = elems.accPass.value;
        const passConfirm = elems.accPassConfirm.value;
        const email = elems.emailInput.value;
        if (elem.classList.contains("login-mode")) {
            if (!accName || !pass) return;
            this.socketHandler.authorization("login", accName, pass);
        }
        if (elem.classList.contains("reg-mode")) {
            if (!accName || !pass || !passConfirm || !email) return;
            if (pass !== passConfirm) return;
            this.socketHandler.authorization("reg", accName, pass, email);
        }
    }
}
