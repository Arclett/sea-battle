import { shipsImages, orientation } from "../../types/enums";
import { Utilities } from "../Utilities";
import { OrientationOfShips } from "./orientationOfShips";

export class ShipsCoordinates {
    private horizontal: string = orientation.horizontal;
    private vertical: string = orientation.vertical;
    private middle: string = orientation.middle;
    private orientationOfShip = new OrientationOfShips();
    private boatImageHorizontal = Utilities.makeImageLink(shipsImages.boatImageHorizontal);

    getShipsCoordinates() {
        let coordinatesOfShips: number[][] = [];
        let orientationBoat = this.vertical;
        let countSihps: number = -1;
        document.getElementById("field")?.childNodes.forEach((element, index) => {
            if ((element as HTMLElement).classList.contains("ship__active")) {
                if (element.hasChildNodes()) {
                    coordinatesOfShips.push([]);
                    countSihps += 1;
                    let el = element.firstChild as HTMLImageElement;
                    const OrientationShip = this.orientationOfShip.getOrientationShip(el);
                    const orient = OrientationShip.orient;
                    const lengthShip = OrientationShip.lengthShip;
                    let src = el.src.split("/");
                    let srcboat = this.boatImageHorizontal.split("/");
                    if (orient === this.middle) {
                        coordinatesOfShips[countSihps].push(index);
                        if (src[src.length - 1] === srcboat[srcboat.length - 1]) {
                            orientationBoat = this.horizontal;
                        } else {
                            orientationBoat = this.vertical;
                        }
                    }
                    if (orient === this.horizontal) {
                        for (let i = 0; i < lengthShip; i++) {
                            coordinatesOfShips[countSihps].push(index + i);
                        }
                    }
                    if (orient === this.vertical) {
                        for (let i = 0; i < lengthShip; i++) {
                            coordinatesOfShips[countSihps].push(index + 10 * i);
                        }
                    }
                }
            }
        });
        return { coordinatesOfShips, orientationBoat };
    }
}
