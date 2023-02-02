import { RenderLoginWindow } from "../rendering/RenderLoginWindow";

export class LoginWindow {
    container: HTMLElement;

    start() {
        const container = document.querySelector(".login-popup");
        if (!(container instanceof HTMLElement)) return;
        this.container = container;
        RenderLoginWindow.render(this.container);
    }
    closeWindow() {
        if (!this.container) return;
        this.container.replaceChildren();
    }
}
