import { orientation } from "../../types/enums";
import { OrientationOfShips } from "./orientationOfShips";

export class ShipsCoordinates {
  private horizontal: string = orientation.horizontal;
  private vertical: string = orientation.vertical;
  private middle: string = orientation.middle;
  private orientationOfShip = new OrientationOfShips();

  getShipsCoordinates() {
    let coordinatesOfShips: number[][] = [];
        let countSihps: number = -1;
        document.getElementById('field')?.childNodes.forEach((element, index) => {
          if ((element as HTMLElement).classList.contains('ship__active')) {
            if (element.hasChildNodes()) {
              coordinatesOfShips.push([]);
              countSihps += 1;
              let el = (element.firstChild as HTMLImageElement);
              const OrientationShip = this.orientationOfShip.getOrientationShip(el);
              //const OrientationShip = this.getOrientationShip(el);
              const orient = OrientationShip.orient;
              const lengthShip = OrientationShip.lengthShip;
              if (orient === this.middle) {
                coordinatesOfShips[countSihps].push(index);
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
      return coordinatesOfShips;
  }

}