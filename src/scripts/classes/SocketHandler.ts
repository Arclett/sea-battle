import { io, Socket } from "socket.io-client";
import { GetUserData } from "../types/interfaces";
import { Constants } from "./Constants";

export class SocketHandler {
    socket: Socket;

    authToken: string | undefined;

    overlay: HTMLElement;

    userData: GetUserData | undefined;

    constructor(overlay: HTMLElement) {
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
        this.overlay.classList.remove("hidden");
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
            this.overlay.classList.add("hidden");
            this.authToken = token;
            this.saveToLocalStorage();
            console.log("connected");
            console.log(`Hello ${user.userName}`);
            this.userData = user;
            const text = document.querySelector(".round-button__text");
            if (text instanceof HTMLElement) text.textContent = user.userName;
        });

        this.socket.on("connect_error", (err: Error) => {
            this.overlay.classList.add("hidden");
            console.log(err.message);
        });
    }

    socketListners(socket: Socket) {
        socket.on("hello", () => {
            console.log("connected");
        });
    }

    getLocalStorage(dataName: string) {
        const data = localStorage.getItem(dataName);
        if (data) return data;
    }

    saveToLocalStorage() {
        if (this.authToken) localStorage.setItem("authToken", this.authToken);
    }
}
