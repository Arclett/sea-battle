import { GameMode, StatusShip, TileStatus } from "../../types/enums";
import { fieldTile, MultiGameElems, ShipsData } from "../../types/interfaces";
import { RenderMultiGame } from "../rendering/RenderMultiGame";
import { SocketHandler } from "../SocketHandler";
import { Utilities } from "../Utilities";

export class MultiGame {
    ourCoords: ShipsData;
    renderCoords: ShipsData;
    enemyCoords: ShipsData;
    ourMatrix: fieldTile[];
    enemyMatrix: fieldTile[];
    container: HTMLElement;
    elems: MultiGameElems;
    shipCount: number;
    constructor(ourCoords: ShipsData, enemyCoords: ShipsData, container: HTMLElement) {
        this.ourCoords = ourCoords;
        this.enemyCoords = enemyCoords;
        this.container = container;
        this.renderCoords = ourCoords;
        this.shipCount = 0;
    }

    start() {
        const filedSkin = SocketHandler.instance.userData
            ? SocketHandler.instance.userData.currentFieldSkin
            : "default";
        const shipSkin = SocketHandler.instance.userData ? SocketHandler.instance.userData.currentShipSkin : "school";
        if (!filedSkin || !shipSkin) return;
        this.ourMatrix = this.creaetFieldMatrix(this.ourCoords);
        this.enemyMatrix = this.creaetFieldMatrix(this.enemyCoords);
        this.elems = RenderMultiGame.renderWrapper(
            this.container,
            this.renderCoords,
            this.ourMatrix,
            this.enemyMatrix,
            SocketHandler.instance.userData,
            SocketHandler.instance.enemyData
        );
        if (SocketHandler.instance.userData) {
            this.elems.ourName.textContent = SocketHandler.instance.userData.name;
            this.elems.ourRank.textContent = `Rank ${Utilities.calcRank(SocketHandler.instance.userData.exp).curRank}`;
        }
        if (SocketHandler.instance.enemyData) {
            this.elems.enemyName.textContent = SocketHandler.instance.enemyData.name;
            this.elems.enemyRank.textContent = `Rank ${
                Utilities.calcRank(SocketHandler.instance.enemyData.exp).curRank
            }`;
        }
    }

    creaetFieldMatrix(coords: ShipsData) {
        let res: fieldTile[] = [];
        const heads = coords.ShipsCoordinates.coordinatesOfShips.map((e) => e[0]);
        const bodies = coords.ShipsCoordinates.coordinatesOfShips.flat();
        for (let i = 0; i < 100; i++) {
            let status: TileStatus;
            let index: number | undefined;
            let head = false;
            if (heads.includes(i)) {
                status = TileStatus.ship;
                head = true;
                index = heads.indexOf(i);
            }
            if (bodies.includes(i)) {
                status = TileStatus.ship;
                coords.ShipsCoordinates.coordinatesOfShips.forEach((e, ind) => {
                    if (e.includes(i)) index = ind;
                });
            } else {
                status = TileStatus.clear;
            }
            res.push({ tileStatus: status, shipIndex: index, shipStatus: StatusShip.miss, shipHead: head });
        }
        return res;
    }

    fieldClick(elem: HTMLElement) {
        const ind = elem.dataset.coord;
        if (!ind) return;
        const tile = this.enemyMatrix[Number(ind)];
        if (tile.tileStatus === TileStatus.wound || tile.tileStatus === TileStatus.miss) return;
        if (this.enemyCoords.ShipsCoordinates.coordinatesOfShips.flat().includes(+ind)) {
            this.enemyMatrix[Number(ind)].tileStatus = TileStatus.wound;
            const ship = this.enemyCoords.ShipsCoordinates.coordinatesOfShips.find((e) => e.includes(+ind));
            if (ship) {
                const index = ship.indexOf(+ind);
                ship[index] = NaN;
            }
            this.isDestoyed();
            this.shipCount = this.getShipCount(this.enemyCoords);
            this.elems.ourCount.textContent = `Ships destroyed: ${this.shipCount}/10`;
            this.elems.enemyCount.textContent = `Ships destroyed${this.getShipCount(this.ourCoords)}/10`;
            if (this.shipCount === 10) SocketHandler.instance.endBattle(GameMode.multi);
        } else {
            this.enemyMatrix[Number(ind)].tileStatus = TileStatus.miss;
            SocketHandler.instance.enemyTurn(this.enemyMatrix, this.enemyCoords);
        }

        RenderMultiGame.renderEnemyField(this.elems.enemyFieldWrapper, this.enemyMatrix);
    }

    isDestoyed() {
        this.enemyCoords.ShipsCoordinates.coordinatesOfShips.forEach((e, i) => {
            if (e.every((elem) => !elem)) {
                this.elems.ourCount.textContent = `Enemy ships destroyed: ${this.shipCount}/10`;
                this.enemyCoords.ShipsCoordinatesWithBackground[i].forEach((el) => {
                    if (this.enemyMatrix[el].tileStatus === TileStatus.clear) {
                        this.enemyMatrix[el].tileStatus = TileStatus.miss;
                    }
                });
            }
        });
    }

    getShipCount(data: ShipsData) {
        const ships = data.ShipsCoordinates.coordinatesOfShips;
        const destroyedShips = ships.filter((e) => {
            if (e.every((el) => !el)) return e;
        });
        return destroyedShips.length;
    }

    takeTurn(matrix: fieldTile[], ships: ShipsData) {
        this.ourCoords = ships;
        this.ourMatrix = matrix;
        RenderMultiGame.renderMyField(this.elems.ourFieldWrapper, this.renderCoords, this.ourMatrix);
    }
}
