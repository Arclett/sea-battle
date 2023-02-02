import { RenderLoginWindow } from "../rendering/_renderLoginWindow";

export class LoginWindow {
    container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    start() {
        RenderLoginWindow.render(this.container);
    }
}
