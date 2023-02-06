import { MultuPlayerElems } from "../../types/interfaces";
import { RenderMultiPlayer } from "../rendering/RenderMultiPlayer";

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

    send() {}
}
