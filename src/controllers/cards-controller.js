import {renderElement} from "../utils/render";
import NoCardsComponent from "../components/no-cards";
import MovieController from "./movie-controller";

const MAX_LENGTH_SHOWING_COMMENT = 139;

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

    const filmsListContainersEl = document.querySelectorAll(`.films-list--extra .films-list__container`);
    filmsListContainersEl.forEach(() => {
      document
        .querySelectorAll(`.film-card__description`)
        .forEach((filmCardDescriptionEl) => {
          const filmCardDescription = filmCardDescriptionEl.textContent;
          let cutDescription = filmCardDescription.substring(0, MAX_LENGTH_SHOWING_COMMENT);
          if (cutDescription.length < filmCardDescription.length) {
            cutDescription += `...`;
          }
          filmCardDescriptionEl.textContent = cutDescription;
        });
    });

    this._isLoading = false;
  }
}
