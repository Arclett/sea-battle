import { io, Socket } from "socket.io-client";
import { Constants } from "./Constants";

export class SocketHandler {
    socket: Socket;

    authToken: string | undefined;

    start() {
        this.authToken = this.getLocalStorage("authToken");
        console.log(this.authToken);
        if (this.authToken) {
            this.authorization(this.authToken);
            return this.socket;
        }
    }

    authorization(token: string, userName?: string, password?: string, email?: string) {
        console.log(token);
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

        this.socket.on("auth token", (token: string, user: string) => {
            this.authToken = token;
            this.saveToLocalStorage();
            console.log("connected");
            console.log(`Hello ${user}`);
            const text = document.querySelector(".round-button__text");
            if (text instanceof HTMLElement) text.textContent = user;
        });

        this.socket.on("connect_error", (err: Error) => {
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
