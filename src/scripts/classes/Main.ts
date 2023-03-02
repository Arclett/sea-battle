import { Account } from "./account/Account";
import { LoginWindow } from "./loginWindow/LoginWindow";
import { MultiPlayer } from "./multiPlayer/MultiPlayer";
import { SocketHandler } from "./SocketHandler";
import { GUIShipsPlacement } from "./GUI/GUIShipsPlacement";
import { GUIStartPage } from "./GUI/GUIStartPage";
import { GUISingleGamePage } from "./GUI/GUISingleGamePage";
import { GameMode, MainStatus, PlacementStatus } from "../types/enums";
import { Visitor } from "./Visitor";
import { ShipsData } from "../types/interfaces";
import { MultiGame } from "./multigame.ts/MultiGame";

export class Main {
    loginWindow: LoginWindow;

    socketHandler: SocketHandler;

    multiPlayer: MultiPlayer;

    account: Account;

    container: HTMLElement;

    startPage: GUIStartPage;

    shipPlacement: GUIShipsPlacement;

    game: GUISingleGamePage;

    multiGame: MultiGame;

    start() {
        const overlay = document.querySelector(".login__server-overlay");
        if (!(overlay instanceof HTMLElement)) return;
        const container = document.querySelector(".main__wrapper");
        if (!(container instanceof HTMLElement)) return;
        this.container = container;
        this.startPage = new GUIStartPage();
        this.startPage.renderStartPag();
        SocketHandler.instance.start();
        this.loginWindow = new LoginWindow();
        this.multiPlayer = new MultiPlayer(this.container);
        this.account = new Account(this.container);
        this.shipPlacement = new GUIShipsPlacement();
        Visitor.instance.shipPlacement = this.shipPlacement;
        document.body.addEventListener("click", this.clickHandler.bind(this));
        document.body.addEventListener("keyup", this.keyHandler.bind(this));
        window.addEventListener("beforeunload", SocketHandler.instance.saveToLocalStorage.bind(this));
        window.addEventListener("hashchange", this.hashChange.bind(this));
        window.addEventListener("input", this.selectHandler.bind(this));
        window.onbeforeunload = function (e) {
            e.preventDefault();
            if (
                (location.hash === "#shipsPlacement" || location.hash === "#game") &&
                SocketHandler.instance.currentStatus === MainStatus.game
            ) {
                return "Are you shure you want to leave game?";
            }
        };
    }

    clickHandler(e: Event) {
        //изменяем хеш при клике
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;

        if (e.target.classList.contains("main-title")) this.toMainPage();

        //Login Window events

        if (e.target.classList.contains("round-button__link") || e.target.classList.contains("round-button__text")) {
            if (SocketHandler.instance.userData) {
                window.location.href = "#account";
            } else {
                this.loginWindow.start();
            }
        }
        if (e.target.classList.contains("login__overlay")) this.loginWindow.closeWindow();
        if (e.target.classList.contains("login__enter-button")) this.authorization(e.target);
        if (e.target.classList.contains("login__regist-button")) this.loginWindow.switchLoginWindowMode(e.target);

        //Multiplayer Page events

        if (e.target.classList.contains("main__multiplayer-button")) this.toMultiPlayerPage();
        if (e.target.classList.contains("chat__button")) this.multiPlayer.send();
        if (e.target.classList.contains("random-opponent-button")) this.multiPlayer.randomOpponent();
        if (e.target.classList.contains("loading-window__button")) SocketHandler.instance.cancelMathcMaking();
        if (e.target.classList.contains("create-link__create")) this.multiPlayer.createLink();
        if (e.target.classList.contains("create-link__copy")) this.multiPlayer.copyLink();

        //account events

        if (e.target.classList.contains("gallery__skin-icon") || e.target.classList.contains("gallery__field-icon"))
            this.account.openPreview(e.target);
        if (
            e.target.classList.contains("skins-preview__close-button") ||
            e.target.classList.contains("preview-overlay")
        ) {
            this.account.closePreview();
        }
        if (e.target.classList.contains("skins-preview__set-button")) {
            if (e.target.classList.contains("buy")) this.account.buy(e.target);
            if (e.target.classList.contains("select")) this.account.select(e.target);
        }
        if (e.target.classList.contains("status__logout")) SocketHandler.instance.logOut();
        if (e.target.classList.contains("filters")) this.account.setFilter(e.target);

        // if (e.target.classList.contains("startField")) {
        //     SocketHandler.instance.gameMode = GameMode.single;
        //     this.toSetShipPage();
        // }

        //ship placement

        if (e.target.classList.contains("start-game__button")) {
            if (this.shipPlacement.checkCoords()) this.startGame();
        }

        //game

        if (e.target.classList.contains("enemyField")) {
            this.gameClick(e.target);
        }

        if (e.target.classList.contains("battle__confirm-button")) {
            SocketHandler.instance.currentStatus = MainStatus.other;
            this.toMainPage();
        }
    }

    keyHandler(e: KeyboardEvent) {
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;

        if (e.target.classList.contains("chat__input")) if (e.key === "Enter") this.multiPlayer.send();
    }

    selectHandler(e: Event) {
        if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement)) return;
        if (e.target.classList.contains("status__ship-select") || e.target.classList.contains("status__field-select"))
            this.account.select(e.target);
    }

    hashChange() {
        // if (SocketHandler.instance.socket) {
        //     this.appRouting(location.hash);
        // } else {
        //     this.appRouting(" ");
        // }
        this.appRouting(location.hash);
    }

    appRouting(hash: string) {
        // для примера, поменять в адресной строке хеш на page и любой другой
        const path = hash.split("?")[0];
        const query = hash.split("?")[1];
        switch (path) {
            case "#multiplayer":
                this.multiPlayerStart(query);
                break;
            case "#shipsPlacement":
                this.toSetShipPage();
                break;
            case "#account":
                this.account.start();
                break;
            case "#game":
                this.beginBattle(query);
                break;

            default:
                this.startPage.renderStartPag();
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

    toMainPage() {
        window.location.href = "";
    }

    toSetShipPage() {
        if (SocketHandler.instance.currentStatus === MainStatus.other) {
            this.toMainPage();
            return;
        }
        const fieldSkin = SocketHandler.instance.userData?.currentFieldSkin
            ? SocketHandler.instance.userData?.currentFieldSkin
            : "default";

        this.shipPlacement.renderShipsPlacement(fieldSkin);
    }

    startGame() {
        if (SocketHandler.instance.currentStatus === MainStatus.other) {
            this.toMainPage();
            return;
        }
        const mode = SocketHandler.instance.opponent ? GameMode.multi : GameMode.single;
        if (mode === GameMode.single) {
            window.location.hash = "#game?mode=single";
        }
        if (mode === GameMode.multi) {
            const shipsData: ShipsData =
                Visitor.instance.shipPlacement.ShipCoordinatesWithBackground.getShipsCoordinatesWithBackground();
            if (this.shipPlacement.enemyStatus === PlacementStatus.ready) {
                SocketHandler.instance.placementReady(shipsData);
            } else {
                SocketHandler.instance.waitingOpponent(shipsData);
            }
        }
    }

    beginBattle(query: string) {
        if (SocketHandler.instance.currentStatus === MainStatus.other) {
            this.toMainPage();
            return;
        }
        const fieldSkin = SocketHandler.instance.userData?.currentFieldSkin
            ? SocketHandler.instance.userData?.currentFieldSkin
            : "default";
        const mode = query.split("=")[1];

        if (mode === "single") {
            SocketHandler.instance.gameMode = GameMode.single;
            this.game = new GUISingleGamePage();
            Visitor.instance.game = this.game;
            this.game.renderSingleGamePage(fieldSkin, GameMode.single);
        } else {
            SocketHandler.instance.gameMode = GameMode.multi;
            const ourShips: ShipsData =
                this.shipPlacement.ShipCoordinatesWithBackground.getShipsCoordinatesWithBackground();
            const enemyShips: ShipsData = this.shipPlacement.enemyPlacement;
            this.multiGame = new MultiGame(ourShips, enemyShips, this.container);
            Visitor.instance.multiGame = this.multiGame;
            this.multiGame.start();
        }
    }

    multiPlayerStart(query: string | undefined) {
        if (!query) {
            if (!SocketHandler.instance.socket) {
                this.toMainPage();
            }
            this.multiPlayer.start();
            SocketHandler.instance.currentChat = this.multiPlayer.elems.chatBody;
        } else {
            if (!SocketHandler.instance.authToken) {
                SocketHandler.instance.authorization("guest");
                SocketHandler.instance.guestJoin(query.split("=")[1]);
            } else {
                SocketHandler.instance.authorization(SocketHandler.instance.authToken);
                SocketHandler.instance.guestJoin(query.split("=")[1]);
            }
        }
    }

    gameClick(elem: HTMLElement) {
        if (SocketHandler.instance.gameMode === GameMode.single) {
            this.game.fieldClick(elem);
        } else {
            this.multiGame.fieldClick(elem);
        }
    }
}
