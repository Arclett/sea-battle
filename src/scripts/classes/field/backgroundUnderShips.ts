import { color } from "../../types/enums";

export class BackgroundUnderShips{
  enterDroppableHorizontal(elem: HTMLElement, shipLength: number) {
    if (elem.style.boxShadow !== color.backgroundUnderShip) {
      elem.style.boxShadow = color.backgroundUnderShip;
      let el = elem.nextElementSibling as HTMLElement;
      for (let i = 0; i < shipLength - 1; i++) {
        if (el) {
          el.style.boxShadow = color.backgroundUnderShip;
          el = el.nextElementSibling as HTMLElement;
        }
      }
    }
  }

  leaveDroppableHorizontal(elem: HTMLElement, shipLength: number) {
    if (elem.style.boxShadow == color.backgroundUnderShip) {
      elem.style.boxShadow = '';
      let el = elem.nextElementSibling as HTMLElement;
      for (let i = 0; i < shipLength - 1; i++) {
        if (el) {
          el.style.boxShadow = '';
          el = el.nextElementSibling as HTMLElement;
        }
      }
    }
  }

  enterDroppableVertical(elem: HTMLElement, shipLength: number) {
    if (elem.style.boxShadow !== color.backgroundUnderShip) {
      elem.style.boxShadow = color.backgroundUnderShip;
      let el = elem as HTMLElement;
      for (let i = 0; i < shipLength - 1; i++) {
        for (let i = 0; i < 10; i++) {
          el = el.nextElementSibling as HTMLElement;
        }
        el.style.boxShadow = color.backgroundUnderShip;
      }
    }
  }

  leaveDroppableVertical(elem: HTMLElement, shipLength: number) {
    if (elem.style.boxShadow == color.backgroundUnderShip) {
      elem.style.boxShadow = '';
      let el = elem as HTMLElement;
      for (let i = 0; i < shipLength - 1; i++) {
        for (let i = 0; i < 10; i++) {
          el = el.nextElementSibling as HTMLElement;
        }
        el.style.boxShadow = '';
      }
    }
  }
}