import { SmallBackground } from "../../types/interfaces";
import { Element } from "../element/element";

export class Field {
  public ss: string[] = [];

  createEmptyField() {
    const controlMenu = Element.createElement({ tag: 'div', classNote: 'controlMenu__container' });
    const circleArrow = Element.createImage({ src: '../../../assets/images/circle-arrow.png', alt: 'left-right', classNote: 'circleArrow', width: 150});
    const backShips = Element.createImage({ src: '../../../assets/images/trash.png', alt: 'trash', classNote: 'trash', width: 150 });
    const randomShips = Element.createImage({ src: '../../../assets/images/random.png', alt: 'random', classNote: 'random', width: 150 });
    const fieldContainer = Element.createElement({ tag: 'div', classNote: 'field__container' });
    const startButton = Element.createElement({ tag: 'button', id: 'startGame', content: 'Start Game'});
    startButton.addEventListener('click', () => {
      console.log(this.getShipsCoordinates());
    });
    circleArrow.addEventListener('click', () => {
      this.changeOrientationShips();
    });
    controlMenu.append(circleArrow, backShips, randomShips);
    document.getElementsByClassName('wrapper main__wrapper')[0].append(fieldContainer, startButton);
    const listOfShips = Element.createElement({ tag: 'div', id: 'list__shipsHorizontal' });
    const field = Element.createElement({ tag: 'div', id: 'field' });
    for (let i = 0; i < 100; i++) {
      const smallField = Element.createElement({ tag: 'div', classNote: 'field__small droppable' });
      field.append(smallField);
    }
    const heightShips = Element.createElement({ tag: 'div', id: 'heightShips' });
    fieldContainer.append(listOfShips, field, controlMenu);
    const battleship = Element.createImage({ src: '../../../assets/images/ships/default/battleshipHorizontal.png', alt: 'battleship', classNote: 'battleship ship', width: 132}); 
    const battleshipContainer = Element.createElement({ tag: 'div', id: 'battleship__container', classNote: 'ships__container horizontal'}); 
    battleshipContainer.append(battleship);
    this.dragAndDropShip(battleship);
    listOfShips.append(battleshipContainer);
    const cruiserContainer = Element.createElement({ tag: 'div', id: 'cruiser__container', classNote: 'ships__container horizontal'});
    for (let i = 0; i < 2; i++) {
      const cruiser = Element.createImage({ src: '../../../assets/images/ships/default/cruiserHorizontal.png', alt: 'cruiser', classNote: 'cruiser ship', width: 99});    
      this.dragAndDropShip(cruiser);
      cruiserContainer.append(cruiser);
    }
    const destroyerContainer = Element.createElement({ tag: 'div', id: 'destroyer__container', classNote: 'ships__container horizontal'});
    for (let i = 0; i < 3; i++) {
      const destroyer = Element.createImage({ src: '../../../assets/images/ships/default/destroyerHorizontal.png', alt: 'destroyer', classNote: 'destroyer ship', width: 66});    
      this.dragAndDropShip(destroyer);
      destroyerContainer.append(destroyer);
    }
    const boatContainer = Element.createElement({ tag: 'div', id: 'boat__container', classNote: 'ships__container horizontal'});
    for (let i = 0; i < 4; i++) {
      const boat = Element.createImage({ src: '../../../assets/images/ships/default/boatHorizontal.png', alt: 'boat', classNote: 'boat ship', width: 33});    
      this.dragAndDropShip(boat);
      boatContainer.append(boat);
    }
    listOfShips.append(cruiserContainer, destroyerContainer, boatContainer);
    backShips.addEventListener('click', () => {
      this.returnAllShips();
    });
    randomShips.addEventListener('click', () => {
      this.randomShipsGenerator();
    });
  }

  render() {
    this.createEmptyField();
  }

  changeOrientationShips() {
    let container = document.getElementById('list__shipsHorizontal');
    if (container === null) {
      container = document.getElementById('list__shipsVertical');
    }
    if (container !== null)
    if (container.id === 'list__shipsHorizontal') {
      this.changeOrientationToVertical();
      container.id = 'list__shipsVertical';
    } else {
      this.changeOrientationToHorizontal();
      container.id = 'list__shipsHorizontal';
    }
  }

  changeOrientationToVertical() {
    const vertical = 'vertical';
    const list = document.getElementById('list__shipsHorizontal');
      list?.childNodes.forEach((container) => {
      (container as HTMLElement).classList.remove('horizontal');
      (container as HTMLElement).classList.add('vertical');
      (container as HTMLElement).childNodes.forEach((item) => {
        let ship = item as HTMLImageElement;
        switch (ship.className) {
          case 'battleship ship':
            this.changeBattleship(vertical, ship);
            break;

          case 'cruiser ship':
            this.changeCruiser(vertical, ship);
            break;

          case 'destroyer ship':
            this.changeDestroyer(vertical, ship);
            break;

          case 'boat ship':
            this.changeBoat(vertical, ship);
            break;
        
          default:
            break;
        }
      })
    });
    if (list) {
      
    }
  }

  changeOrientationToHorizontal() {
    const horizontal = 'horizontal';
    const list = document.getElementById('list__shipsVertical');
    list?.childNodes.forEach((container) => {
      (container as HTMLElement).classList.remove('vertical');
      (container as HTMLElement).classList.add('horizontal');
    (container as HTMLElement).childNodes.forEach((item) => {
      let ship = item as HTMLImageElement;
      switch (ship.className) {
        case 'battleship ship':
          this.changeBattleship(horizontal, ship);
          break;

        case 'cruiser ship':
          this.changeCruiser(horizontal, ship);
          break;

        case 'destroyer ship':
          this.changeDestroyer(horizontal, ship);
          break;

        case 'boat ship':
          this.changeBoat(horizontal, ship);
          break;
      
        default:
          break;
      }
    })
  });
  }

  changeBattleship(orientation: string, ship: HTMLImageElement) {
    if (orientation === 'horizontal') {
      ship.src = '../../../assets/images/ships/default/battleshipHorizontal.png';
      ship.height = 33;
      ship.width = 132;
    } else {
      ship.src = '../../../assets/images/ships/default/battleshipVertical.png';
      ship.height = 132;
      ship.width = 33;
    }
  }

  changeCruiser(orientation: string, ship: HTMLImageElement) {
    if (orientation === 'horizontal') {
      ship.src = '../../../assets/images/ships/default/cruiserHorizontal.png';
      ship.height = 33;
      ship.width = 99;
    } else {
      ship.src = '../../../assets/images/ships/default/cruiserVertical.png';
      ship.height = 99;
      ship.width = 33;
    }
  }

  changeDestroyer(orientation: string, ship: HTMLImageElement) {
    if (orientation === 'horizontal') {
      ship.src = '../../../assets/images/ships/default/destroyerHorizontal.png';
      ship.height = 33;
      ship.width = 66;
    } else {
      ship.src = '../../../assets/images/ships/default/destroyerVertical.png';
      ship.height = 66;
      ship.width = 33;
    }
  }

  changeBoat(orientation: string, ship: HTMLImageElement) {
    if (orientation === 'horizontal') {
      ship.src = '../../../assets/images/ships/default/boatHorizontal.png';
    } else {
      ship.src = '../../../assets/images/ships/default/boatVertical.png';
    }
  }

  moveAt(img: HTMLImageElement, pageX: number, pageY: number, shiftX: number, shiftY: number) {
    img.style.left = pageX - shiftX + 'px';
    img.style.top = pageY - shiftY + 'px';
  }

  getOrientationShip(el: HTMLImageElement) {
    let heightShip = Math.floor(el.height);
    if (heightShip === 34) {heightShip = 33;}
    let widthShip = Math.floor(el.width);
    let orient: string = '';
    if (heightShip === widthShip) {
      orient = 'middle';
    }
    if (heightShip > widthShip) {
      orient = 'vertical';
    }
    if (heightShip < widthShip) {
      orient = 'horizontal';
    }
    let lengthShip = widthShip > heightShip ? widthShip / 33 : heightShip / 33;
    return {orient, lengthShip}
  }

  getShipsCoordinates() {
    let coordinatesOfShips: number[][] = [];
        let countSihps: number = -1;
        document.getElementById('field')?.childNodes.forEach((element, index) => {
          if ((element as HTMLElement).classList.contains('ship__active')) {
            if (element.hasChildNodes()) {
              coordinatesOfShips.push([]);
              countSihps += 1;
              let el = (element.firstChild as HTMLImageElement);
              //console.log(el)
              const OrientationShip = this.getOrientationShip(el);
              const orient = OrientationShip.orient;
              const lengthShip = OrientationShip.lengthShip;
              if (orient === 'middle') {
                coordinatesOfShips[countSihps].push(index);
              }
              if (orient === 'horizontal') {
                for (let i = 0; i < lengthShip; i++) {
                  coordinatesOfShips[countSihps].push(index + i);
                }
              }
              if (orient === 'vertical') {
                for (let i = 0; i < lengthShip; i++) {
                  coordinatesOfShips[countSihps].push(index + 10 * i);
                }
              }
            }
          }
        });
      return coordinatesOfShips;
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
          el = el.nextElementSibling as HTMLElement;
        }
        el.classList.remove('ship__active');
      }
  }
  }

  reverseShip(img: HTMLImageElement) {
    let temp = img.height;
    img.height = img.width;
    img.width = temp;
  }

  changeShipOrientationToVertical(img: HTMLImageElement) {
    this.reverseShip(img);
    if (img.classList.contains('battleship')) {
      img.src = '../../../assets/images/ships/default/battleshipVertical.png';
    }
    if (img.classList.contains('cruiser')) {
      img.src = '../../../assets/images/ships/default/cruiserVertical.png';
    }
    if (img.classList.contains('destroyer')) {
      img.src = '../../../assets/images/ships/default/destroyerVertical.png';
    }
    if (img.classList.contains('boat')) {
      img.src = '../../../assets/images/ships/default/boatVertical.png';
    }
  }

  changeShipOrientationToHorizontal(img: HTMLImageElement) {
    this.reverseShip(img);
    if (img.classList.contains('battleship')) {
      img.src = '../../../assets/images/ships/default/battleshipHorizontal.png';
    }
    if (img.classList.contains('cruiser')) {
      img.src = '../../../assets/images/ships/default/cruiserHorizontal.png';
    }
    if (img.classList.contains('destroyer')) {
      img.src = '../../../assets/images/ships/default/destroyerHorizontal.png';
    }
    if (img.classList.contains('boat')) {
      img.src = '../../../assets/images/ships/default/boatHorizontal.png';
    }
  }

  enterDroppableHorizontal(elem: HTMLElement, shipLength: number) {
    if (elem.style.boxShadow !== 'grey 0px 0px 4em 4em inset') {
      elem.style.boxShadow = 'grey 0px 0px 4em 4em inset';
      let el = elem.nextElementSibling as HTMLElement;
      for (let i = 0; i < shipLength - 1; i++) {
        if (el) {
          el.style.boxShadow = 'grey 0px 0px 4em 4em inset';
          el = el.nextElementSibling as HTMLElement;
        }
      }
    }
  }

  leaveDroppableHorizontal(elem: HTMLElement, shipLength: number) {
    if (elem.style.boxShadow == 'grey 0px 0px 4em 4em inset') {
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
    if (elem.style.boxShadow !== 'grey 0px 0px 4em 4em inset') {
      elem.style.boxShadow = 'grey 0px 0px 4em 4em inset';
      let el = elem as HTMLElement;
      for (let i = 0; i < shipLength - 1; i++) {
        for (let i = 0; i < 10; i++) {
          el = el.nextElementSibling as HTMLElement;
        }
        el.style.boxShadow = 'grey 0px 0px 4em 4em inset';
      }
    }
  }

  leaveDroppableVertical(elem: HTMLElement, shipLength: number) {
    if (elem.style.boxShadow == 'grey 0px 0px 4em 4em inset') {
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

  renderAroundShip() {
    document.getElementById('field')?.childNodes.forEach((element) => {
      (element as HTMLElement).style.background = '';
    });
    const coordinatesAroundShips = this.getShipsCoordinates();
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
    if (ship[0] < 9 && ship[0] + 1 !== 0 && ship[0] + ship.length - 2 !== 9) {
      ship.forEach((el) => {
        document.getElementById('field')?.childNodes.forEach((element, index) => {
          if (index === el) {
            (element as HTMLElement).style.background = 'pink';
          }
          if (index === el + 10) {
            (element as HTMLElement).style.background = 'pink';
          }
        });
      });
    } else
    if (ship[0] >= 90 && ship[0] !== 89 && (ship[0] + ship.length - 2) !== 99) {
      ship.forEach((el) => {
        document.getElementById('field')?.childNodes.forEach((element, index) => {
          if (index === el) {
            (element as HTMLElement).style.background = 'pink';
          }
          if (index === el - 10) {
            (element as HTMLElement).style.background = 'pink';
          }
        });
      });
    } else
    if (ship[0] % 10 === 9 && ship[0] !== -1 && ship[0] !== 89) {
      ship.forEach((el, ind) => {
        if (ind !== 0) {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = 'pink';
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
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = 'pink';
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
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = 'pink';
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
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = 'pink';
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
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = 'pink';
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
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = 'pink';
            }
          });
        }
      });
    }
    else {
      ship.forEach((el) => {
          document.getElementById('field')?.childNodes.forEach((element, index) => {
            if (index === el) {
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el - 10) {
              (element as HTMLElement).style.background = 'pink';
            }
            if (index === el + 10) {
              (element as HTMLElement).style.background = 'pink';
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
  (cellsShip[first] as HTMLElement).style.background = 'pink';
  (cellsShip[second] as HTMLElement).style.background = 'pink';
  (cellsShip[third] as HTMLElement).style.background = 'pink';
  (cellsShip[fourth] as HTMLElement).style.background = 'pink';
  if (fifth) {
    (cellsShip[fifth] as HTMLElement).style.background = 'pink';
  }
  if (sixth) {
    (cellsShip[sixth] as HTMLElement).style.background = 'pink';
  }
  if (seventh) {
    (cellsShip[seventh] as HTMLElement).style.background = 'pink';
  }
  if (eighth) {
    (cellsShip[eighth] as HTMLElement).style.background = 'pink';
  }
  if (ninth) {
    (cellsShip[ninth] as HTMLElement).style.background = 'pink';
  }
  }

  renderAroundShipVertical(ship: number[]) {
  const smallShip = ship[0];
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
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el + 1] as HTMLElement).style.background = 'pink';
    });
  } else
  if (smallShip === 9) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el - 1] as HTMLElement).style.background = 'pink';
    });
  } else
  if (ship[0] + (shipLength * 10) === 90) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el + 1] as HTMLElement).style.background = 'pink';
    });
  } else
  if (ship[0] + (shipLength * 10) === 99) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el - 1] as HTMLElement).style.background = 'pink';
    });
  } else
  if (smallShip > 0 && smallShip < 9) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el - 1] as HTMLElement).style.background = 'pink';
      (cellsShip[el + 1] as HTMLElement).style.background = 'pink';
    });
  } else
  if (ship[0] + (shipLength * 10) > 90 && ship[0] + (shipLength * 10) < 99) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el - 1] as HTMLElement).style.background = 'pink';
      (cellsShip[el + 1] as HTMLElement).style.background = 'pink';
    });
  } else
  if (ship[0] % 10 === 0) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el + 1] as HTMLElement).style.background = 'pink';
    });
  } else
  if (ship[0] % 10 === 9) {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el - 1] as HTMLElement).style.background = 'pink';
    });
  } else {
    ship.forEach((el) => {
      (cellsShip[el] as HTMLElement).style.background = 'pink';
      (cellsShip[el - 1] as HTMLElement).style.background = 'pink';
      (cellsShip[el + 1] as HTMLElement).style.background = 'pink';
    });
  }

  }

  deleteBackgroundAroundShip(element: HTMLElement, img: HTMLImageElement) {
    const deleteOrientation = this.getOrientationShip(img).orient;
    if (element !== null) {
      if (deleteOrientation === 'horizontal') {
        this.renderAroundShip()
      } else {
        this.renderAroundShip();
      }
    }
  }

  returnShip(img: HTMLImageElement) {
      
    img.style.position = 'relative';
    img.style.left = '0px';
    img.style.top = '0px';
    
    const orientationShip = this.getOrientationShip(img);
    if (document.getElementById('list__shipsVertical') && orientationShip.orient == 'horizontal') {
      this.changeShipOrientationToVertical(img);
    }
    if (document.getElementById('list__shipsHorizontal') && orientationShip.orient == 'vertical') {
      this.changeShipOrientationToHorizontal(img);
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
        this.renderAroundShip();
      }
    });
  }

  randomShipsGenerator() {
    let n = 0;
    for (let i = 0; i < 10; i++) {
    }
    this.setRandomBattleship();
  }

  setRandomBattleship() {
    this.returnAllShips();
    this.getRandomPositionBattleship();
    this.getRandomPositionCruiser();
    this.getRandomPositionDestroyer();
    this.getRandomPositionBoat();
  }

  getRandomOrientation() {
    const random = Math.floor(Math.random() * 2);
    return random === 0 ? 'horizontal' : 'vertical'
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
    if (orientation === 'horizontal') {
      this.changeBattleship(orientation, ship);
      this.addShipToFieldHorizontal(battleshipH, 4);
      battleshipH.append(ship);
      ship.style.position = 'relative';
    } else {
      this.changeBattleship(orientation, ship);
      this.addShipToFieldVertical(battleshipV, 4);
      battleshipV.append(ship);
      ship.style.position = 'relative';
    }
    this.renderAroundShip();
  }

  getRandomPositionCruiser() {
    const orientation = this.getRandomOrientation();
    for (let i = 0; i < 2; i++) {
      const ship = document.getElementsByClassName('cruiser')[0] as HTMLImageElement;
      let randomRowsHorizontal = Math.floor(Math.random() * 10);
      let randomRowsVertical = Math.floor(Math.random() * 8);
      let battleshipHorizontal = Math.floor(Math.random() * 8) + randomRowsHorizontal * 10;
      let battleshipVertical = Math.floor(Math.random() * 10) + randomRowsVertical * 10;
      const battleshipH = document.getElementsByClassName('droppable')[battleshipHorizontal] as HTMLElement;
      const battleshipV = document.getElementsByClassName('droppable')[battleshipVertical] as HTMLElement;
      if (orientation === 'horizontal') {
        if (this.checkToSet(battleshipHorizontal, 3, orientation) === false) {
          i--;
          continue;
        }
        this.changeCruiser(orientation, ship);
        this.addShipToFieldHorizontal(battleshipH, 3);
        battleshipH.append(ship);
        ship.style.position = 'relative';
        this.renderAroundShip();
      } else {
        if (this.checkToSet(battleshipVertical, 3, orientation) === false) {
          i--;
          continue;
        }
        this.changeCruiser(orientation, ship);
        this.addShipToFieldVertical(battleshipV, 3);
        battleshipV.append(ship);
        ship.style.position = 'relative';
        this.renderAroundShip();
      }
    }
  }

  getRandomPositionDestroyer() {
    const orientation = this.getRandomOrientation();
    for (let i = 0; i < 3; i++) {
      const ship = document.getElementsByClassName('destroyer')[0] as HTMLImageElement;
      let randomRowsHorizontal = Math.floor(Math.random() * 10);
      let randomRowsVertical = Math.floor(Math.random() * 9);
      let battleshipHorizontal = Math.floor(Math.random() * 9) + randomRowsHorizontal * 10;
      let battleshipVertical = Math.floor(Math.random() * 10) + randomRowsVertical * 10;
      const battleshipH = document.getElementsByClassName('droppable')[battleshipHorizontal] as HTMLElement;
      const battleshipV = document.getElementsByClassName('droppable')[battleshipVertical] as HTMLElement;
      if (orientation === 'horizontal') {
        if (this.checkToSet(battleshipHorizontal, 2, orientation) === false) {
          i--;
          continue;
        }
        this.changeDestroyer(orientation, ship);
        this.addShipToFieldHorizontal(battleshipH, 2);
        battleshipH.append(ship);
        ship.style.position = 'relative';
        this.renderAroundShip();
      } else {
        if (this.checkToSet(battleshipVertical, 2, orientation) === false) {
          i--;
          continue;
        }
        this.changeDestroyer(orientation, ship);
        this.addShipToFieldVertical(battleshipV, 2);
        battleshipV.append(ship);
        ship.style.position = 'relative';
        this.renderAroundShip();
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
      if (orientation === 'horizontal') {
        if (this.checkToSet(battleshipHorizontal, 1, orientation) === false) {
          i--;
          continue;
        }
        this.changeBoat(orientation, ship);
        this.addShipToFieldHorizontal(battleshipH, 1);
        battleshipH.append(ship);
        ship.style.position = 'relative';
        this.renderAroundShip();
      } else {
        if (this.checkToSet(battleshipVertical, 1, orientation) === false) {
          i--;
          continue;
        }
        this.changeBoat(orientation, ship);
        this.addShipToFieldVertical(battleshipV, 1);
        battleshipV.append(ship);
        ship.style.position = 'relative';
        this.renderAroundShip();
      }
    }
  }

  checkToSet(position: number, length: number, orientation: string) {
    let cells = document.getElementsByClassName('droppable');
    let checker = true;
    if ((cells[position] as HTMLElement).style.background === 'pink'){
      checker = false;
    }
    if (orientation === 'horizontal'){
      for (let i = 1; i < length; i++) {
        if ((cells[position + i] as HTMLElement).style.background === 'pink'){
          checker = false;
        }
      }
    } else {
      for (let i = 1; i < length; i++) {
        if ((cells[position + i * 10] as HTMLElement).style.background === 'pink'){
          checker = false;
        }
      }
    }
    
    return checker;
  }

  dragAndDropShip(img: HTMLImageElement) {
    let shiftX = 0;
    let shiftY = 0;
    
    
    const shipWidth = img.width / 33;
    const orientationDragAndDrop = this.getOrientationShip(img);
    let orientation: string;
    let currentDroppable: HTMLElement | null = null;
    img.onmousedown = (event) => {
      img.width >= 33 ? orientation = 'horizontal' : orientation = 'vertical';
      shiftX = event.clientX - img.getBoundingClientRect().left;
      shiftY = event.clientY - img.getBoundingClientRect().top;
      img.style.position = 'absolute';
      img.style.zIndex = '1000';

      this.moveAt(img, event.pageX, event.pageY, shiftX, shiftY);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onmouseup);
      let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
      let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
      if (orientation === 'horizontal') {
        this.removeShipFromFieldHorizontal(droppableBelow, orientationDragAndDrop.lengthShip);
      } else {
        this.removeShipFromFieldVertical(droppableBelow, orientationDragAndDrop.lengthShip);
      }
      this.deleteBackgroundAroundShip(droppableBelow, img);
    };

    const onMouseMove = (event: MouseEvent) => {
      const orientationMove = this.getOrientationShip(img);
      this.moveAt(img, event.pageX, event.pageY, shiftX, shiftY);
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
      if (orientationMove.orient === 'horizontal') {
        if (currentDroppable != droppableBelow || currentDroppable != rightDropp) {
          if (currentDroppable) {
            this.leaveDroppableHorizontal(currentDroppable, orientationMove.lengthShip);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable && rightDropp) {
            let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
            if (overShip.classList.contains('droppable')) {
              currentDroppable = overShip as HTMLElement;
            }
            this.enterDroppableHorizontal(currentDroppable, orientationMove.lengthShip);
          }
        }
      } else {
        if (currentDroppable != droppableBelow || currentDroppable != rightDropp) {
          if (currentDroppable) {
            this.leaveDroppableVertical(currentDroppable, orientationMove.lengthShip);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable && rightDropp) {
            let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
            if (overShip.classList.contains('droppable')) {
              currentDroppable = overShip as HTMLElement;
            }
            this.enterDroppableVertical(currentDroppable, orientationMove.lengthShip);
          }
        }
      }
      
    }

    const onmouseup = (event: MouseEvent) => {
      //const orientation = img.height > img.width ? 'vertical' : 'horizontal';
      const orientationMouseUp =  this.getOrientationShip(img);
      if (img.style.position === 'absolute') {
        document.removeEventListener('mousemove', onMouseMove);
        img.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
        img.hidden = false;
        let field: boolean | null = null;
        if (img.style.left > '0' && img.style.top > '0') {
          if (elemBelow.style.boxShadow == 'grey 0px 0px 4em 4em inset' && elemBelow.style.background !== 'pink') {
            field = true;
          }
          let newBelow = elemBelow;
          if (newBelow.classList.contains('ship')) {
            field = null;
          } else {
            if (orientationMouseUp.orient === 'horizontal') {
              for (let i = 0; i < orientationMouseUp.lengthShip; i++) {
                if (newBelow !== null) {
                  if ((newBelow as HTMLElement).style.background === 'pink') {
                    field = null;
                  }
                  newBelow = newBelow.nextElementSibling as HTMLElement;
                }
              }
            } else {
              for (let i = 0; i < orientationMouseUp.lengthShip; i++) {
                if (newBelow!== null) {
                  if (newBelow.classList.contains('droppable')) {
                    if ((newBelow as HTMLElement).style.background === 'pink') {
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
        if (orientationMouseUp.orient === 'horizontal') {
          if (field !== null) {
            elemBelow.append(img);
            img.style.position = 'relative';
            img.style.left = '0px';
            img.style.top = '0px';
            elemBelow.classList.add('newship');
            this.addShipToFieldHorizontal(elemBelow, orientationMouseUp.lengthShip);
            if (!elemBelow) return;
            elemBelow.classList.remove('newship');
            this.renderAroundShip();
            this.leaveDroppableHorizontal(elemBelow, orientationMouseUp.lengthShip);
          } else {
            let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
            if (droppableBelow !== null) {
              let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
              if (overShip.classList.contains('droppable')) {
                droppableBelow = overShip as HTMLElement;
              }
              this.leaveDroppableHorizontal(droppableBelow, orientationMouseUp.lengthShip);
            }
            this.returnShip(img);
          }
        } else {
          if (field !== null) {
            elemBelow.append(img);
            img.style.position = 'relative';
            img.style.left = '0px';
            img.style.top = '0px';
            elemBelow.classList.add('newship');
            this.addShipToFieldVertical(elemBelow, orientationMouseUp.lengthShip);
            if (!elemBelow) return;
            elemBelow.classList.remove('newship');
            this.renderAroundShip();
            this.leaveDroppableVertical(elemBelow, orientationMouseUp.lengthShip);
          } else {
            let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
            if (droppableBelow !== null) {
              let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
              if (overShip.classList.contains('droppable')) {
                droppableBelow = overShip as HTMLElement;
              }
              this.leaveDroppableVertical(droppableBelow, orientationMouseUp.lengthShip);
            }
            this.returnShip(img);
          }
        }
      }
    }

    img.ondragstart = function() {
      return false;
    };
  }
}