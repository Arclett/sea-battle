import { Element } from "../element/element";

export class RenderPlayField {
    static renderPlayFieldBase(container: HTMLElement) {
        container.replaceChildren();
        const title = Element.createElement({ tag: "h2", content: "Battle" });
        container.append(title);
    }
}
