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

export enum defaultShipsImages {
    battleshipImageHorizontal = '../../../assets/images/ships/default/battleshipHorizontal.png',
    cruiserImageHorizontal = '../../../assets/images/ships/default/cruiserHorizontal.png',
    destroyerImageHorizontal = '../../../assets/images/ships/default/destroyerHorizontal.png',
    boatImageHorizontal = '../../../assets/images/ships/default/boatHorizontal.png',
    battleshipImageVertical = '../../../assets/images/ships/default/battleshipVertical.png',
    cruiserImageVertical = '../../../assets/images/ships/default/cruiserVertical.png',
    destroyerImageVertical = '../../../assets/images/ships/default/destroyerVertical.png',
    boatImageVertical = '../../../assets/images/ships/default/boatVertical.png',
}

export enum imagesPlacementMenu {
    circleArrow = '../../../assets/images/circle-arrow.png',
    clearField = '../../../assets/images/trash.png',
    randomShipsToField = '../../../assets/images/random.png',
}

export enum orientation {
    horizontal = 'horizontal',
    vertical = 'vertical',
    middle = 'middle',
}

export enum color {
    backgroundAroundShip = 'pink',
    backgroundUnderShip = 'grey 0px 0px 4em 4em inset',
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

export enum BackgroundAttack {
    wound = 'url("../../../assets/images/wound.png") 0% 0% / contain no-repeat',
    miss = 'url("../../../assets/images/miss.png") 0% 0% / contain no-repeat',
}

export enum StatusShip {
    miss = 'miss',
    wound = 'wound',
    dead = 'dead',
}