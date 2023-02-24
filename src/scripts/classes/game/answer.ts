import { BackgroundAttack, StatusShip } from "../../types/enums";
import { Element } from "../element/element";
import { BackgroundAroundShips } from "../field/backgroundAroundShips";
import { ShipsCoordinates } from "../field/shipsCoordinates";

export class Answer {
  private wound = BackgroundAttack.wound;
  private miss = BackgroundAttack.miss;
  private statusMiss = StatusShip.miss;
  private statusWound = StatusShip.wound;
  private statusDead = StatusShip.dead;
  private woundShips: number[] = [];
  private deadShips: number[][] = [];
  private woundShipsWithBackgraund: number[][] = [];
  private countDeadShips: number = 0;
  private countShips: number = 0;
  private backgroundAroundShip = new BackgroundAroundShips();
  private backgroundWound: number[] = [];

  render(status: string, numberOfCell: number, whoIsAttack: string) {
    let field: string = '';
    if (whoIsAttack === 'Our') {
      field = 'enemyField';
    } else {
      field = 'ourField';
    }
    const cell = document.getElementsByClassName(field)[numberOfCell] as HTMLElement;
    const emptydiv = Element.createElement({ tag: 'div'});
    switch (status) {
      case this.statusMiss:
        cell.style.background = this.miss;
        break;
      case this.statusWound:
        cell.style.background = this.wound;
        break;
      case this.statusDead:
        cell.style.background = this.wound;
        if (whoIsAttack === 'Our') {
          this.deadShips.push([]);
          this.addDeadShips(numberOfCell);
          this.countDeadShips += 1;
          this.addShipsBack(1);
          this.renderAroundShip();
          this.renderDeadShips();
        } else {
          this.addShipsBack(0);
        }
        break;
      default:
        break;
    }
  }

  addDeadShips(numberOfCell: number) {
    let cells = document.getElementsByClassName('enemyField') as HTMLCollectionOf<HTMLElement>;
    this.deadShips[this.countDeadShips].push(numberOfCell);
    if (cells[numberOfCell + 1] !== undefined) {
      if ((cells[numberOfCell + 1].style.background === this.wound) && !this.deadShips[this.countDeadShips].includes(numberOfCell + 1)) {
        this.addDeadShips(numberOfCell + 1);
      }
    }
    if (cells[numberOfCell - 1] !== undefined) {
      if (cells[numberOfCell - 1].style.background === this.wound && !this.deadShips[this.countDeadShips].includes(numberOfCell - 1)) {
        this.addDeadShips(numberOfCell - 1);
      }
    }
    if (cells[numberOfCell + 10] !== undefined) {
      if (cells[numberOfCell + 10].style.background === this.wound && !this.deadShips[this.countDeadShips].includes(numberOfCell + 10)) {
        this.addDeadShips(numberOfCell + 10);
      }
    }
    if (cells[numberOfCell - 10] !== undefined) {
      if (cells[numberOfCell - 10].style.background === this.wound && !this.deadShips[this.countDeadShips].includes(numberOfCell - 10)) {
        this.addDeadShips(numberOfCell - 10);
      }
    }
  }

  renderDeadShips() {
    this.deadShips.forEach((deadShip) => {
      deadShip.forEach((numberOfCell) => {
        const cell = document.getElementsByClassName('enemyField')[numberOfCell] as HTMLElement;
        if (cell !== undefined) {
          cell.style.background = this.wound;
        }
      });
    });
  }

  addShipsBack(numberField: number) {
    this.woundShipsWithBackgraund = [];
    this.deadShips.forEach((ship, index) =>{
      this.woundShipsWithBackgraund.push([]);
      ship.forEach((cell) => {
        this.woundShipsWithBackgraund[index].push(cell);
      });
    });
    this.woundShipsWithBackgraund.forEach((ship, index) =>{
      ship.sort((a, b) => a-b);
    });
  }

  checkNextCell(index: number) {
    let newIndex = index;
    if (document.getElementsByClassName('enemyField')[index + 1] !== undefined){
      if ((document.getElementsByClassName('enemyField')[index + 1] as HTMLElement).style.background === this.wound) {
        newIndex += 1;
        this.woundShipsWithBackgraund[this.countShips].push(newIndex);
      }
    }
    if (document.getElementsByClassName('enemyField')[index + 10] !== undefined){
      if ((document.getElementsByClassName('enemyField')[index + 10] as HTMLElement).style.background === this.wound) {
        newIndex += 10;
        this.woundShipsWithBackgraund[this.countShips].push(newIndex);
      }
    }
    if (newIndex !== index) {
      this.checkNextCell(newIndex);
    }
  }

  renderAroundShip() {
    this.backgroundAroundShip.backgroundAroundShip = this.miss;
      this.woundShipsWithBackgraund.forEach((ship) => {
        if (ship[1] === ship[0] + 1) {
          ship.unshift(ship[0] - 1);
          ship.push(ship[ship.length - 1] + 1);
          this.backgroundAroundShip.renderAroundShipHorizontal(ship);
        } else if (ship.length === 1) {
          this.backgroundAroundShip.renderAroundSmallShip(ship);
        } else {
          this.backgroundAroundShip.renderAroundShipVertical(ship);
        }
      });
    console.log(this.woundShipsWithBackgraund);
  }

  renderAroundOurDeadShip(ship: number []) {
    ship.sort((a, b) => a-b);
    let orientation = 'unknown';
    if (ship.length > 1) {
      if ((ship[1] - ship[0]) === 1) {
        orientation = 'horizontal';
      } else {
        orientation = 'vertical';
      }
    }
    
    if (orientation === 'horizontal') {
      this.renderAroundOurDeadShipHorizzontal(ship);
    }
    if (orientation === 'vertical') {
      this.renderAroundOurDeadShipVertical(ship)
    }
    if (orientation === 'unknown') {
      this.renderAroundOurDeadShipHorizzontal(ship);
    }
  }

  renderAroundOurDeadShipHorizzontal(ship: number []) {
    let left = true;
    let right = true;
    let cells = document.getElementsByClassName('ourField') as HTMLCollectionOf<HTMLElement>;
    if (cells[ship[ship.length - 1] + 1] !== undefined && (ship[ship.length - 1] + 1) % 10 !== 0) {
      cells[ship[ship.length - 1] + 1].style.background = this.miss;
    }
    if (cells[ship[0] - 1] !== undefined && (ship[0] - 1) % 10 !== 9) {
      cells[ship[0] - 1].style.background = this.miss;
    }
    //ship.unshift(ship[0] - 1);
    if (!((ship[0] - 1) % 10 === 9)) {
      if(cells[ship[0] - 1]) {
        cells[ship[0] - 1].style.background = this.miss;
      }
      if (cells[ship[0] - 11]) {
        cells[ship[0] - 11].style.background = this.miss;
      }
      if (cells[ship[0] + 9]) {
        cells[ship[0] + 9].style.background = this.miss;
      }
    }
    //ship.push(ship[ship.length - 1] + 1);
    if (!((ship[ship.length - 1] + 1) % 10 === 0)) {
      if (cells[ship[ship.length - 1] + 1]) {
        cells[ship[ship.length - 1] + 1].style.background = this.miss;
      }
      if (cells[ship[ship.length - 1] - 9]) {
        cells[ship[ship.length - 1] - 9].style.background = this.miss;
      }
      
      if (cells[ship[ship.length - 1] + 11]) {
        cells[ship[ship.length - 1] + 11].style.background = this.miss;
      }
    }
    ship.forEach((cell, index) => {
      if (cells[cell - 10] !== undefined) {
        cells[cell - 10].style.background = this.miss;
      }
      if (cells[cell + 10] !== undefined) {
        cells[cell + 10].style.background = this.miss;
      }
    });
  }

  renderAroundOurDeadShipVertical(ship: number []) {
    let cells = document.getElementsByClassName('ourField') as HTMLCollectionOf<HTMLElement>;
    if (cells[ship[ship.length - 1] + 10] !== undefined) {
      cells[ship[ship.length - 1] + 10].style.background = this.miss;
    }
    if (cells[ship[0] - 10] !== undefined) {
      cells[ship[0] - 10].style.background = this.miss;
    }
    ship.unshift(ship[0] - 10);
    ship.push(ship[ship.length - 1] + 10);
    ship.forEach((cell) => {
      if (cells[cell - 1] !== undefined && (cell - 1) % 10 !== 9) {
        cells[cell - 1].style.background = this.miss;
      }
      if (cells[cell + 1] !== undefined && (cell + 1) % 10 !== 0) {
        cells[cell + 1].style.background = this.miss;
      }
    });
  }

  renderAroundOurDeadShipMiddle(ship: number []) {

  }
}