import { LoginWindow } from "./loginWindow/LoginWindow";
import { MultiPlayer } from "./multiPlayer/MultiPlayer";
import { RenderMainPage } from "./rendering/RenderMainPage";
import { SinglePlay } from "./singlPlay/SinglePlay";
import { SocketHandler } from "./SocketHandler";

export class Main {
    loginWindow: LoginWindow;

    socketHandler: SocketHandler;

    multiPlayer: MultiPlayer;

    container: HTMLElement;

    start() {
        const overlay = document.querySelector(".login__server-overlay");
        if (!(overlay instanceof HTMLElement)) return;
        const container = document.querySelector(".main__wrapper");
        if (!(container instanceof HTMLElement)) return;
        this.container = container;
        RenderMainPage.renderMainPage(this.container);
        this.socketHandler = new SocketHandler(overlay);
        this.socketHandler.start();
        this.loginWindow = new LoginWindow();
        this.multiPlayer = new MultiPlayer(this.container);
        document.body.addEventListener("click", this.clickHandler.bind(this));
        window.addEventListener("beforeunload", this.socketHandler.saveToLocalStorage.bind(this));
        window.addEventListener(
            "hashchange",
            () => {
                //если хеш изменился то вызываем роутинг
                this.appRouting(location.hash);
            },
            false
        );
    }

    clickHandler(e: Event) {
        //изменяем хеш при клике
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;

        //Login Window events

        if (e.target.classList.contains("round-button__link") || e.target.classList.contains("round-button__text")) {
            this.loginWindow.start();
        }
        if (e.target.classList.contains("login__overlay")) this.loginWindow.closeWindow();
        if (e.target.classList.contains("login__enter-button")) this.authorization(e.target);
        if (e.target.classList.contains("login__regist-button")) this.loginWindow.switchLoginWindowMode(e.target);

        //Multiplayer Page events

        if (e.target.classList.contains("main__multiplayer-button")) this.toMultiPlayerPage();
        if (e.target.classList.contains("chat__button")) this.sendToChat();
    }

    appRouting(hash: string) {
        // для примера, поменять в адресной строке хеш на page и любой другой
        const path = hash.split("?")[0];
        const query = hash.split("&")[1];
        switch (path) {
            case "#multiplayer":
                this.multiPlayerStart(query);
                break;

            default:
                RenderMainPage.renderMainPage(this.container);
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
            this.socketHandler.authorization("login", accName, pass);
        }
        if (elem.classList.contains("reg-mode")) {
            if (!accName || !pass || !passConfirm || !email) return;
            if (pass !== passConfirm) return;
            this.socketHandler.authorization("reg", accName, pass, email);
        }
    }

    toMultiPlayerPage() {
        window.location.href = "#multiplayer";
    }

    multiPlayerStart(query: string | undefined) {
        if (!query) {
            this.multiPlayer.start();
            this.socketHandler.currentChat = this.multiPlayer.elems.chatBody;
        }
    }

    sendToChat() {
        if (this.multiPlayer.elems.chatInput.value) {
            console.log(this.multiPlayer.elems.chatInput.value);
            this.socketHandler.currentChat = this.multiPlayer.elems.chatBody;
            this.socketHandler.sendToChat(this.multiPlayer.elems.chatInput.value);
        }
    }
}
