import { Element } from "../element/element";

export class Field {
  public ss: string[] = [];

  createEmptyField() {
    const controlMenu = Element.createElement({ tag: 'div', classNote: 'controlMenu__container' });
    const circleArrow = Element.createImage({ src: '../../../assets/images/circle-arrow.png', alt: 'left-right', classNote: 'circleArrow', width: 150})
    const fieldContainer = Element.createElement({ tag: 'div', classNote: 'field__container' });
    circleArrow.addEventListener('click', this.changeOrientationShips);
    controlMenu.appendChild(circleArrow);
    document.getElementsByClassName('wrapper main__wrapper')[0].append(fieldContainer, controlMenu);
    const listOfShips = Element.createElement({ tag: 'div', id: 'list__shipsHorizontal' });
    const field = Element.createElement({ tag: 'div', id: 'field' });
    for (let i = 0; i < 100; i++) {
      const smallField = Element.createElement({ tag: 'div', classNote: 'field__small droppable' });
      field.append(smallField);
    }
    const heightShips = Element.createElement({ tag: 'div', id: 'heightShips' });
    fieldContainer.append(listOfShips, field, heightShips);
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
  }

  render() {
    this.createEmptyField();
  }

  changeOrientationShips() {
    //console.log(document.getElementById('list__shipsHorizontal'));
    
    let container = document.getElementById('list__shipsHorizontal');
    if (container === null) {
      container = document.getElementById('list__shipsVertical');
    }
    if (container !== null)
    if (container.id === 'list__shipsHorizontal') {
      changeOrientationToVertical();
      container.id = 'list__shipsVertical';
    } else {
      //console.log('asd')
      changeOrientationToHorizontal();
      container.id = 'list__shipsHorizontal';
    }

    function changeOrientationToVertical() {
      const vertical = 'vertical';
      const list = document.getElementById('list__shipsHorizontal');
        list?.childNodes.forEach((container) => {
        (container as HTMLElement).classList.remove('horizontal');
        (container as HTMLElement).classList.add('vertical');
        (container as HTMLElement).childNodes.forEach((item) => {
          let ship = item as HTMLImageElement;
          switch (ship.className) {
            case 'battleship ship':
              changeBattleship(vertical, ship);
              break;

            case 'cruiser ship':
              changeCruiser(vertical, ship);
              break;

            case 'destroyer ship':
              changeDestroyer(vertical, ship);
              break;

            case 'boat ship':
              changeBoat(vertical, ship);
              break;
          
            default:
              break;
          }
        })
      });
      if (list) {
        
      }
    }

    function changeOrientationToHorizontal() {
      const horizontal = 'horizontal';
      const list = document.getElementById('list__shipsVertical');
      list?.childNodes.forEach((container) => {
        (container as HTMLElement).classList.remove('vertical');
        (container as HTMLElement).classList.add('horizontal');
      (container as HTMLElement).childNodes.forEach((item) => {
        let ship = item as HTMLImageElement;
        switch (ship.className) {
          case 'battleship ship':
            changeBattleship(horizontal, ship);
            break;

          case 'cruiser ship':
            changeCruiser(horizontal, ship);
            break;

          case 'destroyer ship':
            changeDestroyer(horizontal, ship);
            break;

          case 'boat ship':
            changeBoat(horizontal, ship);
            break;
        
          default:
            break;
        }
      })
    });
    }

    function changeBattleship(orientation: string, ship: HTMLImageElement) {
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

    function changeCruiser(orientation: string, ship: HTMLImageElement) {
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

    function changeDestroyer(orientation: string, ship: HTMLImageElement) {
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

    function changeBoat(orientation: string, ship: HTMLImageElement) {
      if (orientation === 'horizontal') {
        ship.src = '../../../assets/images/ships/default/boatHorizontal.png';
      } else {
        ship.src = '../../../assets/images/ships/default/boatVertical.png';
      }
    }
  }

  

  dragAndDropShip(img: HTMLImageElement) {
    let shiftX = 0;
    let shiftY = 0;
    
    
    const shipWidth = img.width / 33;
    let orientation: string;
    let currentDroppable: HTMLElement | null = null;
    img.onmousedown = (event) => {
      img.width > 33 ? orientation = 'horizontal' : orientation = 'vertical';
      shiftX = event.clientX - img.getBoundingClientRect().left;
      shiftY = event.clientY - img.getBoundingClientRect().top;
      img.style.position = 'absolute';
      img.style.zIndex = '1000';

      //document.body.append(img);
      moveAt(event.pageX, event.pageY);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onmouseup);
      let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
      let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
      //console.log(droppableBelow);
      if (orientation === 'horizontal') {
        removeShipFromFieldHorizontal(droppableBelow);
      } else {
        removeShipFromFieldVertical(droppableBelow);
      }
      //console.log(droppableBelow);
      deleteBackgroundAroundShip(droppableBelow);
    };

    function moveAt(pageX: number, pageY: number) {
      img.style.left = pageX - shiftX + 'px';
      img.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      //const orientation = img.height > img.width ? 'vertical' : 'horizontal';
      moveAt(event.pageX, event.pageY);
      img.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
      //console.log()
      let right = document.elementFromPoint(img.width + +img.style.left.slice(0, -2) - 16, img.height + +img.style.top.slice(0, -2) - 16) as HTMLElement;

      let rightDropp = null;
      if (event.pageX > 16 && event.pageY > 16) {
        rightDropp = right.closest('.droppable') as HTMLElement;
      }

      img.hidden = false;
      
      if (!elemBelow) return;
      let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
      if (orientation === 'horizontal') {
        if (currentDroppable != droppableBelow || currentDroppable != rightDropp) {
          if (currentDroppable) {
            leaveDroppableHorizontal(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable && rightDropp) {
            let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
            if (overShip.classList.contains('droppable')) {
              currentDroppable = overShip as HTMLElement;
            }
            enterDroppableHorizontal(currentDroppable);
          }
        }
      } else {
        if (currentDroppable != droppableBelow || currentDroppable != rightDropp) {
          if (currentDroppable) {
            leaveDroppableVertical(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable && rightDropp) {
            let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
            if (overShip.classList.contains('droppable')) {
              currentDroppable = overShip as HTMLElement;
            }
            enterDroppableVertical(currentDroppable);
          }
        }
      }
      
    }

    function changePositionUnderShip(event: MouseEvent) {
      let el: HTMLElement | null = null;
      let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
      if (overShip.classList.contains('droppable')) {
        el = overShip as HTMLElement;
      }
      return el;
    }

    function onmouseup(event: MouseEvent) {
      //const orientation = img.height > img.width ? 'vertical' : 'horizontal';
      if (img.style.position === 'absolute') {
        document.removeEventListener('mousemove', onMouseMove);
        img.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
        img.hidden = false;
        let field: boolean | null = null;
        let shipyard: HTMLElement | null = null;
        if (img.style.left > '0' && img.style.top > '0') {
          if (elemBelow.style.boxShadow == 'grey 0px 0px 4em 4em inset' && elemBelow.style.background !== 'pink') {
            field = true;
          }
          let newBelow = elemBelow;
          if (newBelow.classList.contains('ship')) {
            field = null;
          } else {
            //console.log(newBelow);
            if (orientation === 'horizontal') {
              for (let i = 0; i < shipWidth; i++) {
                if (newBelow !== null) {
                  if ((newBelow as HTMLElement).style.background === 'pink') {
                    field = null;
                  }
                  newBelow = newBelow.nextElementSibling as HTMLElement;
                }
              }
            } else {
              for (let i = 0; i < shipWidth; i++) {
                //console.log(newBelow);
                if (newBelow!== null) {
                  if (newBelow.classList.contains('droppable')) {
                    //console.log('tut')
                    if ((newBelow as HTMLElement).style.background === 'pink') {
                      field = null;
                      //console.log(field)
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
        //console.log(orientation);
        //console.log(field);
        if (orientation === 'horizontal') {
          if (field !== null) {
            elemBelow.append(img);
            img.style.position = 'relative';
            img.style.left = '0px';
            img.style.top = '0px';
            elemBelow.classList.add('newship');
            addShipToFieldHorizontal(elemBelow);
            if (!elemBelow) return;
            elemBelow.classList.remove('newship');
            renderAroundShipHorizontal();
            leaveDroppableHorizontal(elemBelow);
          } else {
            let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
            if (droppableBelow !== null) {
              let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
              //console.log(overShip);
              if (overShip.classList.contains('droppable')) {
                droppableBelow = overShip as HTMLElement;
              }
              leaveDroppableHorizontal(droppableBelow);
            }
            returnShip();
          }
        } else {
          if (field !== null) {
            elemBelow.append(img);
            img.style.position = 'relative';
            img.style.left = '0px';
            img.style.top = '0px';
            elemBelow.classList.add('newship');
            addShipToFieldVertical(elemBelow);
            if (!elemBelow) return;
            elemBelow.classList.remove('newship');
            renderAroundShipVertical();
            leaveDroppableVertical(elemBelow);
          } else {
            let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
            if (droppableBelow !== null) {
              let overShip = document.elementsFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16)[2];
              //console.log(overShip);
              if (overShip.classList.contains('droppable')) {
                droppableBelow = overShip as HTMLElement;
              }
              leaveDroppableVertical(droppableBelow);
            }
            returnShip();
          }
        }
      }
    }

    function getShipsCoordinates() {
      const coordinatesOfShips: number[][] = [];
        let countSihps: number = -1;
        document.getElementById('field')?.childNodes.forEach((element, index) => {
          if ((element as HTMLElement).classList.contains('ship__active')) {
            //console.log(element);
            if (element.hasChildNodes()) {
              coordinatesOfShips.push([]);
              countSihps += 1;
              let el = (element.firstChild as HTMLImageElement);
              let orient = el.height > el.width ? 'vertical' : 'horizontal';
              let lengthShip = el.width > el.height ? el.width / 33 : el.height / 33;
              //console.log(orient);
              //console.log(lengthShip);
              if (orient === 'horizontal') {
                for (let i = 0; i < lengthShip; i++) {
                  coordinatesOfShips[countSihps].push(index + i);
                }
              } else {
                for (let i = 0; i < lengthShip; i++) {
                  coordinatesOfShips[countSihps].push(index + 10 * i);
                }
              }
            }
          }
        });
        console.log(coordinatesOfShips)
      return coordinatesOfShips;
    }

    function addShipToFieldHorizontal(element: HTMLElement) {
      element.classList.add('ship__active');
      for (let i = 0; i < shipWidth - 1; i++) {
        element = element.nextElementSibling as HTMLElement;
        element.classList.add('ship__active');
      }
    }

    function addShipToFieldVertical(element: HTMLElement) {
      element.classList.add('ship__active');
      let el = element as HTMLElement;
      for (let i = 0; i < shipWidth - 1; i++) {
        for (let i = 0; i < 10; i++) {
          el = el.nextElementSibling as HTMLElement;
        }
        el.classList.add('ship__active');
      }
    }
    
    function removeShipFromFieldHorizontal(element: HTMLElement) {
      if (element !== null) {
        element.classList.remove('ship__active');
        for (let i = 0; i < shipWidth - 1; i++) {
          element = element.nextElementSibling as HTMLElement;
          element.classList.remove('ship__active');
        }
      }
    }

    function removeShipFromFieldVertical(element: HTMLElement) {
      if (element !== null) {
        element.classList.remove('ship__active');
        let el = element as HTMLElement;
        for (let i = 0; i < shipWidth - 1; i++) {
          for (let i = 0; i < 10; i++) {
            el = el.nextElementSibling as HTMLElement;
          }
          //console.log(el);
          el.classList.remove('ship__active');
        }
    }
    }

    function returnShip() {
      img.style.position = 'relative';
      img.style.left = '0px';
      img.style.top = '0px';
      //console.log(orientation);
      if (document.getElementById('list__shipsVertical') && orientation == 'horizontal') {
        changeShipOrientationToVertical();
      }
      if (document.getElementById('list__shipsHorizontal') && orientation == 'vertical') {
        changeShipOrientationToHorizontal();
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

    function changeShipOrientationToVertical() {
      reverseShip(img);
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

    function changeShipOrientationToHorizontal() {
      reverseShip(img);
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

    function reverseShip(img: HTMLImageElement) {
      let temp = img.height;
      img.height = img.width;
      img.width = temp;
    }

    function enterDroppableHorizontal(elem: HTMLElement) {
      if (elem.style.boxShadow !== 'grey 0px 0px 4em 4em inset') {
        elem.style.boxShadow = 'grey 0px 0px 4em 4em inset';
        let el = elem.nextElementSibling as HTMLElement;
        for (let i = 0; i < shipWidth - 1; i++) {
          if (el) {
            el.style.boxShadow = 'grey 0px 0px 4em 4em inset';
            el = el.nextElementSibling as HTMLElement;
          }
        }
      }
    }

    function leaveDroppableHorizontal(elem: HTMLElement) {
      if (elem.style.boxShadow == 'grey 0px 0px 4em 4em inset') {
        elem.style.boxShadow = '';
        let el = elem.nextElementSibling as HTMLElement;
        for (let i = 0; i < shipWidth - 1; i++) {
          if (el) {
            el.style.boxShadow = '';
            el = el.nextElementSibling as HTMLElement;
          }
        }
      }
    }

    function enterDroppableVertical(elem: HTMLElement) {
      if (elem.style.boxShadow !== 'grey 0px 0px 4em 4em inset') {
        elem.style.boxShadow = 'grey 0px 0px 4em 4em inset';
        let el = elem as HTMLElement;
        for (let i = 0; i < shipWidth - 1; i++) {
          for (let i = 0; i < 10; i++) {
            el = el.nextElementSibling as HTMLElement;
          }
          el.style.boxShadow = 'grey 0px 0px 4em 4em inset';
        }
      }
    }

    function leaveDroppableVertical(elem: HTMLElement) {
      if (elem.style.boxShadow == 'grey 0px 0px 4em 4em inset') {
        elem.style.boxShadow = '';
        let el = elem as HTMLElement;
        for (let i = 0; i < shipWidth - 1; i++) {
          for (let i = 0; i < 10; i++) {
            el = el.nextElementSibling as HTMLElement;
          }
          el.style.boxShadow = '';
        }
      }
    }

    function deleteBackgroundAroundShip(element: HTMLElement) {
      if (element !== null) {
        if (orientation === 'horizontal') {
          renderAroundShipHorizontal();
        } else {
          renderAroundShipVertical();
        }
      }
    }

    function deleteRenderAroundShip(element: HTMLElement) {

    }

    function renderAroundShip() {
      renderAroundShipHorizontal();
      renderAroundShipVertical();
    }

    function renderAroundShipHorizontal() {
      document.getElementById('field')?.childNodes.forEach((element, index) => {
        (element as HTMLElement).style.background = '';
      });
      const coordinatesAroundShips = getShipsCoordinates();
      //console.log(coordinatesAroundShips);
      coordinatesAroundShips.forEach((ship) => {
          ship.unshift(ship[0] - 1);
          ship.push(ship[ship.length - 1] + 1);
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
      });
    }

    function renderAroundShipVertical() {
      const coordinatesAroundShips = getShipsCoordinates();
    }

    img.ondragstart = function() {
      return false;
    };
  }
}