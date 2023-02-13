import { BackgroundAroundShips } from "./backgroundAroundShips";
import { ShipsCoordinates } from "./shipsCoordinates";

export class ShipsCoordinatesWithBackground {
  private shipCoordinates = new ShipsCoordinates();
  private backgroundAroundShip = new BackgroundAroundShips();

  getShipsCoordinatesWithBackground() {
    const ShipsCoordinates = this.shipCoordinates.getShipsCoordinates();
    this.backgroundAroundShip.renderAroundShip();
    const ShipsCoordinatesWithBackground = this.backgroundAroundShip.backgroundAroundShips;
    return {ShipsCoordinates, ShipsCoordinatesWithBackground}
  }
}