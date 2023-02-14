import { LoginWindow } from "./loginWindow/LoginWindow";
import { MultiPlayer } from "./multiPlayer/MultiPlayer";
import { PlayField } from "./PlayField/PlayField";
import { RenderMainPage } from "./rendering/RenderMainPage";
import { SocketHandler } from "./SocketHandler";
import { GUIShipsPlacement } from "./GUI/GUIShipsPlacement";
import { GUIStartPage } from "./GUI/GUIStartPage";

export class Main {
    loginWindow: LoginWindow;

    socketHandler: SocketHandler;

    multiPlayer: MultiPlayer;

    playField: PlayField;

    container: HTMLElement;

    start() {
        const overlay = document.querySelector(".login__server-overlay");
        if (!(overlay instanceof HTMLElement)) return;
        const container = document.querySelector(".main__wrapper");
        if (!(container instanceof HTMLElement)) return;
        this.container = container;
        RenderMainPage.renderMainPage(this.container);
        SocketHandler.instance.start();
        this.loginWindow = new LoginWindow();
        this.multiPlayer = new MultiPlayer(this.container);
        this.playField = new PlayField(this.container);
        document.body.addEventListener("click", this.clickHandler.bind(this));
        new GUIStartPage().renderStartPag();
        window.addEventListener("beforeunload", SocketHandler.instance.saveToLocalStorage.bind(this));
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
        if (e.target.classList.contains("login__overlay")) location.hash = '';
        if (e.target.classList.contains("login__enter-button")) this.authorization(e.target);
        if (e.target.classList.contains("login__regist-button")) this.loginWindow.switchLoginWindowMode(e.target);


        //Multiplayer Page events

        if (e.target.classList.contains("main__multiplayer-button")) this.toMultiPlayerPage();
        if (e.target.classList.contains("chat__button")) this.multiPlayer.send();
        if (e.target.classList.contains("random-opponent-button")) this.multiPlayer.randomOpponent();
        if (e.target.classList.contains("loading-window__button")) SocketHandler.instance.cancelMathcMaking();
        if (e.target.classList.contains("create-link__create")) this.multiPlayer.createLink();
        if (e.target.classList.contains("create-link__copy")) this.multiPlayer.copyLink();
    }

    appRouting(hash: string) {
        // для примера, поменять в адресной строке хеш на page и любой другой
        const path = hash.split("?")[0];
        const query = hash.split("?")[1];
        switch (path) {
            case "#multiplayer":
                this.multiPlayerStart(query);
                break;

            case "#play-field":
                this.playField.start();
                break;
            case '#shipsPlacement':
                new GUIShipsPlacement().renderShipsPlacement();
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
            SocketHandler.instance.authorization("login", accName, pass);
        }
        if (elem.classList.contains("reg-mode")) {
            if (!accName || !pass || !passConfirm || !email) return;
            if (pass !== passConfirm) return;
            SocketHandler.instance.authorization("reg", accName, pass, email);
        }
    }

    toMultiPlayerPage() {
        window.location.href = "#multiplayer";
    }

    multiPlayerStart(query: string | undefined) {
        if (!query) {
            this.multiPlayer.start();
            SocketHandler.instance.currentChat = this.multiPlayer.elems.chatBody;
        } else {
            console.log("query!");
            SocketHandler.instance.authorization("guest");
            SocketHandler.instance.guestJoin(query.split("=")[1]);
        }
    }
}
