import { Element } from "../element/element";

export class RenderLoginWindow {
    static renderLogin(container: HTMLElement) {
        container.replaceChildren();

        const overlay = Element.createElement({ tag: "div", classNote: "login__overlay" });

        const loginWrapper = Element.createElement({ tag: "div", classNote: "login__wrapper" });

        const loginTitle = Element.createElement({ tag: "h2", content: "Please Log In Your Accaunt" });

        const loginError = Element.createElement({tag:"div", classNote:"login__error hidden"})

        const accInput = Element.createInput({
            type: "text",
            content: "name or e-mail",
            classNote: "login__accaunt-input",
        });

        const emailInput = Element.createInput({
            type: "email",
            content: "email",
            classNote: "login__email-input hidden",
        });

        const accPass = Element.createInput({ type: "password", classNote: "login__pass-input", content: "password" });

        const accPassConfirm = Element.createInput({
            type: "password",
            classNote: "login__pass-confirm hidden",
            content: "confirm password",
        });

        const enterButton = Element.createElement({
            tag: "button",
            classNote: "login__enter-button login-mode",
            content: "Enter",
        });

        const changeMode = Element.createElement({
            tag: "div",
            classNote: "login__regist-button login-mode",
            content: "or create new account",
        });

        loginWrapper.append(loginTitle, loginError, accInput, emailInput, accPass, accPassConfirm, enterButton, changeMode);
        container.append(loginWrapper, overlay);

        return {
            error: loginError,
            accInput: accInput,
            accPass: accPass,
            emailInput: emailInput,
            accPassConfirm: accPassConfirm,
            changeMode: changeMode,
            enterButton: enterButton,
        };
    }
}
