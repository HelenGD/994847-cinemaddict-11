import {renderElement, remove} from "../utils/render";
import ShowMoreButtonComponent from "../components/show-more-button";

const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;

export default class PaginationController {
  constructor(container, moviesModel) {
    this._isNextShowing = false;
    this._container = container;
    this._currentCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._moviesModel = moviesModel;
  }

  reset() {
    this._currentCardsCount = SHOWING_CARDS_COUNT_ON_START;
  }

  slice(callback) {
    const movies = this._moviesModel.getMoviesAll();
    const nextMovies = movies.slice(0, this._currentCardsCount);
    callback(nextMovies);
  }

  render(callback) {
    const movies = this._moviesModel.getMoviesAll();
    if (movies.length <= SHOWING_CARDS_COUNT_ON_START) {
      return;
    }

    if (!this._isNextShowing) {
      const showMoreButton = new ShowMoreButtonComponent();
      renderElement(
          this._container,
          showMoreButton
      );
      this._isNextShowing = true;

      showMoreButton.setClickHandler(() => {
        this._currentCardsCount += SHOWING_CARDS_COUNT_BY_BUTTON;
        if (this._currentCardsCount >= movies.length) {
          remove(showMoreButton);
          this._isNextShowing = false;
        }
        this.slice(callback);
      });
    }

    this.slice(callback);
  }
}
