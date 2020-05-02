import FilmCardComponent from "../components/film-card";
import {renderElement, remove} from "../utils/render";
import {checkEscPress} from "../utils/common";
import FilmCardDetailsComponent from "../components/film-details";
import EmojiesComponent from "../components/new-comment";

const filmCardDetails = new FilmCardDetailsComponent();

const renderFilmCardDetails = (evt, filmCard, emojiesComponent) => {
  if (filmCardDetails.isOpened) {
    return;
  }

  renderElement(
      document.body,
      filmCardDetails.show(filmCard.getCard())
  );

  const onClosePopup = () => {
    emojiesComponent.clearForm();
    filmCardDetails.hide();
    remove(filmCardDetails);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (event) => {
    checkEscPress(event, onClosePopup);
  };

  filmCardDetails.setCloseClickHandler(onClosePopup);

  document.addEventListener(`keydown`, onPopupEscPress);
};

export default class MovieController {
  constructor(container, {onButtonClick}) {
    this._container = container;
    this._filmCardComponent = null;
    this._emojiesComponent = null;
    this._onButtonClick = onButtonClick;
  }

  render(movie) {
    movie.comments.setDataChangeHandler(() => {
      filmCardDetails.rerender();
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          this._emojiesComponent
      );
    });
    this._filmCardComponent = new FilmCardComponent(movie);
    this._emojiesComponent = new EmojiesComponent(movie.comments);
    renderElement(this._container, this._filmCardComponent);
    this._filmCardComponent.setClickHandler((evt) => {
      renderFilmCardDetails(evt, this._filmCardComponent, this._emojiesComponent);
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          this._emojiesComponent
      );
      this._emojiesComponent.setClickOnEmoji();
    });
    this._filmCardComponent.setActionHandler(this._onButtonClick);
  }
}


