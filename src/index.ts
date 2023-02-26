import "./styles/main.scss";

import { Main } from "./scripts/classes/Main";
import { SocketHandler } from "./scripts/classes/SocketHandler";
import { Visitor } from "./scripts/classes/Visitor";

const main = new Main();

SocketHandler.instance = new SocketHandler();
Visitor.instance = new Visitor();
main.start();
main.appRouting(location.hash);
if (SocketHandler.instance.socket) {
    main.appRouting(location.hash);
} else {
    main.appRouting(" ");
}
