import { BackgroundAttack, shipsImages, TileStatus } from "../../types/enums";
import { fieldTile, ShipsData } from "../../types/interfaces";
import { Element } from "../element/element";
import { Utilities } from "../Utilities";

export class RenderMultiGame {
    static renderWrapper(
        container: HTMLElement,
        fieldSkin: string,
        ourShips: ShipsData,
        enemyShips: ShipsData,
        ourMatrix: fieldTile[],
        enemyMatrix: fieldTile[]
    ) {
        container.replaceChildren();
        const gameContainer = Element.createElement({ tag: "div", classNote: "game__container" });

        const ourFieldWrapper = Element.createElement({ tag: "div", classNote: "field-wrapper" });
        const ourField = Element.createElement({
            tag: "div",
            id: "ourField__container",
            classNote: "field__container",
        });
        ourFieldWrapper.append(ourField);

        ourFieldWrapper.style.backgroundImage = `url("../../assets/images/fields/${fieldSkin}-field.jpg")`;

        RenderMultiGame.renderMyField(ourField, ourShips, ourMatrix);
        const enemyFieldWrapper = Element.createElement({ tag: "div", classNote: "field-wrapper" });
        const enemyField = Element.createElement({ tag: "div", id: "field", classNote: "field__container" });
        enemyFieldWrapper.append(enemyField);
        enemyFieldWrapper.style.backgroundImage = `url("../../assets/images/fields/${fieldSkin}-field.jpg")`;

        RenderMultiGame.renderEnemyField(enemyField, enemyMatrix);
        gameContainer.append(ourFieldWrapper, enemyFieldWrapper);
        container.append(gameContainer);

        return { ourFieldWrapper: ourField, enemyFieldWrapper: enemyField };
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
}
