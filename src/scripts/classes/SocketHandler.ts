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

    constructor() {
        const overlay = document.querySelector(".login__server-overlay");
        if (!(overlay instanceof HTMLElement)) return;
        this.overlay = overlay;
    }

    start() {
        this.authToken = this.getLocalStorage("authToken");
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
            this.saveToLocalStorage();
            console.log("connected");
            console.log(`Hello ${user.userName}`);
            this.userData = user;
            const text = document.querySelector(".round-button__text");
            if (text instanceof HTMLElement) text.textContent = user.userName;
        });

        this.socket.on("connect_error", (err: Error) => {
            this.hideOverlay();
            console.log(err.message);
        });

        this.socket.on("chat message", (text: string) => {
            if (this.currentChat) RenderMultiPlayer.renderMessage(this.currentChat, text);
        });

        this.socket.on("start battle", (opponent: string) => {
            this.hideOverlay();
            console.log(`user with id: ${this.socket.id}(me) starting battle with opponent id: ${opponent}`);
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
    }

    randomOpponent() {
        if (!this.userData) return;
        this.showOverlay(WaitingWindowType.opponent);
        this.socket.emit("find random", this.userData.userName);
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
}
