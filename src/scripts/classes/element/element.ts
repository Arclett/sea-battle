import { ElementInterface, InputElement } from "../../types/interfaces";




export class Element {
  createElement({ tag, id, classNote, content, disable = false }: ElementInterface) {
    const el = document.createElement(tag);
    if (id) {
      el.id = id;
    }
    if (classNote) {
      el.classList.add(classNote);
    }
    if (content) {
      el.textContent = content;
    }
    if (disable) {
      (el as HTMLButtonElement).disabled = disable;
    }
    return el;
  }

  createInput({ type, id, classNote, value, content, name, disable = false }: InputElement) {
    const el = document.createElement('input');
    el.type = type;
    el.disabled = disable;
    if (id) {
      el.id = id;
    }
    if (classNote) {
      el.classList.add(classNote);
    }
    if (value) {
      el.value = value;
    }
    if (content) {
      el.textContent = content;
    }
    if (name) {
      el.name = name;
    }
    return el;
  }

  
}
