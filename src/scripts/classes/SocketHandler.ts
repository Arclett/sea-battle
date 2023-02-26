import { io, Socket } from "socket.io-client";
import { GameMode, MainStatus, PlacementStatus, WaitingWindowType } from "../types/enums";
import { fieldTile, GetUserData, ShipsData } from "../types/interfaces";
import { Constants } from "./Constants";
import { ShipsCoordinates } from "./field/shipsCoordinates";
import { RenderWaitingWindow } from "./rendering/RenderLoadWindow";
import { RenderMultiGame } from "./rendering/RenderMultiGame";
import { RenderMultiPlayer } from "./rendering/RenderMultiPlayer";
import { Visitor } from "./Visitor";

export class SocketHandler {
    static instance: SocketHandler;

    socket: Socket;

    authToken: string | undefined;

    overlay: HTMLElement;

    userData: GetUserData | undefined;

    currentChat: HTMLElement;

    opponent: string;

    enemyStatus: PlacementStatus;

    currentStatus: MainStatus = MainStatus.other;

    gameMode: GameMode;

    constructor() {
        const overlay = document.querySelector(".login__server-overlay");
        if (!(overlay instanceof HTMLElement)) return;
        this.overlay = overlay;
        console.log(this.currentStatus);
    }

    start() {
        this.authToken = this.getLocalStorage("authToken");
        const userData = this.getLocalStorage("userData");
        if (userData) {
            console.log(userData);
            this.userData = JSON.parse(userData);
        }

        if (this.authToken) {
            this.authorization(this.authToken);
            return this.socket;
        }
    }

    authorization(token: string, userName?: string, password?: string, email?: string) {
        console.log(token);
        this.showOverlay(WaitingWindowType.connect);
        this.socket = io(Constants.serverUrl, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `${token}`,
                        User: `${userName}`,
                        Password: `${password}`,
                        email: `${email}`,
                    },
                },
            },
        });

        this.socket.on("auth token", (token: string, user: GetUserData) => {
            this.hideOverlay();
            this.authToken = token;
            this.userData = user;
            this.saveToLocalStorage();
            console.log(this.userData);
            const text = document.querySelector(".round-button__text");
            if (text instanceof HTMLElement) text.textContent = user.name;
            const container = document.querySelector(".login-popup");
            if (!(container instanceof HTMLElement)) return;
            container.replaceChildren();
        });

        this.socket.on("connect_error", (err: Error) => {
            this.hideOverlay();
            const error = document.querySelector(".login__error");
            if (!(error instanceof HTMLElement)) return;
            error.classList.remove("hidden");
            error.textContent = err.message;
        });

        this.socket.on("chat message", (text: string) => {
            if (this.currentChat) RenderMultiPlayer.renderMessage(this.currentChat, text);
        });

        this.socket.on("start battle", (opponent: string) => {
            this.hideOverlay();
            this.opponent = opponent;
            this.currentStatus = MainStatus.game;
            window.location.href = "#shipsPlacement";
        });

        this.socket.on("update complete", () => {
            this.hideOverlay();
        });

        this.socket.on("placement ready", (shipsData: ShipsData) => {
            Visitor.instance.shipPlacement.enemyStatus = PlacementStatus.ready;
            Visitor.instance.shipPlacement.enemyPlacement = shipsData;
            console.log("your opponent is ready");
        });

        this.socket.on("start game", (turn: string, shipsData?: ShipsData) => {
            this.hideOverlay();

            if (shipsData) Visitor.instance.shipPlacement.enemyPlacement = shipsData;
            console.log("placement complete!!!");
            console.log("enemyShips", Visitor.instance.shipPlacement.enemyPlacement);
            window.location.hash = "#game?mode=multi";
            if (turn === "second") this.showOverlay(WaitingWindowType.turn);
        });

        this.socket.on("my turn", (matrix: fieldTile[], shipsData: ShipsData) => {
            this.hideOverlay();
            Visitor.instance.multiGame.takeTurn(matrix, shipsData);
        });
    }

    sendToChat(text: string) {
        this.socket.emit("send to chat", text);
    }

    getLocalStorage(dataName: string) {
        const data = localStorage.getItem(dataName);
        if (data) return data;
    }

    saveToLocalStorage() {
        if (this.authToken) localStorage.setItem("authToken", this.authToken);
        if (this.userData) localStorage.setItem("userData", JSON.stringify(this.userData));
    }

    randomOpponent() {
        if (!this.userData) return;
        this.showOverlay(WaitingWindowType.opponent);
        this.socket.emit("find random", this.userData.name);
    }

    cancelMathcMaking() {
        this.socket.emit("cancel");
        this.hideOverlay();
    }

    showOverlay(type: WaitingWindowType) {
        RenderWaitingWindow.renderAwaitWindow(this.overlay, type);
        this.overlay.classList.remove("hidden");
    }
    hideOverlay() {
        this.overlay.classList.add("hidden");
        this.overlay.replaceChildren();
    }

    sendLink(link: string) {
        this.showOverlay(WaitingWindowType.opponent);
        this.socket.emit("send link", link);
    }

    guestJoin(id: string) {
        console.log("guest join");
        this.showOverlay(WaitingWindowType.opponent);
        this.socket.emit("join by link", id);
    }

    updateUser(data: GetUserData) {
        this.saveToLocalStorage();
        this.showOverlay(WaitingWindowType.connect);
        this.socket.emit("update user", this.userData);
    }

    logOut() {
        localStorage.clear();
        this.userData = undefined;
        this.authToken = undefined;
        window.location.hash = "";
        location.reload();
    }

    waitingOpponent(shipsData: ShipsData) {
        this.showOverlay(WaitingWindowType.placement);
        this.socket.emit("ship placement complete", this.opponent, shipsData);
    }

    placementReady(shipsData: ShipsData) {
        this.socket.emit("placement over", this.opponent, shipsData);
    }

    enemyTurn(matrix: fieldTile[], shipsData: ShipsData) {
        this.socket.emit("enemy turn", this.opponent, matrix, shipsData);
        this.showOverlay(WaitingWindowType.turn);
    }
}
