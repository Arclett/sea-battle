import { MultuPlayerElems } from "../../types/interfaces";
import { RenderMultiPlayer } from "../rendering/RenderMultiPlayer";
import { SocketHandler } from "../SocketHandler";
import { Utilities } from "../Utilities";

export class MultiPlayer {
    container: HTMLElement;

    elems: MultuPlayerElems;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    start() {
        this.container.replaceChildren();
        this.elems = RenderMultiPlayer.renderMatchMaking(this.container);
    }

    send() {
        if (this.elems.chatInput.value) {
            console.log(this.elems.chatInput.value);
            SocketHandler.instance.currentChat = this.elems.chatBody;
            SocketHandler.instance.sendToChat(this.elems.chatInput.value);
        }
    }

    randomOpponent() {
        SocketHandler.instance.randomOpponent();
    }

    createLink() {
        const userId = SocketHandler.instance.socket.id;
        const base = "http://localhost:8080";
        const link = `${base}/#multiplayer?room=${userId}`;
        this.elems.linkBody.textContent = link;
        // SocketHandler.instance.sendLink(userId);
    }

    async copyLink() {
        if (this.elems.linkBody.textContent) {
            await window.navigator.clipboard.writeText(this.elems.linkBody.textContent);
        }
    }
}
