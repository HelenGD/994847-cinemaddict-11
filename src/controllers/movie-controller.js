import FilmCardComponent from "../components/film-card";
import {renderElement, remove} from "../utils/render";
import {checkEscPress} from "../utils/common";
import FilmCardDetailsComponent from "../components/film-details";
import NewCommentComponent from "../components/new-comment";

const filmCardDetails = new FilmCardDetailsComponent();
const newCommentComponent = new NewCommentComponent();

const renderFilmCardDetails = (evt, movieModel) => {
  if (filmCardDetails.isOpened) {
    return;
  }

  renderElement(
      document.body,
      filmCardDetails.show(movieModel)
  );

  const onClosePopup = () => {
    newCommentComponent.clearForm();
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
    this._onButtonClick = onButtonClick;
  }

  render(movieModel) {
    movieModel.comments.setDataChangeHandler(() => {
      filmCardDetails.rerender();
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          newCommentComponent
      );
      newCommentComponent.setClickOnEmoji();
    });
    this._filmCardComponent = new FilmCardComponent(movieModel);
    
    renderElement(this._container, this._filmCardComponent);
    this._filmCardComponent.setClickHandler((evt) => {
      newCommentComponent.setCommentsModel(movieModel.comments);
      renderFilmCardDetails(evt, movieModel, newCommentComponent);
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          newCommentComponent
      );
      movieModel.comments.load();
      newCommentComponent.setClickOnEmoji();
    });
    this._filmCardComponent.setActionHandler(this._onButtonClick);
  }
}


