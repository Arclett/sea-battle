export interface ElementInterface {
    tag: string;
    id?: string;
    classNote?: string;
    content?: string;
    disable?: boolean;
}

export interface InputElement {
    type: string;
    id?: string;
    classNote?: string;
    value?: string;
    content?: string;
    name?: string;
    disable?: boolean;
}

export interface ImageElement {
    src: string;
    alt?: string;
    id?: string;
    classNote?: string;
    width?: number;
    height?: number;
}

export interface LoginWindowElements {
    accInput: HTMLInputElement;
    accPass: HTMLInputElement;
    emailInput: HTMLInputElement;
    accPassConfirm: HTMLInputElement;
    changeMode: HTMLElement;
    enterButton: HTMLElement;
}
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}

export interface SmallBackground {
    first: number;
    second: number;
    third: number;
    fourth: number;
    fifth?: number;
    sixth?: number;
    seventh?: number;
    eighth?: number;
    ninth?: number;
}

