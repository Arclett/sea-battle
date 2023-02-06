import "./styles/main.scss";

import { Main } from "./scripts/classes/Main";

const main = new Main();

main.start();
main.appRouting(location.hash);
