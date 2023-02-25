import { StatusShip } from "../../types/enums";

export class AIGame {
  private coordinates: number[] = [];
  public woundShip: number[] = [];
  public isWound: boolean = false;
  private statusShip = StatusShip;
  public orientation: string = 'unknown';

  getRandomCoordinate(status: string) {
    let randomCoordinate = this.randomPosition();
    if (status === this.statusShip.wound || this.isWound) {
      this.woundShip.sort((a, b) => a-b);
      randomCoordinate = this.getPositionNearWound();
    }
    return randomCoordinate;
  }

  randomPosition() {
    let random = Math.floor(Math.random() * 100);
    if((document.getElementsByClassName('ourField')[random] as HTMLElement).style.background !== '') {
      random = this.randomPosition();
    }
    return random;
  }

  getPositionNearWound() {
    if (this.woundShip.length > 1) {
      if (this.woundShip[1] - this.woundShip[0] === 1) {
        this.orientation = 'horizontal';
      } else {
        this.orientation = 'vertical';
      }
    }
    let cells = document.getElementsByClassName('ourField') as HTMLCollectionOf<HTMLElement>;
    let lastWoundPosition = this.woundShip[this.woundShip.length - 1];
    let nextPosition = lastWoundPosition;
    if (this.orientation === 'unknown') {
      nextPosition = this.getPositionNearWoundHorizontally(cells, lastWoundPosition);
      if (nextPosition === lastWoundPosition) {
        nextPosition = this.getPositionNearWoundVertical(cells, lastWoundPosition);
      }
    } else {
      if (this.orientation === 'horizontal') {
        nextPosition = this.getPositionNearWoundHorizontally(cells, lastWoundPosition);
        if (nextPosition === lastWoundPosition) {
          lastWoundPosition = this.woundShip[0];
          nextPosition = this.getPositionNearWoundHorizontally(cells, lastWoundPosition);
        }
      } else {
        nextPosition = this.getPositionNearWoundVertical(cells, lastWoundPosition);
        if (nextPosition === lastWoundPosition) {
          lastWoundPosition = this.woundShip[0];
          nextPosition = this.getPositionNearWoundVertical(cells, lastWoundPosition);
        }
      }
    }
    return nextPosition;
  }

  getPositionNearWoundHorizontally(cells: HTMLCollectionOf<HTMLElement>, lastWoundPosition: number) {
    let nextPosition = lastWoundPosition;
    let status = false;
    if (cells[lastWoundPosition + 1] !== undefined && status === false) {
      if (cells[lastWoundPosition + 1].style.background === '' && (lastWoundPosition + 1) % 10 !== 0) {
        nextPosition = lastWoundPosition + 1;
        status = true;
      }
    }
    if (cells[lastWoundPosition - 1] !== undefined && status === false) {
      if (cells[lastWoundPosition - 1].style.background === '' && (lastWoundPosition - 1) % 10 !== 9) {
        nextPosition = lastWoundPosition - 1;
        status = true;
      }
    }
    return nextPosition;
  }

  getPositionNearWoundVertical(cells: HTMLCollectionOf<HTMLElement>, lastWoundPosition: number) {
    let nextPosition = lastWoundPosition;
    let status = false;
    if (cells[lastWoundPosition + 10] !== undefined && status === false) {
      if (cells[lastWoundPosition + 10].style.background === '') {
        nextPosition = lastWoundPosition + 10;
        status = true;
      }
    }
    if (cells[lastWoundPosition - 10] !== undefined && status === false) {
      if (cells[lastWoundPosition - 10].style.background === '') {
        nextPosition = lastWoundPosition - 10;
        status = true;
      }
    }
    return nextPosition;
  }
}