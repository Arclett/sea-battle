import { RenderLoginWindow } from "../rendering/RenderLoginWindow";
import { LoginWindowElements } from "../../types/interfaces";
import { AccInputText, EnterButtonText, RegistrationText } from "../../types/enums";

export class LoginWindow {
    container: HTMLElement;

    loginWindowElements: LoginWindowElements;

    start() {
        const container = document.querySelector(".login-popup");
        if (!(container instanceof HTMLElement)) return;
        this.container = container;
        const data: LoginWindowElements = RenderLoginWindow.renderLogin(this.container);
        if (data) this.loginWindowElements = data;
    }

    closeWindow() {
        if (!this.container) return;
        this.container.replaceChildren();
    }

    switchLoginWindowMode(elem: HTMLElement) {
        if (elem.classList.contains("login-mode")) {
            this.loginWindowElements.accPassConfirm.classList.remove("hidden");
            this.loginWindowElements.emailInput.classList.remove("hidden");
            this.loginWindowElements.accInput.placeholder = AccInputText.regMode;
            this.loginWindowElements.changeMode.textContent = RegistrationText.regMode;
            this.loginWindowElements.enterButton.textContent = EnterButtonText.regMode;
            this.loginWindowElements.enterButton.className = "login__enter-button reg-mode";
            this.loginWindowElements.error.classList.add("hidden");
            this.clearInputs();
            elem.classList.remove("login-mode");
        } else {
            this.loginWindowElements.accPassConfirm.classList.add("hidden");
            this.loginWindowElements.emailInput.classList.add("hidden");
            this.loginWindowElements.accInput.placeholder = AccInputText.logMode;
            this.loginWindowElements.changeMode.textContent = RegistrationText.logMode;
            this.loginWindowElements.enterButton.textContent = EnterButtonText.logMode;
            this.loginWindowElements.enterButton.className = "login__enter-button login-mode";
            this.loginWindowElements.error.classList.add("hidden");
            this.clearInputs();
            elem.classList.add("login-mode");
        }
    }

    clearInputs() {
        this.loginWindowElements.accInput.value = "";
        this.loginWindowElements.accPass.value = "";
        this.loginWindowElements.accPassConfirm.value = "";
        this.loginWindowElements.emailInput.value = "";
    }
}
