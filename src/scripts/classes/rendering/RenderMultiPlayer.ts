import { Element } from "../element/element";
import { Utilities } from "../Utilities";

export class RenderMultiPlayer {
    static renderMatchMaking(container: HTMLElement) {
        container.replaceChildren();

        const wrapper = Element.createElement({ tag: "div", classNote: "multiplayer-wrapper" });

        const title = Element.createElement({
            tag: "h2",
            classNote: "match-making-title",
            content: "Find your opponent",
        });

        const findWrapper = Element.createElement({ tag: "div", classNote: "find-opponent" });

        const findTitle = Element.createElement({
            tag: "h3",
            classNote: "find-opponent__title-find",
            content: "Find opponent by name",
        });

        const findInput = Element.createInput({
            type: "text",
            classNote: "find-opponent__input-find",
            content: "enter name",
        });

        const findButton = Element.createElement({
            tag: "button",
            classNote: "find-opponent__button-find",
            content: "Find",
        });

        const findStatus = Element.createElement({ tag: "div", classNote: "find-opponent__status-find hidden" });

        findWrapper.append(findTitle, findInput, findButton, findStatus);

        const linkWrapper = Element.createElement({ tag: "div", classNote: "create-link" });

        const linkTitle = Element.createElement({
            tag: "h3",
            classNote: "create-link__title",
            content: "Create link for instatnt play",
        });

        const linkBody = Element.createElement({ tag: "div", classNote: "create-link__link" });

        const linkCreate = Element.createElement({
            tag: "button",
            classNote: "create-link__create",
            content: "Create Link",
        });

        const linkCopy = Element.createElement({ tag: "button", classNote: "create-link__copy", content: "Copy Link" });

        linkWrapper.append(linkTitle, linkBody, linkCreate, linkCopy);

        const chatWrapper = Element.createElement({ tag: "div", classNote: "chat" });

        const chatTitle = Element.createElement({ tag: "h3", classNote: "chat__title", content: "Chat" });

        const chatBody = Element.createElement({ tag: "div", classNote: "chat__body" });

        const chatInput = Element.createInput({ type: "text", classNote: "chat__input", content: "enter message" });

        const chatButton = Element.createElement({ tag: "button", classNote: "chat__button", content: "Send" });

        chatWrapper.append(chatTitle, chatBody, chatInput, chatButton);

        wrapper.append(findWrapper, chatWrapper, linkWrapper);
        container.append(title, wrapper);

        return {
            chatInput: chatInput,
            chatBody: chatBody,
        };
    }

    static renderMessage(container: HTMLElement, message: string) {
        const text = `${Utilities.getDate()} ${message}`;
        const mes = Element.createElement({ tag: "div", classNote: "chat__message", content: text });
        container.appendChild(mes);
    }
}
