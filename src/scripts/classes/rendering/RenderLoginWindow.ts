import { Element } from "../element/element";

export class RenderLoginWindow {
    static render(container: HTMLElement) {
        container.replaceChildren();

        const overlay = Element.createElement({ tag: "div", classNote: "login__overlay" });

        const loginWrapper = Element.createElement({ tag: "div", classNote: "login__wrapper" });

        const loginTitle = Element.createElement({ tag: "h2", content: "Please Log In Your Accaunt" });

        const accInput = Element.createInput({
            type: "text",
            content: "name or e-mail",
            classNote: "login__accaunt-input",
        });

        const accPass = Element.createInput({ type: "password", classNote: "login__pass-input", content: "password" });

        const enterButton = Element.createElement({
            tag: "button",
            classNote: "login__enter-button",
            content: "Enter",
        });

        const regButton = Element.createElement({
            tag: "button",
            classNote: "login__regist-button",
            content: "Create new account",
        });

        loginWrapper.append(loginTitle, accInput, accPass, enterButton, regButton);
        container.append(loginWrapper, overlay);
    }
}
