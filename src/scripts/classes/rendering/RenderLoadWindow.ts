import { WaitingWindowText, WaitingWindowType } from "../../types/enums";
import { Element } from "../element/element";

export class RenderWaitingWindow {
    static renderAwaitWindow(container: HTMLElement, type: WaitingWindowType, multi?: number) {
        container.replaceChildren();
        const windowElem = Element.createElement({
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
            windowElem.appendChild(cancelButton);
        }
        if (type === WaitingWindowType.placement) {
            windowElem.textContent = "Waiting for opponent ship placement";
        }
        if (type === WaitingWindowType.turn) {
            windowElem.textContent = "Enemy Turn";
        }
        if (type === WaitingWindowType.winAwait) {
            if (!multi) return;
            windowElem.textContent = `You Win! You gain ${50 * multi} gold and ${20 * multi} exp!`;
        }
        if (type === WaitingWindowType.lose) {
            windowElem.textContent = "You lose :(";
            const confirmButton = Element.createElement({
                tag: "button",
                classNote: "battle__confirm-button",
                content: "To Main Page",
            });
            windowElem.appendChild(confirmButton);
        }
        if (type === WaitingWindowType.winReady) {
            if (!multi) return;
            windowElem.textContent = `You Win! You gain ${50 * multi} gold and ${20 * multi} exp!`;
            const confirmButton = Element.createElement({
                tag: "button",
                classNote: "battle__confirm-button",
                content: "To Main Page",
            });
            windowElem.appendChild(confirmButton);
        }
        if (type === WaitingWindowType.winGuest) {
            windowElem.textContent = "You Win!";
            const confirmButton = Element.createElement({
                tag: "button",
                classNote: "battle__confirm-button",
                content: "To Main Page",
            });
            windowElem.appendChild(confirmButton);
        }
        container.appendChild(windowElem);
    }
}
