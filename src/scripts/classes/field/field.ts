import { Element } from "../element/element";
const shipsArray: string[] = [];

export class Field {
  public ss: string[] = [];

  createEmptyField() {
    
    const fieldContainer = Element.createElement({ tag: 'div', classNote: 'field__container' });
    document.getElementsByClassName('wrapper main__wrapper')[0].append(fieldContainer);
    const listOfShips = Element.createElement({ tag: 'div', classNote: 'list__ships' });
    const field = Element.createElement({ tag: 'div', id: 'field' });
    for (let i = 0; i < 100; i++) {
      const smallField = Element.createElement({ tag: 'div', classNote: 'field__small droppable' });
      field.append(smallField);
    }
    fieldContainer.append(listOfShips, field);
    const battleship = Element.createImage({ src: '../../../assets/images/4ship.png', alt: 'battleship', classNote: 'battleship ship', width: 132}); 
    const battleshipContainer = Element.createElement({ tag: 'div', id: 'battleship__container', classNote: 'ships__container'}); 
    battleshipContainer.append(battleship);
    this.dragAndDropShip(battleship);
    listOfShips.append(battleshipContainer);
    const cruiserContainer = Element.createElement({ tag: 'div', id: 'cruiser__container', classNote: 'ships__container'});
    for (let i = 0; i < 2; i++) {
      const cruiser = Element.createImage({ src: '../../../assets/images/3ship.png', alt: 'cruiser', classNote: 'cruiser ship', width: 99});    
      this.dragAndDropShip(cruiser);
      cruiserContainer.append(cruiser);
    }
    const destroyerContainer = Element.createElement({ tag: 'div', id: 'destroyer__container', classNote: 'ships__container'});
    for (let i = 0; i < 3; i++) {
      const destroyer = Element.createImage({ src: '../../../assets/images/2ship.png', alt: 'destroyer', classNote: 'destroyer ship', width: 66});    
      this.dragAndDropShip(destroyer);
      destroyerContainer.append(destroyer);
    }
    const boatContainer = Element.createElement({ tag: 'div', id: 'boat__container', classNote: 'ships__container'});
    for (let i = 0; i < 4; i++) {
      const boat = Element.createImage({ src: '../../../assets/images/1ship.png', alt: 'boat', classNote: 'boat ship', width: 33});    
      this.dragAndDropShip(boat);
      boatContainer.append(boat);
    }
    listOfShips.append(cruiserContainer, destroyerContainer, boatContainer);
  }

  render() {
    this.createEmptyField();
  }

  dragAndDropShip(img: HTMLImageElement) {
    let shiftX = 0;
    let shiftY = 0;
    
    
    const shipWidth = img.width / 33;
    let orientation: string;
    img.width > 33 ? orientation = 'horizontal' : orientation = 'vertical';
    let currentDroppable: HTMLElement | null = null;
    img.onmousedown = (event) => {
      
      shiftX = event.clientX - img.getBoundingClientRect().left;
      shiftY = event.clientY - img.getBoundingClientRect().top;
      img.style.position = 'absolute';
      img.style.zIndex = '1000';

      //document.body.append(img);
      moveAt(event.pageX, event.pageY);

      document.addEventListener('mousemove', onMouseMove);



    };

    function moveAt(pageX: number, pageY: number) {
      img.style.left = pageX - shiftX + 'px';
      img.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      
      moveAt(event.pageX, event.pageY);
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
      if (currentDroppable != droppableBelow || currentDroppable != rightDropp) {
        if (currentDroppable) {
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable && rightDropp) {
          enterDroppable(currentDroppable);
        }
      }
    }

    img.onmouseup = function(event: MouseEvent) {
      document.removeEventListener('mousemove', onMouseMove);
      img.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX - shiftX + 16, event.clientY - shiftY + 16) as HTMLElement;
      img.hidden = false;
      let field: boolean | null = null;
      let shipyard: HTMLElement | null = null;
      if (img.style.left > '0' && img.style.top > '0') {
        if (elemBelow.style.background == 'pink') {
          field = true;
        }
        //field = elemBelow.closest('.ship__active') as HTMLElement;
        //shipyard = elemBelow.closest('.ships__container') as HTMLElement;
      }
      if (field !== null) {
        elemBelow.append(img);
        img.style.position = 'relative';
        img.style.left = '0px';
        img.style.top = '0px';
        elemBelow.classList.add('newship');
        if (!elemBelow) return;
        addShipToShipsArray();
        elemBelow.classList.remove('newship');
      } else {
        returnShip();
      }
      renderAroundShip();
      removeShipFromShipsArray();
    };

    function addShipToShipsArray() {
      let ship: string = '';
      document.getElementById('field')?.childNodes.forEach((element, index) => {
        if ((element as HTMLElement).classList.contains('newship')) {
          for (let i = 0; i < shipWidth; i++) {
            ship += `${index},`;
            index += 1;
          }
        }
      });
      shipsArray.push(ship.slice(0, -1));
      console.log(shipsArray);
    }

    function removeShipFromShipsArray() {
      let ship: string = '';
      document.getElementById('field')?.childNodes.forEach((element, index) => {
        if ((element as HTMLElement).style.background) {
          for (let i = 0; i < shipWidth; i++) {
            ship += `${index},`;
            index += 1;
          }
        }
      });

      shipsArray.forEach((element, index) => {
        if (element === ship) {
          shipsArray.splice(index, 1);
        }
      });
      console.log(shipsArray);
    }

    function returnShip() {
      img.style.position = 'relative';
      img.style.left = '0px';
      img.style.top = '0px';
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

    function enterDroppable(elem: HTMLElement) {
      if (elem.style.background !== 'pink') {
        elem.style.background = 'pink';
        //elem.classList.add('ship__active');
        let el = elem.nextElementSibling as HTMLElement;
        for (let i = 0; i < shipWidth - 1; i++) {
          if (el) {
            el.style.background = 'pink';
            //el.classList.add('ship__active');
            el = el.nextElementSibling as HTMLElement;
          }
        }
      }
    }

    function leaveDroppable(elem: HTMLElement) {
      if (elem.style.background == 'pink') {
        elem.style.background = '';
        //elem.classList.remove('ship__active');
        let el = elem.nextElementSibling as HTMLElement;
        for (let i = 0; i < shipWidth - 1; i++) {
          if (el) {
            el.style.background = '';
            //el.classList.remove('ship__active');
            el = el.nextElementSibling as HTMLElement;
          }
        }
      }
      
    }

    function renderAroundShip() {
      const arr: number[] = [];
      document.getElementById('field')?.childNodes.forEach((element, index) => {
        if ((element as HTMLElement).classList.contains('ship__active')) {
          arr.push(index);
        }
      });
      //console.log(arr);
      // document.getElementById('field')?.childNodes.forEach((element, index) => {
      //   (element as HTMLElement).style.background = '';
      // });
      // const arr: number[] = new Array(99);
      // arr.fill(0);
      // document.getElementById('field')?.childNodes.forEach((element, index) => {
      //   let el = element as HTMLElement;
      //   if (el.classList.contains('ship__active')) {
      //     arr[index] = 1;
      //     arr[index - 1] = 1;
      //     arr[index + 1] = 1;
      //     console.log('ship__active');
      //   }
      // });
      // const arrBackground = arr;
      // arrBackground.forEach((element, index) => {
      //   if (element == 1) {
      //     (document.getElementById('field')?.childNodes[index] as HTMLElement).style.background = 'pink';
      //     (document.getElementById('field')?.childNodes[index] as HTMLElement).classList.add('ship__active');
      //     (document.getElementById('field')?.childNodes[index-10] as HTMLElement).style.background = 'pink';
      //     (document.getElementById('field')?.childNodes[index-10] as HTMLElement).classList.add('ship__active');
      //     (document.getElementById('field')?.childNodes[index+10] as HTMLElement).style.background = 'pink';
      //     (document.getElementById('field')?.childNodes[index+10] as HTMLElement).classList.add('ship__active');
      //   }
      // });
      // console.log(arrBackground);
    }

    img.ondragstart = function() {
      return false;
    };
  }
}