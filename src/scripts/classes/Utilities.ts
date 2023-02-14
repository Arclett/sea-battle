export class Utilities {
    static randomNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static getDate() {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}
