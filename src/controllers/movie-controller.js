import FilmCardComponent from "../components/film-card-component";
import {renderElement, remove} from "../utils/render";
import {checkEscPress} from "../utils/common";
import FilmCardDetailsComponent from "../components/film-card-details-component";
import NewCommentComponent from "../components/new-comment-component";

const filmCardDetails = new FilmCardDetailsComponent();
const newCommentComponent = new NewCommentComponent();

const escPressHandlers = [];

const renderFilmCardDetails = (evt, movieModel) => {
  while (escPressHandlers.length > 0) {
    const handler = escPressHandlers.pop();
    document.removeEventListener(`keydown`, handler);
  }

  const closeHandler = () => {
    newCommentComponent.clearForm();
    filmCardDetails.hide();
    newCommentComponent.removeListeners();
    remove(filmCardDetails);
    document.removeEventListener(`keydown`, escPressHandler);
  };

  const escPressHandler = (event) => {
    checkEscPress(event, closeHandler);
  };

  escPressHandlers.push(escPressHandler);

  renderElement(
      document.body,
      filmCardDetails.show(movieModel)
  );
  newCommentComponent.clearForm();

  filmCardDetails.addCloseClickHandler(closeHandler);
  document.addEventListener(`keydown`, escPressHandler);
};

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._filmCardComponent = null;
  }

  render(movieModel) {
    movieModel.comments.addDataChangeHandler(() => {
      if (!filmCardDetails.isOpened) {
        return;
      }

      filmCardDetails.rerender();
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          newCommentComponent
      );
      newCommentComponent.recoveryListeners();
    });
    this._filmCardComponent = new FilmCardComponent(movieModel);
    renderElement(this._container, this._filmCardComponent);
    this._filmCardComponent.addClickHandler((evt) => {
      newCommentComponent.setCommentsModel(movieModel.comments);
      renderFilmCardDetails(evt, movieModel);
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          newCommentComponent
      );
      movieModel.comments.load();
      newCommentComponent.addEmojiClickHandler();
    });
    this._filmCardComponent.addButtonClickHandler((currentMovieModel, buttonType) => {
      currentMovieModel.toggleUserDetails(buttonType);
    });
  }
}


