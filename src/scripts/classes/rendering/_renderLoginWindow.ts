export class RenderLoginWindow {
    static render(container: HTMLElement) {
        container.replaceChildren();

        const overlay = document.createElement("div");
        overlay.className = "login-overlay";

        const loginTitle = document.createElement("h2");
        loginTitle.textContent = "Login";

        const accInput = document.createElement("input");
        accInput.type = "text";
        accInput.placeholder = "Nick or e-mail";
        accInput.className = "account-name-input";

        const accPass = document.createElement("input");
        accPass.type = "password";
        accPass.placeholder = "password";
        accPass.className = "account-pass-input";

        const enterButton = document.createElement("button");
        enterButton.textContent = "Enter";
        enterButton.className = "login-enter-button";

        const regButton = document.createElement("button");
        regButton.textContent = "Registration";
        regButton.className = "reg-button";

        container.append(loginTitle, accInput, accPass, enterButton, regButton, overlay);
    }
}
