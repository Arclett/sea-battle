import { ElementInterface, InputElement } from "../../types/interfaces";

export class Element {
    static createElement({ tag, id, classNote, content, disable = false }: ElementInterface) {
        const el = document.createElement(tag);
        if (id) {
            el.id = id;
        }
        if (classNote) {
            el.className = classNote;
        }
        if (content) {
            el.textContent = content;
        }
        if (disable) {
            (el as HTMLButtonElement).disabled = disable;
        }
        return el;
    }

    static createInput({ type, id, classNote, value, content, name, disable = false }: InputElement) {
        const el = document.createElement("input");
        el.type = type;
        el.disabled = disable;
        if (id) {
            el.id = id;
        }
        if (classNote) {
            el.className = classNote;
        }
        if (value) {
            el.value = value;
        }
        if (content) {
            el.placeholder = content;
        }
        if (name) {
            el.name = name;
        }
        return el;
    }
}
