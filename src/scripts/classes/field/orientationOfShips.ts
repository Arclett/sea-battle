import { shipsImages, imagesPlacementMenu, orientation, shipsLength } from "../../types/enums";
import { Utilities } from "../Utilities";

export class OrientationOfShips {
    private horizontal: string = orientation.horizontal;
    private vertical: string = orientation.vertical;
    private middle: string = orientation.middle;

    getOrientationShip(el: HTMLImageElement) {
        let heightShip = Math.floor(el.height);
        if (heightShip === 34) {
            heightShip = 33;
        }
        let widthShip = Math.floor(el.width);
        let orient: string = "";
        if (heightShip === widthShip) {
            orient = this.middle;
        }
        if (heightShip > widthShip) {
            orient = this.vertical;
        }
        if (heightShip < widthShip) {
            orient = this.horizontal;
        }
        let lengthShip = widthShip > heightShip ? widthShip / 33 : heightShip / 33;
        return { orient, lengthShip };
    }

    changeOrientationShips() {
        let container = document.getElementById("list__shipsHorizontal");
        if (container === null) {
            container = document.getElementById("list__shipsVertical");
        }
        if (container !== null)
            if (container.id === "list__shipsHorizontal") {
                this.changeOrientationToVertical();
                container.id = "list__shipsVertical";
            } else {
                this.changeOrientationToHorizontal();
                container.id = "list__shipsHorizontal";
            }
    }

    changeOrientationToVertical() {
        const vertical = this.vertical;
        const list = document.getElementById("list__shipsHorizontal");
        list?.childNodes.forEach((container) => {
            (container as HTMLElement).classList.remove(this.horizontal);
            (container as HTMLElement).classList.add(this.vertical);
            (container as HTMLElement).childNodes.forEach((item) => {
                let ship = item as HTMLImageElement;
                switch (ship.className) {
                    case "battleship ship":
                        this.changeBattleship(vertical, ship);
                        break;

                    case "cruiser ship":
                        this.changeCruiser(vertical, ship);
                        break;

                    case "destroyer ship":
                        this.changeDestroyer(vertical, ship);
                        break;

                    case "boat ship":
                        this.changeBoat(vertical, ship);
                        break;

                    default:
                        break;
                }
            });
        });
        if (list) {
        }
    }

    changeOrientationToHorizontal() {
        const horizontal = this.horizontal;
        const list = document.getElementById("list__shipsVertical");
        list?.childNodes.forEach((container) => {
            (container as HTMLElement).classList.remove(this.vertical);
            (container as HTMLElement).classList.add(this.horizontal);
            (container as HTMLElement).childNodes.forEach((item) => {
                let ship = item as HTMLImageElement;
                switch (ship.className) {
                    case "battleship ship":
                        this.changeBattleship(horizontal, ship);
                        break;

                    case "cruiser ship":
                        this.changeCruiser(horizontal, ship);
                        break;

                    case "destroyer ship":
                        this.changeDestroyer(horizontal, ship);
                        break;

                    case "boat ship":
                        this.changeBoat(horizontal, ship);
                        break;

                    default:
                        break;
                }
            });
        });
    }

    changeShipOrientationToVertical(img: HTMLImageElement) {
        this.reverseShip(img);
        if (img.classList.contains("battleship")) {
            img.src = Utilities.makeImageLink(shipsImages.battleshipImageVertical);
        }
        if (img.classList.contains("cruiser")) {
            img.src = Utilities.makeImageLink(shipsImages.cruiserImageVertical);
        }
        if (img.classList.contains("destroyer")) {
            img.src = Utilities.makeImageLink(shipsImages.destroyerImageVertical);
        }
        if (img.classList.contains("boat")) {
            img.src = Utilities.makeImageLink(shipsImages.boatImageVertical);
        }
    }

    changeShipOrientationToHorizontal(img: HTMLImageElement) {
        this.reverseShip(img);
        if (img.classList.contains("battleship")) {
            img.src = Utilities.makeImageLink(shipsImages.battleshipImageHorizontal);
        }
        if (img.classList.contains("cruiser")) {
            img.src = Utilities.makeImageLink(shipsImages.cruiserImageHorizontal);
        }
        if (img.classList.contains("destroyer")) {
            img.src = Utilities.makeImageLink(shipsImages.destroyerImageHorizontal);
        }
        if (img.classList.contains("boat")) {
            img.src = Utilities.makeImageLink(shipsImages.boatImageHorizontal);
        }
    }

    reverseShip(img: HTMLImageElement) {
        let temp = img.height;
        img.height = img.width;
        img.width = temp;
    }

    changeBattleship(orientation: string, ship: HTMLImageElement) {
        if (orientation === this.horizontal) {
            ship.src = Utilities.makeImageLink(shipsImages.battleshipImageHorizontal);
            ship.height = shipsLength.WidthAllShips;
            ship.width = shipsLength.battleship;
        } else {
            ship.src = Utilities.makeImageLink(shipsImages.battleshipImageVertical);
            ship.height = shipsLength.battleship;
            ship.width = shipsLength.WidthAllShips;
        }
    }

    changeCruiser(orientation: string, ship: HTMLImageElement) {
        if (orientation === this.horizontal) {
            ship.src = Utilities.makeImageLink(shipsImages.cruiserImageHorizontal);
            ship.height = shipsLength.WidthAllShips;
            ship.width = shipsLength.cruiser;
        } else {
            ship.src = Utilities.makeImageLink(shipsImages.cruiserImageVertical);
            ship.height = shipsLength.cruiser;
            ship.width = shipsLength.WidthAllShips;
        }
    }

    changeDestroyer(orientation: string, ship: HTMLImageElement) {
        if (orientation === this.horizontal) {
            ship.src = Utilities.makeImageLink(shipsImages.destroyerImageHorizontal);
            ship.height = shipsLength.WidthAllShips;
            ship.width = shipsLength.destroyer;
        } else {
            ship.src = Utilities.makeImageLink(shipsImages.destroyerImageVertical);
            ship.height = shipsLength.destroyer;
            ship.width = shipsLength.WidthAllShips;
        }
    }

    changeBoat(orientation: string, ship: HTMLImageElement) {
        if (orientation === this.horizontal) {
            ship.src = Utilities.makeImageLink(shipsImages.boatImageHorizontal);
        } else {
            ship.src = Utilities.makeImageLink(shipsImages.boatImageVertical);
        }
    }
}
