import { StatusShip, TileStatus } from "../../types/enums";
import { fieldTile, MultiGameElems, ShipsData } from "../../types/interfaces";
import { RenderMultiGame } from "../rendering/RenderMultiGame";
import { SocketHandler } from "../SocketHandler";

export class MultiGame {
    ourCoords: ShipsData;
    enemyCoords: ShipsData;
    ourMatrix: fieldTile[];
    enemyMatrix: fieldTile[];
    container: HTMLElement;
    elems: MultiGameElems;
    constructor(ourCoords: ShipsData, enemyCoords: ShipsData, container: HTMLElement) {
        this.ourCoords = ourCoords;
        this.enemyCoords = enemyCoords;
        this.container = container;
    }

    start() {
        const filedSkin = SocketHandler.instance.userData?.currentFieldSkin;
        const shipSkin = SocketHandler.instance.userData?.currentShipSkin;
        if (!filedSkin || !shipSkin) return;
        this.ourMatrix = this.creaetFieldMatrix(this.ourCoords);
        this.enemyMatrix = this.creaetFieldMatrix(this.enemyCoords);
        this.elems = RenderMultiGame.renderWrapper(
            this.container,
            filedSkin,
            this.ourCoords,
            this.enemyCoords,
            this.ourMatrix,
            this.enemyMatrix
        );
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
                console.log("HEAD");
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
        console.log(res);
        return res;
    }

    fieldClick(elem: HTMLElement) {
        const ind = elem.dataset.coord;
        if (!ind) return;
        const tile = this.enemyMatrix[Number(ind)];
        if (tile.tileStatus === TileStatus.wound || tile.tileStatus === TileStatus.miss) return;
        let res;
        if (this.enemyCoords.ShipsCoordinates.coordinatesOfShips.flat().includes(+ind)) {
            this.enemyMatrix[Number(ind)].tileStatus = TileStatus.wound;
            const ship = this.enemyCoords.ShipsCoordinates.coordinatesOfShips.find((e) => e.includes(+ind));
            if (ship) {
                const index = ship.indexOf(+ind);
                ship[index] = NaN;
            }
            this.isDestoyed();
        } else {
            this.enemyMatrix[Number(ind)].tileStatus = TileStatus.miss;
            SocketHandler.instance.enemyTurn(this.enemyMatrix, this.enemyCoords);
        }
        console.log(this.enemyMatrix);
        RenderMultiGame.renderEnemyField(this.elems.enemyFieldWrapper, this.enemyMatrix);
    }

    isDestoyed() {
        let destroyed = 0;
        this.enemyCoords.ShipsCoordinates.coordinatesOfShips.forEach((e, i) => {
            if (e.every((elem) => !elem)) {
                destroyed += 1;
                this.enemyCoords.ShipsCoordinatesWithBackground[i].forEach((el) => {
                    if (this.enemyMatrix[el].tileStatus === TileStatus.clear) {
                        this.enemyMatrix[el].tileStatus = TileStatus.miss;
                    }
                });
            }
        });
    }

    takeTurn(matrix: fieldTile[], ships: ShipsData) {
        this.ourCoords = ships;
        this.ourMatrix = matrix;
        RenderMultiGame.renderMyField(this.elems.ourFieldWrapper, this.ourCoords, this.ourMatrix);
    }
}
