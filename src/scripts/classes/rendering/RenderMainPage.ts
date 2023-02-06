import { Element } from "../element/element";

export class RenderMainPage {
    static renderMainPage(container: HTMLElement) {
        container.replaceChildren();

        const multiPlayer = Element.createElement({
            tag: "button",
            classNote: "main__multiplayer-button",
            content: "Multiplayer",
        });

        container.append(multiPlayer);
    }
}
