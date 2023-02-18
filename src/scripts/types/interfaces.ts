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
    error: HTMLElement;
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

export interface GetUserData {
    name: string;
    gold: number;
    exp: number;
    obtShipSkins: string;
    obtFieldSkins: string;
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

export interface RankCalculation {
    curRank: number;
    rankStart: number;
    rankNext: number;
    percentage: number;
}

export interface ShipSkins {
    history: number;
    modern: number;
    school: number;
    shadow: number;
    trade: number;
    [key: string]: number;
}

export interface FieldSkins {
    coral: number;
    default: number;
    fish: number;
    gold: number;
    grass: number;
    ice: number;
    lava: number;
    sand: number;
    [key: string]: number;
}
