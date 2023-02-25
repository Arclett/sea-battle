import { shipsImages, imagesPlacementMenu } from "../../types/enums";
import { Element } from "../element/element";
import { OrientationOfShips } from "../field/orientationOfShips";
import { RandomShips } from "../field/randomShips";
import { ShipsCoordinatesWithBackground } from "../field/shipsCoordinatesWithBackground";
import { ShipsInField } from "../field/shipsInField";
import { ShipsControl } from "../field/shipsControl";
import { GUISingleGamePage } from "./GUISingleGamePage";

export class GUIShipsPlacement{
  private orientationOfShip = new OrientationOfShips();
  private shipInField = new ShipsInField();
  private randomShip = new RandomShips();
  private ShipCoordinatesWithBackground = new ShipsCoordinatesWithBackground();
  private ShipControl = new ShipsControl();
  
  renderShipsPlacement() {
    document.getElementsByClassName('wrapper main__wrapper')[0].innerHTML = '';
    const controlMenu = Element.createElement({ tag: 'div', classNote: 'controlMenu__container' });
    const circleArrow = Element.createImage({ src: imagesPlacementMenu.circleArrow, alt: 'left-right', classNote: 'circleArrow', width: 150});
    const backShips = Element.createImage({ src: imagesPlacementMenu.clearField, alt: 'trash', classNote: 'trash', width: 150 });
    const randomShips = Element.createImage({ src: imagesPlacementMenu.randomShipsToField, alt: 'random', classNote: 'random', width: 150 });
    const fieldContainer = Element.createElement({ tag: 'div', classNote: 'shipsPlacement__container' });
    const startButton = Element.createElement({ tag: 'button', id: 'startGame', content: 'Start Game' });
    startButton.addEventListener('click', () => {
      if (this.ShipCoordinatesWithBackground.getShipsCoordinatesWithBackground().ShipsCoordinates.coordinatesOfShips.length === 10) {
        //console.log(this.ShipCoordinatesWithBackground.getShipsCoordinatesWithBackground().ShipsCoordinates, this.ShipCoordinatesWithBackground.getShipsCoordinatesWithBackground().ShipsCoordinatesWithBackground);
        location.hash = 'singleGame';
      }
    });
    circleArrow.addEventListener('click', () => {
      this.orientationOfShip.changeOrientationShips();
    });
    controlMenu.append(circleArrow, backShips, randomShips);
    document.getElementsByClassName('wrapper main__wrapper')[0].append(fieldContainer, startButton);
    const listOfShips = Element.createElement({ tag: 'div', id: 'list__shipsHorizontal' });
    const field = Element.createElement({ tag: 'div', id: 'field', classNote: 'field__container' });
    for (let i = 0; i < 100; i++) {
      const smallField = Element.createElement({ tag: 'div', classNote: 'field__small droppable' });
      field.append(smallField);
    }
    fieldContainer.append(listOfShips, field, controlMenu);
    const battleship = Element.createImage({ src: defaultShipsImages.battleshipImageHorizontal, alt: 'battleship', classNote: 'battleship ship', width: 132}); 
    const battleshipContainer = Element.createElement({ tag: 'div', id: 'battleship__container', classNote: 'ships__container horizontal'}); 
    battleshipContainer.append(battleship);
    this.ShipControl.dragAndDropShip(battleship);
    listOfShips.append(battleshipContainer);
    const cruiserContainer = Element.createElement({ tag: 'div', id: 'cruiser__container', classNote: 'ships__container horizontal'});
    for (let i = 0; i < 2; i++) {
      const cruiser = Element.createImage({ src: defaultShipsImages.cruiserImageHorizontal, alt: 'cruiser', classNote: 'cruiser ship', width: 99});    
      this.ShipControl.dragAndDropShip(cruiser);
      cruiserContainer.append(cruiser);
    }
    const destroyerContainer = Element.createElement({ tag: 'div', id: 'destroyer__container', classNote: 'ships__container horizontal'});
    for (let i = 0; i < 3; i++) {
      const destroyer = Element.createImage({ src: defaultShipsImages.destroyerImageHorizontal, alt: 'destroyer', classNote: 'destroyer ship', width: 66});    
      this.ShipControl.dragAndDropShip(destroyer);
      destroyerContainer.append(destroyer);
    }
    const boatContainer = Element.createElement({ tag: 'div', id: 'boat__container', classNote: 'ships__container horizontal'});
    for (let i = 0; i < 4; i++) {
      const boat = Element.createImage({ src: defaultShipsImages.boatImageHorizontal, alt: 'boat', classNote: 'boat ship', width: 33});    
      this.ShipControl.dragAndDropShip(boat);
      boatContainer.append(boat);
    }
}
