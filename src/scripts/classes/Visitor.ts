import { Account } from "./account/Account";
import { GUIShipsPlacement } from "./GUI/GUIShipsPlacement";
import { GUISingleGamePage } from "./GUI/GUISingleGamePage";
import { GUIStartPage } from "./GUI/GUIStartPage";
import { MultiGame } from "./multigame.ts/MultiGame";

export class Visitor {
    static instance: Visitor;

    account: Account;

    startPage: GUIStartPage;

    shipPlacement: GUIShipsPlacement;

    game: GUISingleGamePage;

    multiGame: MultiGame;
}
