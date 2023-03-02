import { MultuPlayerElems } from "../../types/interfaces";
import { Constants } from "../Constants";
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
            SocketHandler.instance.currentChat = this.elems.chatBody;
            SocketHandler.instance.sendToChat(this.elems.chatInput.value);
            this.elems.chatInput.value = "";
        }
    }

    randomOpponent() {
        SocketHandler.instance.randomOpponent();
    }

    createLink() {
        const userId = SocketHandler.instance.socket.id;
        const link = `${Constants.clientUrl}/#multiplayer?room=${userId}`;
        this.elems.linkBody.textContent = link;
    }

    async copyLink() {
        if (this.elems.linkBody.textContent) {
            await window.navigator.clipboard.writeText(this.elems.linkBody.textContent);
        }
    }
}
