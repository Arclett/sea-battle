import { LoginWindow } from "./loginWindow/LoginWindow";
import { SocketHandler } from "./SocketHandler";
import { GUIShipsPlacement } from "./GUI/GUIShipsPlacement";

export class Main {
    loginWindow: LoginWindow;

    socketHandler: SocketHandler;

    start() {
        this.socketHandler = new SocketHandler();
        this.socketHandler.start();
        this.loginWindow = new LoginWindow();
        document.body.addEventListener("click", this.clickHandler.bind(this));
        new GUIShipsPlacement().renderShipsPlacement();
        this.appRouting(location.hash);
    }

    clickHandler(e: Event) {
        //изменяем хеш при клике
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("round-button__link") || e.target.classList.contains("round-button__text")) {
            this.loginWindow.start();
        }
        if (e.target.classList.contains("login__overlay")) location.hash = '';
        if (e.target.classList.contains("login__enter-button")) this.authorization(e.target);
        if (e.target.classList.contains("login__regist-button")) this.loginWindow.switchLoginWindowMode(e.target);

        window.addEventListener('hashchange', () => {
            //если хеш изменился то вызываем роутинг
            this.appRouting(location.hash);
        }, false);
    }

    appRouting(hash: string) {
        switch (hash) {
            case '#page':
                //this.startPage();
                break;
            case '#?game=':

                break;
        
            default:
                
                break;
        }
    }

    authorization(elem: HTMLElement) {
        const elems = this.loginWindow.loginWindowElements;
        const accName = elems.accInput.value;
        const pass = elems.accPass.value;
        const passConfirm = elems.accPassConfirm.value;
        const email = elems.emailInput.value;
        if (elem.classList.contains("login-mode")) {
            if (!accName || !pass) return;
            this.socketHandler.authorization(accName, "login", pass);
        }
        if (elem.classList.contains("reg-mode")) {
            if (!accName || !pass || !passConfirm || !email) return;
            if (pass !== passConfirm) return;
            this.socketHandler.authorization(accName, "reg", pass, email);
        }
    }
}
