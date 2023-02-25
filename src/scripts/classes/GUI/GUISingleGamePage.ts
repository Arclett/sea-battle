import { StatusShip } from "../../types/enums";
import { Element } from "../element/element";
import { OrientationOfShips } from "../field/orientationOfShips";
import { RandomShips } from "../field/randomShips";
import { ShipsCoordinatesWithBackground } from "../field/shipsCoordinatesWithBackground";
import { ShipsInField } from "../field/shipsInField";
import { AIGame } from "../game/AISingleGame";
import { Answer } from "../game/answer";
import { Game } from "../game/game";

export class GUISingleGamePage {
  private randomShips = new RandomShips();
  private answer = new Answer();
  private game = new Game();
  private AI = new AIGame();
  private statusShip = StatusShip;
  private shipCoordinatesWithBackground = new ShipsCoordinatesWithBackground();
  private orientationOfShip = new OrientationOfShips();
  private ourShipsCoordinates = this.shipCoordinatesWithBackground.getShipsCoordinatesWithBackground().ShipsCoordinates;
  private countDeadEnemyShips = 0;
  private countDeadOurShips = 0;

  renderSingleGamePage() {
    document.getElementsByClassName('wrapper main__wrapper')[0].replaceChildren();
    const gameContainer = Element.createElement({ tag: 'div', classNote: 'game__container' });
    const ourField = Element.createElement({ tag: 'div', id: 'ourField__container', classNote: 'field__container'});
    const enemyField = Element.createElement({ tag: 'div', id: 'field', classNote: 'field__container' });
    document.getElementsByClassName('wrapper main__wrapper')[0].append(gameContainer);
    for (let i = 0; i < 100; i++) {
      const smallField = Element.createElement({ tag: 'div', classNote: 'field__small ourField' });
      ourField.append(smallField);
    }
    for (let i = 0; i < 100; i++) {
      const smallField = Element.createElement({ tag: 'div', classNote: 'field__small enemyField droppable' });
      enemyField.append(smallField);
      smallField.onclick  = () => {
        const res = this.game.attack(i);
        if (res === this.statusShip.wound) {
          this.answer.render(res, i, 'Our');
        }
        if (res === this.statusShip.miss) {
          this.answer.render(res, i, 'Our');
          this.enemyMove(this.statusShip.miss);
        }
        if (res === this.statusShip.dead) {
          this.answer.render(res, i, 'Our');
          this.countDeadOurShips += 1;
          console.log(this.countDeadOurShips)
          if (this.countDeadOurShips === 10) {
            this.ourWin();
          }
        }
      };
    }
    gameContainer.append(ourField, enemyField);
    this.randomShips.setRandomBattleship();
    this.ourShipsCoordinates.coordinatesOfShips.forEach ((ship) => {
      let orientation = 'vertical';
      if (ship.length === 1) {
        orientation = this.ourShipsCoordinates.orientationBoat;
      } else {
        if ((ship[1]-ship[0]) === 1) {
          orientation = 'horizontal';
        }
      }
      const newShip = new Image();
      switch (ship.length) {
        case 4:
          this.orientationOfShip.changeBattleship(orientation, newShip);
          break;
        case 3:
          this.orientationOfShip.changeCruiser(orientation, newShip);
          break;
        case 2:
          this.orientationOfShip.changeDestroyer(orientation, newShip);
          break;
        case 1:
          this.orientationOfShip.changeBoat(orientation, newShip);
          break;
        default:
          break;
      }
      document.getElementsByClassName('ourField')[ship[0]].append(newShip);
    });
    const enemyShips = new ShipsCoordinatesWithBackground().getShipsCoordinatesWithBackground();
    const enemyShipsCoordinates = enemyShips.ShipsCoordinates;
    const enemyShipsCoordinatesWithBackground = enemyShips.ShipsCoordinatesWithBackground;
    this.game.enemyShipsCoordinates = enemyShipsCoordinates;
    this.game.ourShipsCoordinates = this.ourShipsCoordinates.coordinatesOfShips;
    this.game.startenemyShipsCoordinates = Array.from(enemyShipsCoordinates.coordinatesOfShips);
    this.game.enemyShipsCoordinatesWithBackground = enemyShipsCoordinatesWithBackground;
    console.log(this.ourShipsCoordinates)
    console.log(enemyShipsCoordinates)
    enemyField.childNodes.forEach((smallField) => {
      (smallField as HTMLElement).style.background = '';
      (smallField as HTMLElement).className = 'field__small enemyField droppable';
      if ((smallField as HTMLElement).hasChildNodes()) {
        (smallField as HTMLElement).replaceChildren();
      }
    });
    enemyField.childNodes.forEach((smallField, index) => {
      if ((smallField as HTMLElement).hasChildNodes()) {
        
      }
    });
  }

  enemyMove(status: string) {
    const postition = this.AI.getRandomCoordinate(status);
    const statusEnemyAttack = this.game.attackEnemy(postition);
    console.log('AIAttack'+postition);
    if (statusEnemyAttack === this.statusShip.wound) {
      this.AI.woundShip.push(postition);
      this.AI.isWound = true;
    }
    if (statusEnemyAttack === this.statusShip.dead) {
      this.AI.woundShip.push(postition);
      //this.answer.renderAroundShip('Enemy', this.AI.woundShip);
      this.answer.renderAroundOurDeadShip(this.AI.woundShip);
      this.AI.woundShip = [];
      this.AI.isWound = false;
      this.AI.orientation = 'unknown';
      this.countDeadEnemyShips += 1;
      if (this.countDeadEnemyShips === 10) {
        this.enemyWin();
      }
      console.log(this.countDeadEnemyShips);
    }
      this.answer.render(statusEnemyAttack, postition, 'Enemy');
    if((statusEnemyAttack === this.statusShip.wound || statusEnemyAttack === this.statusShip.dead) && this.countDeadEnemyShips !== 10) {
      this.enemyMove(statusEnemyAttack);
    }
  }

  enemyWin() {
    alert('Enemy win');
    this.disableField();
  }

  ourWin() {
    alert('WE win');
    this.disableField();
  }

  disableField() {
    document.getElementById('field')?.childNodes.forEach((cell) => {
      (cell as HTMLElement).onclick = null;
      (cell as HTMLElement).style.cursor = 'default';
    });

  }
}