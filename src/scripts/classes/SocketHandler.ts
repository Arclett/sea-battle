import { io, Socket } from "socket.io-client";
import { Constants } from "./Constants";

export class SocketHandler {
    userName: string | undefined;

    socket: Socket;

    authToken: string | undefined;

    start() {
        this.userName = this.getLocalStorage("userName");
        this.authToken = this.getLocalStorage("authToken");
        if (this.userName && this.authToken) {
            this.authorization(this.userName, this.authToken);
            window.addEventListener("beforeunload", this.saveToLocalStorage.bind(this));
            return this.socket;
        }
    }

    authorization(userName: string, token: string, password?: string, email?: string) {
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

        this.socket.on("auth token", (data: string, user: {}) => {
            this.authToken = data;
            console.log("connected");
            console.log(data);
            console.log(user);
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
        if (this.userName) localStorage.setItem("userName", this.userName);
        if (this.authToken) localStorage.setItem("authToken", this.authToken);
    }
}
