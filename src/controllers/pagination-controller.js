import {renderElement, remove} from "../utils/render";
import ShowMoreButtonComponent from "../components/show-more-button";

const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;

export default class PaginationController {
  constructor(container) {
    this._container = container;
    this._currentCardsCount = SHOWING_CARDS_COUNT_ON_START;
  }

  slice(cards, callback) {
    const nextCards = cards.current.slice(0, this._currentCardsCount);
    callback(nextCards);
  }

  render(cards, callback) {
    if (cards.current.length <= SHOWING_CARDS_COUNT_ON_START) {
      return;
    }

    const showMoreButton = new ShowMoreButtonComponent();
    renderElement(
        this._container,
        showMoreButton
    );

    showMoreButton.setClickHandler(() => {
      this._currentCardsCount += SHOWING_CARDS_COUNT_BY_BUTTON;

      if (this._currentCardsCount >= cards.current.length) {
        remove(showMoreButton);
      }
      this.slice(cards, callback);
    });

    this.slice(cards, callback);
  }
}
