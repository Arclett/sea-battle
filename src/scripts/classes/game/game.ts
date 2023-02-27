import { BackgroundAttack, StatusShip } from "../../types/enums";
import { ShipsCoordinates } from "../../types/interfaces";

export class Game {
    public enemyShipsCoordinates: ShipsCoordinates;
    public ourShipsCoordinates: number[][];
    public startenemyShipsCoordinates: number[][];
    public enemyShipsCoordinatesWithBackground: number[][];
    public ourShipsCoordinatesWithBackground: number[][];
    private woundShips: number[] = [];
    private statusShip = StatusShip;
    private wound = BackgroundAttack.wound;
    private miss = BackgroundAttack.miss;

    attack(index: number) {
        const cell = document.getElementsByClassName("enemyField")[index] as HTMLElement;
        let query: string = "";
        if (cell.style.background === "") {
            query = this.sendQuery(index, "player");
        }
        return query;
    }

    attackEnemy(index: number) {
        const cell = document.getElementsByClassName("ourField")[index] as HTMLElement;
        let query: string = "";
        if (cell.style.background === "") {
            query = this.sendQuery(index, "Enemy");
        }
        return query;
    }

    sendQuery(index: number, type: string) {
        let ships = this.enemyShipsCoordinates.coordinatesOfShips;
        if (type === "Enemy") {
            ships = this.ourShipsCoordinates;
        }
        let answer: string = this.statusShip.miss;
        ships.forEach((ship, numberOfShip) => {
            if (ship.includes(index) && ship.length > 1) {
                console.log(ship.length);
                answer = this.statusShip.wound;
                ship.forEach((cell, ind) => {
                    if (cell === index) {
                        this.woundShips.push(index);
                        ship.splice(ind, 1);
                    }
                });
            }
            if (ship.includes(index) && ship.length === 1) {
                answer = this.statusShip.dead;
            }
        });
        console.log(answer);
        return answer;
    }

    addBackgroundAroundDeadShip(index: number) {
        let currentShip: number[] = [];
        this.enemyShipsCoordinatesWithBackground.forEach((ship, numberOfShip) => {
            if (ship.includes(index)) {
                currentShip = ship;
            }
        });
        currentShip.forEach((number) => {
            let cell = document.getElementsByClassName("enemyField")[number] as HTMLElement;
            cell.style.background = this.miss;
            cell.style.backgroundSize = "contain";
        });
        this.startenemyShipsCoordinates.forEach((ship) => {
            if (ship.includes(index)) {
                currentShip = ship;
            }
        });
        currentShip.forEach((number) => {
            let cell = document.getElementsByClassName("enemyField")[number] as HTMLElement;
            cell.style.background = this.wound;
            cell.style.backgroundSize = "contain";
        });
    }
    addDeadShip() {
        this.woundShips.forEach((number) => {
            let cell = document.getElementsByClassName("enemyField")[number] as HTMLElement;
            cell.style.background = this.wound;
            cell.style.backgroundSize = "contain";
        });
    }
}
