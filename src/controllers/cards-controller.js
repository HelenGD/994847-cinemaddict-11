import {renderElement} from "../utils/render";
import NoCardsComponent from "../components/no-cards";
import MovieController from "./movie-controller";

const MAX_LENGTH_SHOWING_COMMENT = 140;

export default class CardsController {
  constructor(
      container,
      {onWatchlistClick, onWatchedClick, onFavoritesClick}
  ) {
    this._container = container;
    this._movieController = new MovieController(
        container,
        {onWatchlistClick, onWatchedClick, onFavoritesClick}
    );
  }

  render(cards) {
    this._container.innerHTML = ``;

    if (!cards.length) {
      const noCards = new NoCardsComponent();
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
  }
}
