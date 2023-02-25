import "./styles/main.scss";

import { Main } from "./scripts/classes/Main";
import { SocketHandler } from "./scripts/classes/SocketHandler";

const main = new Main();

SocketHandler.instance = new SocketHandler();
main.start();
main.appRouting(location.hash);
if (SocketHandler.instance.socket) {
    main.appRouting(location.hash);
} else {
    main.appRouting(" ");
}
