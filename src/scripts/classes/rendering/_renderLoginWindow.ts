export class RenderLoginWindow {
    static render(container: HTMLElement) {
        const overlay = document.createElement("div");
        overlay.className = "login-overlay";

        const loginWrapper = document.createElement("div");
        loginWrapper.className = "login-wrapper";

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
    }
}
