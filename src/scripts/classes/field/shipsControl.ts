import { color, orientation } from "../../types/enums";
import { BackgroundAroundShips } from "./backgroundAroundShips";
import { BackgroundUnderShips } from "./backgroundUnderShips";
import { OrientationOfShips } from "./orientationOfShips";
import { ShipsInField } from "./shipsInField";

export class ShipsControl {
  private horizontal: string = orientation.horizontal;
  private vertical: string = orientation.vertical;
  private orientationOfShip = new OrientationOfShips();
  private shipInField = new ShipsInField();
  private backgroundUnderShip = new BackgroundUnderShips();
  private backgroundAroundShip = new BackgroundAroundShips();

  dragAndDropShip(img: HTMLImageElement) {
    let shiftX = 0;
    let shiftY = 0;
    
    const orientationDragAndDrop = this.orientationOfShip.getOrientationShip(img);
    let orientation: string;
    let currentDroppable: HTMLElement | null = null;
    img.onmousedown = (event) => {
      img.width > 33 ? orientation = this.horizontal : orientation = this.vertical;
      shiftX = event.clientX - img.getBoundingClientRect().left;
      shiftY = event.clientY - img.getBoundingClientRect().top;
      img.style.position = 'absolute';
      img.style.zIndex = '1000';

      this.shipInField.moveAt(img, event.pageX, event.pageY, shiftX, shiftY);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onmouseup);
      let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
      let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
      if (orientation === this.horizontal) {
        this.shipInField.removeShipFromFieldHorizontal(droppableBelow, orientationDragAndDrop.lengthShip);
      } else {
        this.shipInField.removeShipFromFieldVertical(droppableBelow, orientationDragAndDrop.lengthShip);
      }
      this.backgroundAroundShip.deleteBackgroundAroundShip(droppableBelow, img);
    };

    const onMouseMove = (event: MouseEvent) => {
      const orientationMove = this.orientationOfShip.getOrientationShip(img);
      this.shipInField.moveAt(img, event.pageX, event.pageY, shiftX, shiftY);
      img.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
      let right = document.elementFromPoint(img.width + +img.style.left.slice(0, -2) - 16, img.height + +img.style.top.slice(0, -2) - 16) as HTMLElement;

      let rightDropp = null;
      if (event.pageX > 16 && event.pageY > 16) {
        rightDropp = right.closest('.droppable') as HTMLElement;
      }

      img.hidden = false;
      
      if (!elemBelow) return;
      let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
      if (orientationMove.orient === this.horizontal) {
        if (currentDroppable != droppableBelow || currentDroppable != rightDropp) {
          if (currentDroppable) {
            this.backgroundUnderShip.leaveDroppableHorizontal(currentDroppable, orientationMove.lengthShip);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable && rightDropp) {
            let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
            if (overShip.classList.contains('droppable')) {
              currentDroppable = overShip as HTMLElement;
            }
            this.backgroundUnderShip.enterDroppableHorizontal(currentDroppable, orientationMove.lengthShip);
          }
        }
      } else {
        if (currentDroppable != droppableBelow || currentDroppable != rightDropp) {
          if (currentDroppable) {
            this.backgroundUnderShip.leaveDroppableVertical(currentDroppable, orientationMove.lengthShip);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable && rightDropp) {
            let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
            if (overShip.classList.contains('droppable')) {
              currentDroppable = overShip as HTMLElement;
            }
            this.backgroundUnderShip.enterDroppableVertical(currentDroppable, orientationMove.lengthShip);
          }
        }
      }
      
    }

    const onmouseup = (event: MouseEvent) => {
      const orientationMouseUp =  this.orientationOfShip.getOrientationShip(img);
      if (img.style.position === 'absolute') {
        document.removeEventListener('mousemove', onMouseMove);
        img.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
        img.hidden = false;
        let field: boolean | null = null;
        if (img.style.left > '0' && img.style.top > '0') {
          if (elemBelow.style.boxShadow == color.backgroundUnderShip && elemBelow.style.background !== color.backgroundAroundShip) {
            field = true;
          }
          let newBelow = elemBelow;
          if (newBelow.classList.contains('ship')) {
            field = null;
          } else {
            if (orientationMouseUp.orient === this.horizontal) {
              for (let i = 0; i < orientationMouseUp.lengthShip; i++) {
                if (newBelow !== null) {
                  if ((newBelow as HTMLElement).style.background === color.backgroundAroundShip) {
                    field = null;
                  }
                  newBelow = newBelow.nextElementSibling as HTMLElement;
                }
              }
            } else {
              for (let i = 0; i < orientationMouseUp.lengthShip; i++) {
                if (newBelow!== null) {
                  if (newBelow.classList.contains('droppable')) {
                    if ((newBelow as HTMLElement).style.background === color.backgroundAroundShip) {
                      field = null;
                    }
                  }
                }
                for (let j = 0; j < 10; j++) {
                  if (newBelow !== null) {
                    newBelow = newBelow.nextElementSibling as HTMLElement;
                  }
                }
              }
            }
          }
        }
        if (orientationMouseUp.orient === this.horizontal) {
          if (field !== null) {
            elemBelow.append(img);
            img.style.position = 'relative';
            img.style.left = '0px';
            img.style.top = '0px';
            elemBelow.classList.add('newship');
            this.shipInField.addShipToFieldHorizontal(elemBelow, orientationMouseUp.lengthShip);
            if (!elemBelow) return;
            elemBelow.classList.remove('newship');
            this.backgroundAroundShip.renderAroundShip();
            this.backgroundUnderShip.leaveDroppableHorizontal(elemBelow, orientationMouseUp.lengthShip);
          } else {
            let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
            if (droppableBelow !== null) {
              let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
              if (overShip.classList.contains('droppable')) {
                droppableBelow = overShip as HTMLElement;
              }
              this.backgroundUnderShip.leaveDroppableHorizontal(droppableBelow, orientationMouseUp.lengthShip);
            }
            this.shipInField.returnShip(img);
          }
        } else {
          if (field !== null) {
            elemBelow.append(img);
            img.style.position = 'relative';
            img.style.left = '0px';
            img.style.top = '0px';
            elemBelow.classList.add('newship');
            this.shipInField.addShipToFieldVertical(elemBelow, orientationMouseUp.lengthShip);
            if (!elemBelow) return;
            elemBelow.classList.remove('newship');
            this.backgroundAroundShip.renderAroundShip();
            this.backgroundUnderShip.leaveDroppableVertical(elemBelow, orientationMouseUp.lengthShip);
          } else {
            let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
            if (droppableBelow !== null) {
              let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
              if (overShip.classList.contains('droppable')) {
                droppableBelow = overShip as HTMLElement;
              }
              this.backgroundUnderShip.leaveDroppableVertical(droppableBelow, orientationMouseUp.lengthShip);
            }
            this.shipInField.returnShip(img);
          }
        }
      }
    }

    img.ondragstart = function() {
      return false;
    };
  }
}