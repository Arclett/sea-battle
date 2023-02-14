import { color, orientation } from "../../types/enums";
import { BackgroundAroundShips } from "./backgroundAroundShips";
import { OrientationOfShips } from "./orientationOfShips";
import { ShipsInField } from "./shipsInField";

export class RandomShips {
  private horizontal: string = orientation.horizontal;
  private vertical: string = orientation.vertical;
  private shipInField = new ShipsInField();
  private orientationOfShip = new OrientationOfShips();
  private backgroundAroundShip = new BackgroundAroundShips();

  setRandomBattleship() {
    this.shipInField.returnAllShips();
    this.getRandomPositionBattleship();
    this.getRandomPositionCruiser();
    this.getRandomPositionDestroyer();
    this.getRandomPositionBoat();
  }

  getRandomOrientation() {
    const random = Math.floor(Math.random() * 2);
    return random === 0 ? this.horizontal : this.vertical
  }

  getRandomPositionBattleship() {
    const orientation = this.getRandomOrientation();
    const ship = document.getElementsByClassName('battleship')[0] as HTMLImageElement;
    let randomRowsHorizontal = Math.floor(Math.random() * 10);
    let randomRowsVertical = Math.floor(Math.random() * 7);
    let battleshipHorizontal = Math.floor(Math.random() * 7) + randomRowsHorizontal * 10;
    let battleshipVertical = Math.floor(Math.random() * 10) + randomRowsVertical * 10;
    const battleshipH = document.getElementsByClassName('droppable')[battleshipHorizontal] as HTMLElement;
    const battleshipV = document.getElementsByClassName('droppable')[battleshipVertical] as HTMLElement;
    if (orientation === this.horizontal) {
      this.orientationOfShip.changeBattleship(orientation, ship);
      this.shipInField.addShipToFieldHorizontal(battleshipH, 4);
      battleshipH.append(ship);
      ship.style.position = 'relative';
    } else {
      this.orientationOfShip.changeBattleship(orientation, ship);
      this.shipInField.addShipToFieldVertical(battleshipV, 4);
      battleshipV.append(ship);
      ship.style.position = 'relative';
    }
    this.backgroundAroundShip.renderAroundShip();
  }

  getRandomPositionCruiser() {
    for (let i = 0; i < 2; i++) {
      const orientation = this.getRandomOrientation();
      const ship = document.getElementsByClassName('cruiser')[0] as HTMLImageElement;
      let randomRowsHorizontal = Math.floor(Math.random() * 10);
      let randomRowsVertical = Math.floor(Math.random() * 8);
      let battleshipHorizontal = Math.floor(Math.random() * 8) + randomRowsHorizontal * 10;
      let battleshipVertical = Math.floor(Math.random() * 10) + randomRowsVertical * 10;
      const battleshipH = document.getElementsByClassName('droppable')[battleshipHorizontal] as HTMLElement;
      const battleshipV = document.getElementsByClassName('droppable')[battleshipVertical] as HTMLElement;
      if (orientation === this.horizontal) {
        if (this.checkToSet(battleshipHorizontal, 3, orientation) === false) {
          i--;
          continue;
        }
        this.orientationOfShip.changeCruiser(orientation, ship);
        this.shipInField.addShipToFieldHorizontal(battleshipH, 3);
        battleshipH.append(ship);
        ship.style.position = 'relative';
        this.backgroundAroundShip.renderAroundShip();
      } else {
        if (this.checkToSet(battleshipVertical, 3, orientation) === false) {
          i--;
          continue;
        }
        this.orientationOfShip.changeCruiser(orientation, ship);
        this.shipInField.addShipToFieldVertical(battleshipV, 3);
        battleshipV.append(ship);
        ship.style.position = 'relative';
        this.backgroundAroundShip.renderAroundShip();
      }
    }
  }

  getRandomPositionDestroyer() {
    for (let i = 0; i < 3; i++) {
      const orientation = this.getRandomOrientation();
      const ship = document.getElementsByClassName('destroyer')[0] as HTMLImageElement;
      let randomRowsHorizontal = Math.floor(Math.random() * 10);
      let randomRowsVertical = Math.floor(Math.random() * 9);
      let battleshipHorizontal = Math.floor(Math.random() * 9) + randomRowsHorizontal * 10;
      let battleshipVertical = Math.floor(Math.random() * 10) + randomRowsVertical * 10;
      const battleshipH = document.getElementsByClassName('droppable')[battleshipHorizontal] as HTMLElement;
      const battleshipV = document.getElementsByClassName('droppable')[battleshipVertical] as HTMLElement;
      if (orientation === this.horizontal) {
        if (this.checkToSet(battleshipHorizontal, 2, orientation) === false) {
          i--;
          continue;
        }
        this.orientationOfShip.changeDestroyer(orientation, ship);
        this.shipInField.addShipToFieldHorizontal(battleshipH, 2);
        battleshipH.append(ship);
        ship.style.position = 'relative';
        this.backgroundAroundShip.renderAroundShip();
      } else {
        if (this.checkToSet(battleshipVertical, 2, orientation) === false) {
          i--;
          continue;
        }
        this.orientationOfShip.changeDestroyer(orientation, ship);
        this.shipInField.addShipToFieldVertical(battleshipV, 2);
        battleshipV.append(ship);
        ship.style.position = 'relative';
        this.backgroundAroundShip.renderAroundShip();
      }
    }
  }

  getRandomPositionBoat() {
    const orientation = this.getRandomOrientation();
    for (let i = 0; i < 4; i++) {
      const ship = document.getElementsByClassName('boat')[0] as HTMLImageElement;
      let randomRowsHorizontal = Math.floor(Math.random() * 10);
      let randomRowsVertical = Math.floor(Math.random() * 10);
      let battleshipHorizontal = Math.floor(Math.random() * 10) + randomRowsHorizontal * 10;
      let battleshipVertical = Math.floor(Math.random() * 10) + randomRowsVertical * 10;
      const battleshipH = document.getElementsByClassName('droppable')[battleshipHorizontal] as HTMLElement;
      const battleshipV = document.getElementsByClassName('droppable')[battleshipVertical] as HTMLElement;
      if (orientation === this.horizontal) {
        if (this.checkToSet(battleshipHorizontal, 1, orientation) === false) {
          i--;
          continue;
        }
        this.orientationOfShip.changeBoat(orientation, ship);
        this.shipInField.addShipToFieldHorizontal(battleshipH, 1);
        battleshipH.append(ship);
        ship.style.position = 'relative';
        this.backgroundAroundShip.renderAroundShip();
      } else {
        if (this.checkToSet(battleshipVertical, 1, orientation) === false) {
          i--;
          continue;
        }
        this.orientationOfShip.changeBoat(orientation, ship);
        this.shipInField.addShipToFieldVertical(battleshipV, 1);
        battleshipV.append(ship);
        ship.style.position = 'relative';
        this.backgroundAroundShip.renderAroundShip();
      }
    }
  }

  checkToSet(position: number, length: number, orientation: string) {
    let cells = document.getElementsByClassName('droppable');
    let checker = true;
    if ((cells[position] as HTMLElement).style.background === color.backgroundAroundShip){
      checker = false;
    }
    if (orientation === this.horizontal){
      for (let i = 1; i < length; i++) {
        if ((cells[position + i] as HTMLElement).style.background === color.backgroundAroundShip){
          checker = false;
        }
      }
    } else {
      for (let i = 1; i < length; i++) {
        if ((cells[position + i * 10] as HTMLElement).style.background === color.backgroundAroundShip){
          checker = false;
        }
      }
    }
    
    return checker;
  }
}