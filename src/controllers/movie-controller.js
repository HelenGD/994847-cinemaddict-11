import FilmCardComponent from "../components/film-card";
import {renderElement} from "../utils/render";
import {checkEscPress} from "../utils/common";
import FilmCardDetailsComponent from "../components/film-details";
import EmojiesComponent from "../components/new-comment";

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

export default class MovieController {
  constructor(container, {onButtonClick}) {
    this._container = container;
    this._filmCardComponent = null;
    this._emojiesComponent = null;
    this._onButtonClick = onButtonClick;
  }

  render(card) {
    this._filmCardComponent = new FilmCardComponent(card);
    this._emojiesComponent = new EmojiesComponent();
    renderElement(this._container, this._filmCardComponent);
    this._filmCardComponent.setClickHandler((evt) => {
      renderFilmCardDetails(evt, this._filmCardComponent);
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          this._emojiesComponent
      );
      this._emojiesComponent.setClickOnEmoji();
    });
    this._filmCardComponent.setActionHandler(this._onButtonClick);
  }
}


