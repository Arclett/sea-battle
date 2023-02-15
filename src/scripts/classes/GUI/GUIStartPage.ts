import { Element } from "../element/element";

export class GUIStartPage {
    renderStartPag() {
        document.getElementsByClassName("wrapper main__wrapper")[0].innerHTML = "";
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
            location.hash = "shipsPlacement";
        });
        gameMenu.append(singleGameContainer, multiGameContainer);
        singleGameContainer.append(singleGameImage, singleGameStartButton);
        multiGameContainer.append(multiGameImage, multiGameStartButton);
    }
}
