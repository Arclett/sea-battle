export enum RegistrationText {
    logMode = "or create new account",
    regMode = "or login",
}

export enum AccInputText {
    regMode = "name",
    logMode = "name or email",
}

export enum EnterButtonText {
    regMode = "Create",
    logMode = "Enter",
}

export enum shipsImages {
    battleshipImageHorizontal = "../../../assets/images/ships/@TYPE@/battleshipHorizontal.jpg",
    cruiserImageHorizontal = "../../../assets/images/ships/@TYPE@/cruiserHorizontal.jpg",
    destroyerImageHorizontal = "../../../assets/images/ships/@TYPE@/destroyerHorizontal.jpg",
    boatImageHorizontal = "../../../assets/images/ships/@TYPE@/boatHorizontal.jpg",
    battleshipImageVertical = "../../../assets/images/ships/@TYPE@/battleshipVertical.jpg",
    cruiserImageVertical = "../../../assets/images/ships/@TYPE@/cruiserVertical.jpg",
    destroyerImageVertical = "../../../assets/images/ships/@TYPE@/destroyerVertical.jpg",
    boatImageVertical = "../../../assets/images/ships/@TYPE@/boatVertical.jpg",
}

export enum imagesPlacementMenu {
    circleArrow = "../../../assets/images/circle-arrow.png",
    clearField = "../../../assets/images/trash.png",
    randomShipsToField = "../../../assets/images/random.png",
}

export enum orientation {
    horizontal = "horizontal",
    vertical = "vertical",
    middle = "middle",
}

export enum color {
    backgroundAroundShip = "pink",
    backgroundUnderShip = "grey 0px 0px 4em 4em inset",
}

export enum shipsLength {
    battleship = 132,
    cruiser = 99,
    destroyer = 66,
    boat = 33,
    WidthAllShips = 33,
}

export enum WaitingWindowType {
    connect = "connect",
    opponent = "opponent",
}

export enum WaitingWindowText {
    connect = "Connecting to server. Please wait",
    opponent = "Waiting for your opponent",
}
