import { BackgroundAttack, shipsImages, TileStatus } from "../../types/enums";
import { fieldTile, GetUserData, ShipsData } from "../../types/interfaces";
import { Element } from "../element/element";
import { Utilities } from "../Utilities";

export class RenderMultiGame {
    static renderWrapper(
        container: HTMLElement,
        ourShips: ShipsData,
        ourMatrix: fieldTile[],
        enemyMatrix: fieldTile[],
        ourData: GetUserData | undefined,
        enemyData: GetUserData | undefined
    ) {
        container.replaceChildren();
        const ourFieldSkin = ourData ? ourData.currentFieldSkin : "default";
        const enemyFieldSkin = enemyData ? enemyData.currentFieldSkin : "default";

        const ourShipSkin = ourData ? ourData.currentShipSkin : "school";
        const enemyShipSkin = enemyData ? enemyData.currentShipSkin : "school";

        const ourStatus = Element.createElement({ tag: "div", classNote: "battle__our-status" });
        const [ourName, ourRank, ourCount] = RenderMultiGame.renderStatus(ourStatus, "our");

        const gameContainer = Element.createElement({ tag: "div", classNote: "game__container" });

        const ourFieldWrapper = Element.createElement({ tag: "div", classNote: "field-wrapper" });
        const ourField = Element.createElement({
            tag: "div",
            id: "ourField__container",
            classNote: "field__container",
        });
        ourFieldWrapper.append(ourField);

        ourFieldWrapper.style.backgroundImage = `url("../../assets/images/fields/${ourFieldSkin}-field.jpg")`;

        RenderMultiGame.renderMyField(ourField, ourShips, ourMatrix);
        const enemyFieldWrapper = Element.createElement({ tag: "div", classNote: "field-wrapper" });
        const enemyField = Element.createElement({ tag: "div", id: "field", classNote: "field__container" });
        enemyFieldWrapper.append(enemyField);
        enemyFieldWrapper.style.backgroundImage = `url("../../assets/images/fields/${enemyFieldSkin}-field.jpg")`;

        RenderMultiGame.renderEnemyField(enemyField, enemyMatrix);

        const enemyStatus = Element.createElement({ tag: "div", classNote: "battle__enemy-status" });
        const [enemyName, enemyRank, enemyCount] = RenderMultiGame.renderStatus(enemyStatus, "enemy");

        gameContainer.append(ourStatus, ourFieldWrapper, enemyFieldWrapper, enemyStatus);
        container.append(gameContainer);

        return {
            ourFieldWrapper: ourField,
            enemyFieldWrapper: enemyField,
            ourName: ourName,
            enemyName: enemyName,
            ourCount: ourCount,
            enemyCount: enemyCount,
            ourRank: ourRank,
            enemyRank: enemyRank,
        };
    }

    static renderMyField(container: HTMLElement, ourShips: ShipsData, ourMatrix: fieldTile[]) {
        container.replaceChildren();
        ourMatrix.forEach((e, i) => {
            const smallField = Element.createElement({ tag: "div", classNote: "field__small ourField" });
            container.appendChild(smallField);
            if (e.shipHead) {
                if (e.shipIndex === undefined) return;
                const ship = ourShips.ShipsCoordinates.coordinatesOfShips[e.shipIndex];
                RenderMultiGame.renderShipImage(smallField, ship);
            }
            if (e.tileStatus === TileStatus.miss) {
                smallField.style.background = BackgroundAttack.miss;
            }
            if (e.tileStatus === TileStatus.wound) {
                smallField.style.background = BackgroundAttack.wound;
            }
        });
    }

    static renderEnemyField(container: HTMLElement, enemyMatrix: fieldTile[]) {
        container.replaceChildren();
        enemyMatrix.forEach((e, i) => {
            const smallField = Element.createElement({ tag: "div", classNote: "field__small enemyField droppable" });
            smallField.dataset.coord = `${i}`;
            container.appendChild(smallField);
            if (e.tileStatus === TileStatus.miss) {
                smallField.style.background = BackgroundAttack.miss;
            }
            if (e.tileStatus === TileStatus.wound) {
                smallField.style.background = BackgroundAttack.wound;
            }
        });
    }

    static renderShipImage(container: HTMLElement, shipCoords: number[]) {
        const img = new Image();
        if (shipCoords.length === 1) RenderMultiGame.renderBoat(img);
        if (shipCoords.length === 2) RenderMultiGame.renderDest(img, shipCoords);
        if (shipCoords.length === 3) RenderMultiGame.renderCrus(img, shipCoords);
        if (shipCoords.length === 4) RenderMultiGame.renderBs(img, shipCoords);
        container.append(img);
    }

    static renderBoat(elem: HTMLImageElement) {
        const random = Utilities.randomNum(0, 10);
        const base = random > 5 ? shipsImages.boatImageVertical : shipsImages.boatImageHorizontal;
        elem.src = Utilities.makeImageLink(base);
        elem.style.width = "33px";
        elem.style.height = "33px";
    }

    static renderDest(elem: HTMLImageElement, shipCoords: number[]) {
        if (shipCoords[0] + 1 === shipCoords[1]) {
            elem.src = Utilities.makeImageLink(shipsImages.destroyerImageHorizontal);
            elem.style.height = "33px";
            elem.style.width = "66px";
        } else {
            elem.src = Utilities.makeImageLink(shipsImages.destroyerImageVertical);
            elem.style.height = "66px";
            elem.style.width = "33px";
        }
    }

    static renderCrus(elem: HTMLImageElement, shipCoords: number[]) {
        if (shipCoords[0] + 1 === shipCoords[1]) {
            elem.src = Utilities.makeImageLink(shipsImages.cruiserImageHorizontal);
            elem.style.height = "33px";
            elem.style.width = "99px";
        } else {
            elem.src = Utilities.makeImageLink(shipsImages.cruiserImageVertical);
            elem.style.height = "99px";
            elem.style.width = "33px";
        }
    }

    static renderBs(elem: HTMLImageElement, shipCoords: number[]) {
        if (shipCoords[0] + 1 === shipCoords[1]) {
            elem.src = Utilities.makeImageLink(shipsImages.battleshipImageHorizontal);
            elem.style.height = "33px";
            elem.style.width = "132px";
        } else {
            elem.src = Utilities.makeImageLink(shipsImages.battleshipImageVertical);
            elem.style.height = "132px";
            elem.style.width = "33px";
        }
    }

    static renderStatus(container: HTMLElement, type: string) {
        const userName = Element.createElement({ tag: "h2", classNote: `battle__name ${type}-name` });
        const rank = Element.createElement({ tag: "div", classNote: `battle__rank ${type}-rank` });
        const shipCount = Element.createElement({
            tag: "div",
            classNote: `battle__count ${type}-count`,
            content: "Ships destroyed: 0/10",
        });
        container.append(userName, rank, shipCount);
        return [userName, rank, shipCount];
    }
}
