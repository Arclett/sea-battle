import { color, orientation } from "../../types/enums";
import { SmallBackground } from "../../types/interfaces";
import { OrientationOfShips } from "./orientationOfShips";
import { ShipsCoordinates } from "./shipsCoordinates";

export class BackgroundAroundShips{
  private horizontal: string = orientation.horizontal;
  private shipCoordinates = new ShipsCoordinates();
  private orientationOfShip = new OrientationOfShips();
  public backgroundAroundShips: number [][] = [];
  public backgroundAroundShip: string = color.backgroundAroundShip;
  public backgroundUnderShip: string = color.backgroundUnderShip;

  renderAroundShip() {
    document.getElementById('field')?.childNodes.forEach((element) => {
      (element as HTMLElement).style.background = '';
    });
    this.backgroundAroundShips = [];
    const coordinatesAroundShips = this.shipCoordinates.getShipsCoordinates().coordinatesOfShips;
    coordinatesAroundShips.forEach((ship) => {
      if (ship[1] === ship[0] + 1) {
        ship.unshift(ship[0] - 1);
        ship.push(ship[ship.length - 1] + 1);
        this.renderAroundShipHorizontal(ship);
      } else if (ship.length === 1) {
        this.renderAroundSmallShip(ship);
      } else {
        this.renderAroundShipVertical(ship);
      }
    });
  }

  renderAroundShipHorizontal(ship: number[]) {
    this.backgroundAroundShips.push([]);
    if (ship[0] < 9 && ship[0] + 1 !== 0 && ship[0] + ship.length - 2 !== 9) {
      ship.forEach((el) => {
        document.getElementById('field')?.childNodes.forEach((element, index) => {
          if (index === el) {
            (element as HTMLElement).style.background = this.backgroundAroundShip;
            this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
          }
          if (index === el + 10) {
            (element as HTMLElement).style.background = this.backgroundAroundShip;
            this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 10);
          }
        });
      });
    } else
    if (ship[0] >= 90 && ship[0] !== 89 && (ship[0] + ship.length - 2) !== 99) {
      ship.forEach((el) => {
        document.getElementById('field')?.childNodes.forEach((element, index) => {
          if (index === el) {
            (element as HTMLElement).style.background = this.backgroundAroundShip;
            this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
          }
          if (index === el - 10) {
            (element as HTMLElement).style.background = this.backgroundAroundShip;
            this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 10);
          }
        });
      });
    } else
    if (ship[0] % 10 === 9 && ship[0] !== -1 && ship[0] !== 89) {
      ship.forEach((el, ind) => {
        if (ind !== 0) {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 10);
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 10);
            }
          });
        }
      });
    } else
    if ((ship[0] + ship.length - 2) % 10 === 9 && ship[0] + ship.length - 2 !== 9 && ship[0] + ship.length - 2 !== 99) {
      ship.forEach((el, ind) => {
        if (ind !== ship.length - 1) {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 10);
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 10);
            }
          });
        }
      });
    } else 
    if (ship[0] + 1 === 0) {
      ship.forEach((el, ind) => {
        if (ind !== 0) {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 10);
            }
          });
        }
      });
    } else
    if (ship[0] + ship.length - 2 === 9) {
      ship.forEach((el, ind) => {
        if (ind !== ship.length - 1) {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 10);
            }
          });
        }
      });
    } else
    if (ship[0] === 89) {
      ship.forEach((el, ind) => {
        if (ind !== 0) {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 10);
            }
          });
        }
      });
    } else
    if (ship[0] + ship.length - 2 === 99) {
      ship.forEach((el, ind) => {
        if (ind !== ship.length - 1) {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 10);
            }
          });
        }
      });
    }
    else {
      ship.forEach((el) => {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 10);
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = this.backgroundAroundShip;
              this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 10);
            }
          });
      });
    }
  }

  renderAroundSmallShip(ship: number[]) {
  const smallShip = ship[0];
  if (smallShip === 0) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip + 1,
      third: smallShip + 10,
      fourth: smallShip + 11,
    });
  } else
  if (smallShip === 9) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip - 1,
      third: smallShip + 10,
      fourth: smallShip + 9,
    });
  } else
  if (smallShip === 90) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip + 1,
      third: smallShip - 10,
      fourth: smallShip - 9,
    });
  }else
  if (smallShip === 99) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip - 1,
      third: smallShip - 10,
      fourth: smallShip - 11,
    });
  } else
  if (smallShip > 0 && smallShip < 9) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip + 1,
      third: smallShip - 1,
      fourth: smallShip + 10,
      fifth: smallShip + 9,
      sixth: smallShip + 11,
    });
  } else
  if (smallShip > 90 && smallShip < 99) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip + 1,
      third: smallShip - 1,
      fourth: smallShip - 10,
      fifth: smallShip - 9,
      sixth: smallShip - 11,
    });
  } else
  if (smallShip % 10 === 0) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip + 1,
      third: smallShip - 9,
      fourth: smallShip - 10,
      fifth: smallShip + 10,
      sixth: smallShip + 11,
    });
  } else
  if (smallShip % 10 === 9) {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip - 1,
      third: smallShip + 9,
      fourth: smallShip - 10,
      fifth: smallShip + 10,
      sixth: smallShip - 11,
    });
  } else {
    this.addBackgroundAroundSmallShip({
      first: smallShip,
      second: smallShip - 1,
      third: smallShip + 1,
      fourth: smallShip - 9,
      fifth: smallShip + 9,
      sixth: smallShip - 10,
      seventh: smallShip + 10,
      eighth: smallShip - 11,
      ninth: smallShip + 11,
    });
  }
  }

  addBackgroundAroundSmallShip({first, second, third, fourth, fifth, sixth, seventh, eighth, ninth}: SmallBackground) {
    const cellsShip = document.getElementsByClassName('droppable');
    this.backgroundAroundShips.push([]);
    (cellsShip[first] as HTMLElement).style.background = this.backgroundAroundShip;
    this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(first);
    (cellsShip[second] as HTMLElement).style.background = this.backgroundAroundShip;
    this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(second);
    (cellsShip[third] as HTMLElement).style.background = this.backgroundAroundShip;
    this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(third);
    (cellsShip[fourth] as HTMLElement).style.background = this.backgroundAroundShip;
    this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(fourth);
    if (fifth) {
      (cellsShip[fifth] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(fifth);
    }
    if (sixth) {
      (cellsShip[sixth] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(sixth);
    }
    if (seventh) {
      (cellsShip[seventh] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(seventh);
    }
    if (eighth || eighth === 0) {
      (cellsShip[eighth] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(eighth);
    }
    if (ninth) {
      (cellsShip[ninth] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(ninth);
    }
  }

  renderAroundShipVertical(ship: number[]) {
  const smallShip = ship[0];
  this.backgroundAroundShips.push([]);
  const shipLength = ship.length;
  if (smallShip > 9) {
    ship.unshift(ship[0] - 10);
  }
  if (smallShip < 100 - ((ship.length - 1) * 10)) {
    ship.push(ship[ship.length - 1] + 10);
  }
  const cellsShip = document.getElementsByClassName('droppable');
  //console.log(shipLength)
  if (smallShip === 0) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el + 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 1);
    });
  } else
  if (smallShip === 9) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el - 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 1);
    });
  } else
  if (ship[0] + (shipLength * 10) === 90) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el + 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 1);
    });
  } else
  if (ship[0] + (shipLength * 10) === 99) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el - 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 1);
    });
  } else
  if (smallShip > 0 && smallShip < 9) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el - 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 1);
      (cellsShip[el + 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 1);
    });
  } else
  if (ship[0] + (shipLength * 10) > 90 && ship[0] + (shipLength * 10) < 99) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el - 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 1);
      (cellsShip[el + 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 1);
    });
  } else
  if (ship[0] % 10 === 0) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el + 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 1);
    });
  } else
  if (ship[0] % 10 === 9) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el - 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 1);
    });
  } else {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el);
      (cellsShip[el - 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el - 1);
      (cellsShip[el + 1] as HTMLElement).style.background = this.backgroundAroundShip;
      this.backgroundAroundShips[this.backgroundAroundShips.length - 1].push(el + 1);
    });
  }

  }

  deleteBackgroundAroundShip(element: HTMLElement, img: HTMLImageElement) {
    const deleteOrientation = this.orientationOfShip.getOrientationShip(img).orient;
    if (element !== null) {
      if (deleteOrientation === this.horizontal) {
        this.renderAroundShip()
      } else {
        this.renderAroundShip();
      }
    }
  }
}