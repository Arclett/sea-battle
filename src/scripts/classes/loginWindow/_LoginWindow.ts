import { RenderLoginWindow } from "../rendering/_renderLoginWindow";

export class LoginWindow {
    start() {
        const container = document.querySelector(".login-popup");
        if (!(container instanceof HTMLElement)) return;
        RenderLoginWindow.render(container);
    }
}
