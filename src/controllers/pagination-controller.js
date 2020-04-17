import FilmCardComponent from "../components/film-card";
import {renderElement, remove} from "../utils/render";
import NoCardsComponent from "../components/no-cards";
import {checkEscPress} from "../utils/common";
import FilmCardDetailsComponent from "../components/film-details";
import ShowMoreButtonComponent from "../components/show-more-button";

const FILM_CARD_EXTRA_COUNT = 2;
const MAX_LENGTH_SHOWING_COMMENT = 140;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
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

export default class PaginationController {
  constructor(container) {
    this._container = container;
    this._currentCardsCount = SHOWING_CARDS_COUNT_ON_START;
  }

  slice(cards, callback) {
    const nextCards = cards.slice(0, this._currentCardsCount);
    callback(nextCards);
  }

  render(cards, callback) {
    if (cards.length <= SHOWING_CARDS_COUNT_ON_START) {
      return;
    }

    const showMoreButton = new ShowMoreButtonComponent();
    renderElement(
        this._container,
        showMoreButton
    );

    showMoreButton.setClickHandler(() => {
      this._currentCardsCount += SHOWING_CARDS_COUNT_BY_BUTTON;

      if (this._currentCardsCount >= cards.length) {
        remove(showMoreButton);
      }

      this.slice(cards, callback);
    });

    this.slice(cards, callback);
  }
}
