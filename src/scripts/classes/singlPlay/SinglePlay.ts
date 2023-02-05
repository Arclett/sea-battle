import { GetUserData } from "../../types/interfaces";

export class SinglePlay {
    userData: GetUserData | undefined;

    constructor(userData: GetUserData | undefined) {
        this.userData = userData;
        console.log(userData);
    }
}
