import { Element } from "../element/element";

export class Field {
  constructor() {

  }

  createEmptyField() {
    
    const fieldBox = Element.createElement({ tag: 'div', classNote: 'field__box' });
    document.getElementsByClassName('wrapper main__wrapper')[0].append(fieldBox);
    const listOfShips = Element.createElement({ tag: 'div', classNote: 'list__ships' });
    const field = Element.createElement({ tag: 'div', classNote: 'field' });
    fieldBox.append(listOfShips, field);
    const battleship = Element.createElement({ tag: 'div', classNote: 'battleship' });
    battleship.classList.add('ship');
    listOfShips.append(battleship);
    for (let i = 0; i < 2; i++) {
      const cruiser = Element.createElement({ tag: 'div', classNote: 'cruiser' });
      cruiser.classList.add('ship');
      listOfShips.append(cruiser);
    }
    for (let i = 0; i < 3; i++) {
      const destroyer = Element.createElement({ tag: 'div', classNote: 'destroyer' });
      destroyer.classList.add('ship');
      listOfShips.append(destroyer);
    }
    for (let i = 0; i < 4; i++) {
      const boat = Element.createElement({ tag: 'div', classNote: 'boat' });
      boat.classList.add('ship');
      listOfShips.append(boat);
    }
  }

  render() {
    this.createEmptyField();
  }
}