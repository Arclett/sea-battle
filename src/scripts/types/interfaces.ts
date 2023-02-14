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

export interface GetUserData {
    userName: string;
    userGold: number;
    userXp: number;
    obtShipSkins: string;
    obtFieldSkin: string;
    currentShipSkin: string;
    currentFieldSkin: string;
    winsPvP: number;
    winsPvE: number;
}
export interface MultuPlayerElems {
    chatInput: HTMLInputElement;
    chatBody: HTMLElement;
    linkBody: HTMLElement;
}
export interface AccountElems {
    popup: HTMLElement;
    overlay: HTMLElement;
}
