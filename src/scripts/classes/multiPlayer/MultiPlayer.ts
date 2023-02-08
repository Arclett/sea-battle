import { MultuPlayerElems } from "../../types/interfaces";
import { RenderMultiPlayer } from "../rendering/RenderMultiPlayer";
import { SocketHandler } from "../SocketHandler";

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
}
