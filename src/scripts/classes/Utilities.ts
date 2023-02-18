import { shipsImages } from "../types/enums";
import { FieldSkins, ShipSkins } from "../types/interfaces";
import { SocketHandler } from "./SocketHandler";

export class Utilities {
    static shipSkins: ShipSkins = {
        history: 500,
        modern: 700,
        school: 300,
        shadow: 400,
        trade: 600,
    };

    static fieldSkins: FieldSkins = {
        coral: 1000,
        default: 200,
        fish: 500,
        gold: 10000,
        grass: 1000,
        ice: 500,
        lava: 5000,
        sand: 500,
    };

    static randomNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static getDate() {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    static makeImageLink(urlBase: shipsImages) {
        const shipSkin = SocketHandler.instance.userData?.currentShipSkin
            ? SocketHandler.instance.userData?.currentShipSkin
            : "school";
        return urlBase.replace("@TYPE@", shipSkin);
    }

    static calcRank(exp: number) {
        const currentRank = Math.floor(Math.log2(exp / 100)) + 1;
        const curRankStart = Math.pow(2, currentRank - 1) * 100;
        const curExp = exp - curRankStart;
        const rankNextExp = Math.pow(2, currentRank) * 100;
        const rankNext = Math.pow(2, currentRank) * 100 - curRankStart;

        const expPercent = ((exp - curRankStart) / (rankNextExp - curRankStart)) * 100;
        return {
            curRank: currentRank,
            rankStart: curExp,
            rankNext: rankNext,
            percentage: expPercent,
        };
    }
}
