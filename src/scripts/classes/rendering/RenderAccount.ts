import { GetUserData } from "../../types/interfaces";
import { Element } from "../element/element";

export class RenderAccount {
    static renderAccount(container: HTMLElement, data: GetUserData) {
        container.replaceChildren();

        const title = Element.createElement({ tag: "h1", content: "Account", classNote: "account__title" });

        const accInfoWrapper = Element.createElement({ tag: "nav", classNote: "account__info" });
        RenderAccount.renderAccInfo(accInfoWrapper, data);

        const galleryWrapper = Element.createElement({ tag: "div", classNote: "account__gallery" });

        RenderAccount.renderGallery(galleryWrapper, data);

        const overlay = Element.createElement({ tag: "div", classNote: "preview-overlay hidden" });
        const popup = Element.createElement({ tag: "div", classNote: "preview-popup" });

        container.append(title, accInfoWrapper, galleryWrapper, overlay, popup);

        return { overlay, popup };
    }

    static renderAccInfo(container: HTMLElement, data: GetUserData) {
        const accName = Element.createElement({
            tag: "div",
            classNote: "account__account-name",
            content: data.userName,
        });
        const accGold = Element.createElement({
            tag: "div",
            classNote: "account__account-gold",
            content: `Gold: ${data.userGold}`,
        });

        const accXp = Element.createElement({
            tag: "div",
            classNote: "account__account-xp",
            content: `XP: ${data.userXp}`,
        });

        const accWinsPvP = Element.createElement({
            tag: "div",
            classNote: "account__account-wins-pvp",
            content: `Wins in PvP: ${data.winsPvP}`,
        });

        const accWinsPvE = Element.createElement({
            tag: "div",
            classNote: "account__account-wins-pve",
            content: `Wins in PvE: ${data.winsPvE}`,
        });

        container.append(accName, accGold, accXp, accWinsPvE, accWinsPvP);
    }

    static renderGallery(container: HTMLElement, data: GetUserData) {
        const controlPanel = Element.createElement({ tag: "div", classNote: "gallery-wrapper__filters" });

        const open = Element.createElement({ tag: "div", classNote: "filters__obtained-skins", content: "My Skins" });

        const locked = Element.createElement({
            tag: "div",
            classNote: "filters__locked-skins",
            content: "Locked Skins",
        });

        const shipSkins = Element.createElement({ tag: "div", classNote: "filters__ship-skins", content: " Ships" });

        const field = Element.createElement({ tag: "div", classNote: "filters__fields", content: "Fields" });

        controlPanel.append(open, locked, shipSkins, field);

        const galBody = Element.createElement({ tag: "div", classNote: "gallery-wrapper__gallery" });

        const skins = ["default"]; //add skins here

        // skins.forEach((e) => {
        //     // const imgWrapper = Element.createElement
        //     const img = new Image();
        //     img.src = `../../assets/images/ships/${e}/battleshipVertical.png`;
        //     img.className = `gallery__skin-icon ${e}`;
        //     galBody.append(img);
        // });
        RenderAccount.renderGalParts(skins, galBody, "skins");

        const fields = ["school"];

        RenderAccount.renderGalParts(fields, galBody, "fields");

        container.append(controlPanel, galBody);
    }

    static renderGalParts(data: string[], container: HTMLElement, type: string) {
        data.forEach((e) => {
            const imgWrapper = Element.createElement({ tag: "div", classNote: "gallery__icon-wrapper" });
            const img = new Image();
            if (type === "fields") {
                img.src = `../../assets/images/fields/field-icon-${e}.jpg`;
                img.className = `gallery__field-icon ${e}`;
            } else {
                img.src = `../../assets/images/ships/${e}/battleshipVertical.png`;
                img.className = `gallery__skin-icon ${e}`;
            }
            imgWrapper.append(img);
            container.append(imgWrapper);
        });
    }

    static renderPreview(container: HTMLElement, skin: string, type: string) {
        container.replaceChildren();
        const window = Element.createElement({ tag: "div", classNote: "gallery__popup-preview" });

        const title = Element.createElement({ tag: "h3", classNote: "skins-preview__title", content: skin });

        const skinsGal = Element.createElement({ tag: "div", classNote: "gallery__skins-preview" });

        if (type === "skin") {
            ["battleshipVertical", "cruiserVertical", "destroyerVertical", "boatVertical"].forEach((e) => {
                const img = new Image();
                img.src = `../../assets/images/ships/${skin}/${e}.png`;
                skinsGal.append(img);
            });
        } else {
            const img = new Image();
            img.src = `../../assets/images/fields/field-${skin}.jpg`;
            skinsGal.append(img);
        }

        const button = Element.createElement({
            tag: "button",
            classNote: "skins-preview__set-button",
            content: "Chose/Buy",
        });

        const closeButton = Element.createElement({
            tag: "button",
            classNote: "skins-preview__close-button",
            content: "Close",
        });

        window.append(title, skinsGal, button, closeButton);

        container.append(window);
    }
}
