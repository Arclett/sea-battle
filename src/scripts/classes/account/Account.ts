import { AccountElems } from "../../types/interfaces";
import { RenderAccount } from "../rendering/RenderAccount";
import { SocketHandler } from "../SocketHandler";

export class Account {
    container: HTMLElement;

    elems: AccountElems;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    start() {
        console.log(SocketHandler.instance.userData);
        if (!SocketHandler.instance.userData) return;
        this.elems = RenderAccount.renderAccount(this.container, SocketHandler.instance.userData);
    }

    openPreview(elem: HTMLElement) {
        const skinName = [...elem.classList][1];
        const type = [...elem.classList][0].includes("skin") ? "skin" : "field";
        this.elems.overlay.classList.remove("hidden");
        RenderAccount.renderPreview(this.elems.popup, skinName, type);
    }

    closePreview() {
        this.elems.overlay.classList.add("hidden");
        this.elems.popup.replaceChildren();
    }
}
