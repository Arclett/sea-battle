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
    battleshipImageHorizontal = "../../../assets/images/ships/@TYPE@/battleshipHorizontal.png",
    cruiserImageHorizontal = "../../../assets/images/ships/@TYPE@/cruiserHorizontal.png",
    destroyerImageHorizontal = "../../../assets/images/ships/@TYPE@/destroyerHorizontal.png",
    boatImageHorizontal = "../../../assets/images/ships/@TYPE@/boatHorizontal.png",
    battleshipImageVertical = "../../../assets/images/ships/@TYPE@/battleshipVertical.png",
    cruiserImageVertical = "../../../assets/images/ships/@TYPE@/cruiserVertical.png",
    destroyerImageVertical = "../../../assets/images/ships/@TYPE@/destroyerVertical.png",
    boatImageVertical = "../../../assets/images/ships/@TYPE@/boatVertical.png",
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

export enum Filters {
    obtained = "obtained",
    locked = "locked",
    ships = "ships",
    fields = "fields",
    all = "all",
}
