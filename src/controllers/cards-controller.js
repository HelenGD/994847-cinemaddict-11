import FilmCardComponent from "../components/film-card";
import {renderElement, remove} from "../utils/render";
import NoCardsComponent from "../components/no-cards";
import {checkEscPress} from "../utils/common";
import FilmCardDetailsComponent from "../components/film-details";
import ShowMoreButtonComponent from "../components/show-more-button";

const FILM_CARD_EXTRA_COUNT = 2;
const MAX_LENGTH_SHOWING_COMMENT = 140;
const SHOWING_CARDS_COUNT_ON_START = 5;

const filmCardDetails = new FilmCardDetailsComponent();

const renderFilmCardDetails = (evt, filmCard) => {
  if (filmCardDetails.isOpened) {
    return;
  }

  renderElement(document.body, filmCardDetails.show(filmCard.getCard()));

  const onClosePopup = () => {
    filmCardDetails.hide();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (event) => {
    checkEscPress(event, onClosePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  filmCardDetails.setCloseClickHandler(onClosePopup);

  document.addEventListener(`keydown`, onPopupEscPress);
};

export default class CardsController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    this._container.innerHTML = ``;

    if (!cards.length) {
      const noCards = new NoCardsComponent();
      renderElement(this._container, noCards);
    }

    cards
      .forEach((card) => {
        const filmCard = new FilmCardComponent(card);
        renderElement(this._container, filmCard);
        filmCard.setClickHandler((evt) => renderFilmCardDetails(evt, filmCard));
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
