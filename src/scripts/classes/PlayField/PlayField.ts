import { RenderPlayField } from "../rendering/RenderPlayField";
import { SocketHandler } from "../SocketHandler";

export class PlayField {
    container: HTMLElement;
    constructor(containder: HTMLElement) {
        this.container = containder;
    }
    start() {
        RenderPlayField.renderPlayFieldBase(this.container);
        console.log(`battle with ${SocketHandler.instance.opponent}`);
    }
}
