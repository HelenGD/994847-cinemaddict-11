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
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  reset() {
    this._isNextShowing = false;
    this._currentCardsCount = SHOWING_CARDS_COUNT_ON_START;
  }

  slice(callback) {
    const movies = this._moviesModel.getMoviesByFilter();
    const nextMovies = movies.slice(0, this._currentCardsCount);
    callback(nextMovies);
  }

  render(callback) {
    if (this._moviesModel.getMoviesByFilter().length <= SHOWING_CARDS_COUNT_ON_START) {
      remove(this._showMoreButtonComponent);
      this.slice(callback);
      return;
    }

    if (!this._isNextShowing) {
      renderElement(
          this._container,
          this._showMoreButtonComponent
      );
      this._isNextShowing = true;

      this._showMoreButtonComponent.setClickHandler(() => {
        const movies = this._moviesModel.getMoviesByFilter();
        this._currentCardsCount += SHOWING_CARDS_COUNT_BY_BUTTON;
        if (this._currentCardsCount >= movies.length) {
          remove(this._showMoreButtonComponent);
          this._isNextShowing = false;
        }
        this.slice(callback);
      });
    }

    this.slice(callback);
  }
}
