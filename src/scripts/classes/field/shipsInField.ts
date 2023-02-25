import { color, orientation } from "../../types/enums";
import { BackgroundAroundShips } from "./backgroundAroundShips";
import { OrientationOfShips } from "./orientationOfShips";

export class ShipsInField {
  private horizontal: string = orientation.horizontal;
  private vertical: string = orientation.vertical;
  private middle: string = orientation.middle;
  private orientationOfShip = new OrientationOfShips();
  private backgroundAroundShip = new BackgroundAroundShips();
  

  moveAt(img: HTMLImageElement, pageX: number, pageY: number, shiftX: number, shiftY: number) {
    img.style.left = pageX - shiftX + 'px';
    img.style.top = pageY - shiftY + 'px';
  }

  addShipToFieldHorizontal(element: HTMLElement, shipLength: number) {
    element.classList.add('ship__active');
    for (let i = 0; i < shipLength - 1; i++) {
      element = element.nextElementSibling as HTMLElement;
      element.classList.add('ship__active');
    }
  }

  addShipToFieldVertical(element: HTMLElement, shipLength: number) {
    element.classList.add('ship__active');
    let el = element as HTMLElement;
    for (let i = 0; i < shipLength - 1; i++) {
      for (let i = 0; i < 10; i++) {
        el = el.nextElementSibling as HTMLElement;
      }
      el.classList.add('ship__active');
    }
  }
  
  removeShipFromFieldHorizontal(element: HTMLElement, shipLength: number) {
    if (element !== null) {
      element.classList.remove('ship__active');
      for (let i = 0; i < shipLength - 1; i++) {
        element = element.nextElementSibling as HTMLElement;
        if (element !== null) {
          element.classList.remove('ship__active');
        }
      }
    }
  }

  removeShipFromFieldVertical(element: HTMLElement, shipLength: number) {
    if (element !== null) {
      element.classList.remove('ship__active');
      let el = element as HTMLElement;
      for (let i = 0; i < shipLength - 1; i++) {
        for (let i = 0; i < 10; i++) {
          if (el.nextElementSibling as HTMLElement !== null) {
            el = el.nextElementSibling as HTMLElement;
          }
          
        }
        el.classList.remove('ship__active');
      }
  }
  }

  returnShip(img: HTMLImageElement) {
    img.style.position = 'relative';
    img.style.left = '0px';
    img.style.top = '0px';
    
    const orientationShip = this.orientationOfShip.getOrientationShip(img);
    if (document.getElementById('list__shipsVertical') && orientationShip.orient == this.horizontal) {
      this.orientationOfShip.changeShipOrientationToVertical(img);
    }
    if (document.getElementById('list__shipsHorizontal') && orientationShip.orient == this.vertical) {
      this.orientationOfShip.changeShipOrientationToHorizontal(img);
    }
    if (img.classList.contains('battleship')) {
      document.getElementById('battleship__container')?.append(img);
    }
    if (img.classList.contains('cruiser')) {
      document.getElementById('cruiser__container')?.append(img);
    }
    if (img.classList.contains('destroyer')) {
      document.getElementById('destroyer__container')?.append(img);
    }
    if (img.classList.contains('boat')) {
      document.getElementById('boat__container')?.append(img);
    }
  }

  returnAllShips() {
    document.getElementById('field')?.childNodes.forEach((element) => {
      if (element.hasChildNodes()) {
        const img = (element.firstChild as HTMLImageElement);
        //console.log(img);
        this.returnShip(img);
        this.backgroundAroundShip.renderAroundShip();
      }
    });
  }


}