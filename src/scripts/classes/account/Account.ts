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
        if (!SocketHandler.instance.userData) return;
        RenderAccount.renderPreview(this.elems.popup, skinName, type, SocketHandler.instance.userData);
    }

    closePreview() {
        this.elems.overlay.classList.add("hidden");
        this.elems.popup.replaceChildren();
    }

    buy(elem: HTMLElement) {
        const price = this.elems.popup.dataset.price;
        const skinName = this.elems.popup.dataset.skin;
        if (!price || !SocketHandler.instance.userData || !skinName) return;
        if (SocketHandler.instance.userData.gold - Number(price) < 0) return;
        SocketHandler.instance.userData.gold -= Number(price);
        if (skinName.split("-")[1] === "skin") {
            SocketHandler.instance.userData.obtShipSkins += `-${skinName.split("-")[0]}`;
        } else {
            SocketHandler.instance.userData.obtFieldSkins += `-${skinName.split("-")[0]}`;
        }
        SocketHandler.instance.updateUser(SocketHandler.instance.userData);
        this.elems = RenderAccount.renderAccount(this.container, SocketHandler.instance.userData);
    }

    select(elem: HTMLElement | HTMLSelectElement) {
        console.log(elem);
        let skinName: string | undefined;
        if (elem instanceof HTMLElement) {
            skinName = this.elems.popup.dataset.skin;
        }
        if (elem instanceof HTMLSelectElement) {
            skinName = elem.value;
        }
        console.log(skinName);
        if (!SocketHandler.instance.userData || !skinName) return;
        if (skinName.split("-")[1] === "skin") {
            SocketHandler.instance.userData.currentShipSkin = skinName.split("-")[0];
        } else {
            SocketHandler.instance.userData.currentFieldSkin = skinName.split("-")[0];
        }
        SocketHandler.instance.updateUser(SocketHandler.instance.userData);
        this.elems = RenderAccount.renderAccount(this.container, SocketHandler.instance.userData);
    }
}
