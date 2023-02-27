import { Filters } from "../../types/enums";
import { GetUserData } from "../../types/interfaces";
import { Element } from "../element/element";
import { Utilities } from "../Utilities";

export class RenderAccount {
    static renderAccount(container: HTMLElement, data: GetUserData, filter?: Filters) {
        container.replaceChildren();

        const title = Element.createElement({ tag: "h1", content: data.name, classNote: "account__title" });

        const accInfoWrapper = Element.createElement({ tag: "nav", classNote: "account__info" });
        RenderAccount.renderAccInfo(accInfoWrapper, data);

        const rankWrapper = Element.createElement({ tag: "div", classNote: "account-rank" });
        RenderAccount.renderRankBar(rankWrapper, data);

        const statusWrapper = Element.createElement({ tag: "div", classNote: "account-status" });
        RenderAccount.renderAccStatus(statusWrapper, data);

        const galleryWrapper = Element.createElement({ tag: "div", classNote: "account__gallery" });

        RenderAccount.renderGallery(galleryWrapper, data, filter);

        const overlay = Element.createElement({ tag: "div", classNote: "preview-overlay hidden" });
        const popup = Element.createElement({ tag: "div", classNote: "preview-popup hidden" });

        container.append(title, accInfoWrapper, statusWrapper, rankWrapper, galleryWrapper, overlay, popup);

        return { overlay, popup };
    }

    static renderAccInfo(container: HTMLElement, data: GetUserData) {
        const accGold = Element.createElement({
            tag: "div",
            classNote: "account__account-gold",
            content: `Gold: ${data.gold}`,
        });

        const accXp = Element.createElement({
            tag: "div",
            classNote: "account__account-xp",
            content: `XP: ${data.exp}`,
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

        container.append(accGold, accXp, accWinsPvE, accWinsPvP);
    }

    static renderRankBar(container: HTMLElement, data: GetUserData) {
        const rankCalc = Utilities.calcRank(data.exp);
        const curRank = Element.createElement({
            tag: "div",
            classNote: "rank__current",
            content: `Rank: ${rankCalc.curRank}`,
        });
        const curExp = Element.createElement({
            tag: "div",
            classNote: "rank__current-exp",
            content: `${rankCalc.rankStart}`,
        });
        const expBar = Element.createElement({ tag: "div", classNote: "rank__exp-bar" });
        const expPercentage = Element.createElement({ tag: "div", classNote: "rank__exp-percent" });
        expPercentage.style.width = `${rankCalc.percentage}%`;
        expBar.appendChild(expPercentage);
        const nextExp = Element.createElement({
            tag: "div",
            classNote: "rank__next-exp",
            content: `${rankCalc.rankNext}`,
        });
        const nextRank = Element.createElement({
            tag: "div",
            classNote: "rank__next-rank",
            content: `Rank: ${rankCalc.curRank + 1}`,
        });

        container.append(curRank, curExp, expBar, nextExp, nextRank);
    }

    static renderAccStatus(container: HTMLElement, data: GetUserData) {
        const currentShipSkin = Element.createElement({
            tag: "div",
            classNote: "status__ship-skin",
            content: `Current Ship skin:`,
        });
        const selectShipSkin = Element.createElement({ tag: "select", classNote: "status__ship-select" });
        data.obtShipSkins.split("-").forEach((e) => {
            const opt = document.createElement("option");
            opt.textContent = e;
            opt.value = `${e}-skin`;
            if (e === data.currentShipSkin) {
                opt.selected = true;
            }
            selectShipSkin.append(opt);
        });
        const currentFieldSkin = Element.createElement({
            tag: "div",
            classNote: "status__filed-skin",
            content: `Current Field skin:`,
        });
        const selectFieldSkin = Element.createElement({ tag: "select", classNote: "status__field-select" });
        data.obtFieldSkins.split("-").forEach((e) => {
            const opt = document.createElement("option");
            opt.textContent = e;
            opt.value = `${e}-field`;
            if (e === data.currentFieldSkin) {
                opt.selected = true;
            }
            selectFieldSkin.append(opt);
        });

        const logOut = Element.createElement({ tag: "button", classNote: "status__logout", content: "Log out" });

        container.append(currentShipSkin, selectShipSkin, currentFieldSkin, selectFieldSkin, logOut);
    }

    static renderGallery(container: HTMLElement, data: GetUserData, filter?: Filters) {
        const controlPanel = Element.createElement({ tag: "div", classNote: "gallery-wrapper__filters filters" });

        const allSkins = Element.createElement({
            tag: "div",
            classNote: "filters__all-skins filters",
            content: "All",
        });
        allSkins.dataset.filter = Filters.all;
        if (!filter) {
            allSkins.classList.add("current-filter");
        }

        const open = Element.createElement({
            tag: "div",
            classNote: "filters__obtained-skins filters",
            content: "My Skins",
        });
        open.dataset.filter = Filters.obtained;
        if (filter === Filters.obtained) {
            open.classList.add("current-filter");
        }

        const locked = Element.createElement({
            tag: "div",
            classNote: "filters__locked-skins filters",
            content: "Locked Skins",
        });
        locked.dataset.filter = Filters.locked;
        if (filter === Filters.locked) {
            locked.classList.add("current-filter");
        }

        const shipSkins = Element.createElement({
            tag: "div",
            classNote: "filters__ship-skins filters",
            content: " Ships",
        });
        shipSkins.dataset.filter = Filters.ships;
        if (filter === Filters.ships) {
            shipSkins.classList.add("current-filter");
        }

        const field = Element.createElement({ tag: "div", classNote: "filters__fields filters", content: "Fields" });
        field.dataset.filter = Filters.fields;
        if (filter === Filters.fields) {
            field.classList.add("current-filter");
        }

        controlPanel.append(allSkins, open, locked, shipSkins, field);

        const galBody = Element.createElement({ tag: "div", classNote: "gallery-wrapper__gallery filters" });

        if (filter === Filters.ships) {
            RenderAccount.renderGalParts(Object.keys(Utilities.shipSkins), galBody, "skins", data, filter);
        } else if (filter === Filters.fields) {
            RenderAccount.renderGalParts(Object.keys(Utilities.fieldSkins), galBody, "fields", data, filter);
        } else {
            RenderAccount.renderGalParts(Object.keys(Utilities.shipSkins), galBody, "skins", data, filter);
            RenderAccount.renderGalParts(Object.keys(Utilities.fieldSkins), galBody, "fields", data, filter);
        }

        container.append(controlPanel, galBody);
    }

    static renderGalParts(
        skinData: string[],
        container: HTMLElement,
        type: string,
        userData: GetUserData,
        filter?: Filters
    ) {
        let data;
        if (filter) {
            data = RenderAccount.filterData(filter, userData, skinData);
        } else {
            data = skinData;
        }
        data.forEach((e) => {
            const imgWrapper = Element.createElement({ tag: "div", classNote: "gallery__icon-wrapper" });
            const img = new Image();
            if (type === "fields") {
                img.src = `../../assets/images/fields/${e}-field.jpg`;
                img.className = `gallery__field-icon ${e}`;
            } else {
                img.src = `../../assets/images/ships/${e}/battleshipVertical.png`;
                img.className = `gallery__skin-icon ${e}`;
            }
            if (userData.obtFieldSkins.includes(e) || userData.obtShipSkins.includes(e)) {
                imgWrapper.classList.add("obtained");
            }
            if (userData.currentShipSkin === e || userData.currentFieldSkin === e) {
                imgWrapper.classList.add("selected");
            }

            imgWrapper.append(img);
            container.append(imgWrapper);
        });
    }

    static renderPreview(container: HTMLElement, skin: string, type: string, data: GetUserData) {
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
            img.src = `../../assets/images/fields/${skin}-field.jpg`;
            skinsGal.append(img);
        }

        // const button: HTMLButtonElement = Element.createElement({
        //     tag: "button",
        //     classNote: "skins-preview__set-button",
        // });
        const button = document.createElement("button");
        button.className = "skins-preview__set-button";

        if (!(data.obtFieldSkins.includes(skin) || data.obtShipSkins.includes(skin))) {
            button.textContent = "Buy";
            button.classList.add("buy");
        } else {
            if (data.currentFieldSkin === skin || data.currentShipSkin === skin) {
                button.textContent = "Selected";
                button.classList.add("disabled");
                button.disabled = true;
            } else {
                button.textContent = "Select";
                button.classList.add("select");
            }
        }
        const priceElem = Element.createElement({ tag: "div", classNote: "skins-preview__price" });
        let price;
        if (type === "skin") {
            price = Utilities.shipSkins[skin];
        } else {
            price = Utilities.fieldSkins[skin];
        }
        priceElem.textContent = `Price: ${price} gold`;
        container.dataset.price = `${price}`;
        container.dataset.skin = `${skin}-${type}`;

        const closeButton = Element.createElement({
            tag: "button",
            classNote: "skins-preview__close-button",
            content: "Close",
        });

        window.append(title, skinsGal, button, priceElem, closeButton);

        container.append(window);
    }

    static filterData(filter: Filters, data: GetUserData, skinData: string[]) {
        let res: string[];
        switch (filter) {
            case Filters.obtained:
                res = skinData.filter((e) => data.obtFieldSkins.includes(e) || data.obtShipSkins.includes(e));
                break;

            case Filters.locked:
                res = skinData.filter((e) => !(data.obtFieldSkins.includes(e) || data.obtShipSkins.includes(e)));
                break;

            default:
                res = skinData;
        }
        return res;
    }
}
