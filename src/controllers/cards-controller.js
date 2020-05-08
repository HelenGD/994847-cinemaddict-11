import {renderElement} from "../utils/render";
import NoCardsComponent from "../components/no-cards-component";
import MovieController from "./movie-controller";

export default class CardsController {
  constructor(container) {

    this._isLoading = true;
    this._container = container;
    this._movieController = new MovieController(container);
  }

  clear() {
    this._container.innerHTML = ``;
  }

  render(cards) {
    this.clear();

    if (!cards.length) {
      const noCards = new NoCardsComponent(this._isLoading);
      renderElement(this._container, noCards);
    }

    cards
      .forEach((card) => {
        this._movieController.render(card);
      });

    this._isLoading = false;
  }
}
