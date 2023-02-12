import { WaitingWindowText, WaitingWindowType } from "../../types/enums";
import { Element } from "../element/element";

export class RenderWaitingWindow {
    static renderAwaitWindow(container: HTMLElement, type: WaitingWindowType) {
        container.replaceChildren();
        const window = Element.createElement({
            tag: "div",
            classNote: "loading-window",
            content: type === WaitingWindowType.connect ? WaitingWindowText.connect : WaitingWindowText.opponent,
        });
        if (type === WaitingWindowType.opponent) {
            const cancelButton = Element.createElement({
                tag: "button",
                classNote: "loading-window__button",
                content: "cancel",
            });
            window.appendChild(cancelButton);
        }
        container.appendChild(window);
    }
}
