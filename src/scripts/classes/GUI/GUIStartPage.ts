import { MainStatus } from "../../types/enums";
import { Element } from "../element/element";
import { SocketHandler } from "../SocketHandler";
import { Utilities } from "../Utilities";

export class GUIStartPage {
    renderStartPag() {
        document.getElementsByClassName("wrapper main__wrapper")[0].innerHTML = "";

        const infoWrapper = Element.createElement({ tag: "div", classNote: "game-info" });

        const title = Element.createElement({ tag: "h2", content: "Welcome to Sea Battle!" });

        const greet = Element.createElement({ tag: "div", content: Utilities.greet });

        infoWrapper.append(title, greet);

        const gameMenu = Element.createElement({ tag: "div", classNote: "gameMenu__container" });
        document.getElementsByClassName("wrapper main__wrapper")[0].append(gameMenu);
        const singleGameContainer = Element.createElement({ tag: "div", classNote: "singleGame__container" });
        const singleGameImage = Element.createImage({
            src: "../../../assets/images/singleShip.png",
            alt: "random",
            classNote: "shipsImages",
        });
        const singleGameStartButton = Element.createElement({
            tag: "button",
            classNote: "startField",
            content: "Single Game",
        });
        const multiGameContainer = Element.createElement({ tag: "div", classNote: "multiGame__container" });
        const multiGameImage = Element.createImage({
            src: "../../../assets/images/twoShips.png",
            alt: "random",
            classNote: "shipsImages",
        });
        const multiGameStartButton = Element.createElement({
            tag: "button",
            classNote: "startField main__multiplayer-button",
            content: "Multi Game",
        });

        singleGameStartButton.addEventListener("click", () => {
            localStorage.setItem("game", "singleGame");
            SocketHandler.instance.currentStatus = MainStatus.game;
            location.hash = "shipsPlacement";
        });
        gameMenu.append(infoWrapper, singleGameContainer, multiGameContainer);
        singleGameContainer.append(singleGameImage, singleGameStartButton);
        multiGameContainer.append(multiGameImage, multiGameStartButton);
    }
}

/*renderStartPag() {
    document.getElementsByClassName('wrapper main__wrapper')[0].replaceChildren();
    const gameMenu = Element.createElement({ tag: 'div', classNote: 'gameMenu__container' });
    document.getElementsByClassName('wrapper main__wrapper')[0].append(gameMenu);
    const singleGameContainer = Element.createElement({ tag: 'div', classNote: 'singleGame__container' });
    const singleGameImage = Element.createImage({ src: '../../../assets/images/singleShip.png', alt: 'random', classNote: 'shipsImages' });
    const singleGameStartButton = Element.createElement({ tag: 'button', classNote: 'startField', content: 'Single Game' });
    const multiGameContainer = Element.createElement({ tag: 'div', classNote: 'multiGame__container' });
    const multiGameImage = Element.createImage({ src: '../../../assets/images/twoShips.png', alt: 'random', classNote: 'shipsImages' });
    const multiGameStartButton = Element.createElement({ tag: 'button', classNote: 'startField main__multiplayer-button', content: 'Multi Game' });

    singleGameStartButton.addEventListener('click', () =>{
      localStorage.setItem('game', 'singleGame');
      location.hash = 'shipsPlacement';
    });
    gameMenu.append(singleGameContainer, multiGameContainer);
    singleGameContainer.append(singleGameImage, singleGameStartButton);
    multiGameContainer.append(multiGameImage, multiGameStartButton);
  }*/
