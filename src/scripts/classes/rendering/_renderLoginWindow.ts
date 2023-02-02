export class RenderLoginWindow {
    static render(container: HTMLElement) {
        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const loginWrapper = document.createElement("div");
        loginWrapper.className = "overlay";

        const loginTitle = document.createElement("h2");
        loginTitle.textContent = "Log or Sign in";

        const loginButton = document.createElement("button");
        loginButton.textContent = "Login";

        const signButton = document.createElement("button");
        signButton.textContent = "Sign";
    }
}
