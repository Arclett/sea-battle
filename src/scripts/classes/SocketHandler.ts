import { io, Socket } from "socket.io-client";
import { WaitingWindowType } from "../types/enums";
import { GetUserData } from "../types/interfaces";
import { Constants } from "./Constants";
import { RenderWaitingWindow } from "./rendering/RenderLoadWindow";
import { RenderMultiPlayer } from "./rendering/RenderMultiPlayer";

export class SocketHandler {
    static instance: SocketHandler;

    socket: Socket;

    authToken: string | undefined;

    overlay: HTMLElement;

    userData: GetUserData | undefined;

    currentChat: HTMLElement;

    opponent: string;

    constructor() {
        const overlay = document.querySelector(".login__server-overlay");
        if (!(overlay instanceof HTMLElement)) return;
        this.overlay = overlay;
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
            window.location.href = "#play-field";
        });

        this.socket.on("update complete", () => {
            this.hideOverlay();
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
}
