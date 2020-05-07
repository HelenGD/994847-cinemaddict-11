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
  };

  const escPressHandler = (event) => {
    checkEscPress(event, closeHandler);
    document.removeEventListener(`keydown`, escPressHandler);
  };

  escPressHandlers.push(escPressHandler);

  renderElement(
      document.body,
      filmCardDetails.show(movieModel)
  );
  newCommentComponent.clearForm();

  filmCardDetails.closeClickHandler(closeHandler);
  document.addEventListener(`keydown`, escPressHandler);
};

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._filmCardComponent = null;
  }

  render(movieModel) {
    movieModel.comments.dataChangeHandler(() => {
      filmCardDetails.rerender();
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          newCommentComponent
      );
      newCommentComponent.emojiClickHandler();
    });
    this._filmCardComponent = new FilmCardComponent(movieModel);
    renderElement(this._container, this._filmCardComponent);
    this._filmCardComponent.setClickHandler((evt) => {
      newCommentComponent.setCommentsModel(movieModel.comments);
      renderFilmCardDetails(evt, movieModel);
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          newCommentComponent
      );
      movieModel.comments.load();
      newCommentComponent.emojiClickHandler();
    });
    this._filmCardComponent.buttonClickHandler((currentMovieModel, buttonType) => {
      currentMovieModel.toggleUserDetails(buttonType);
    });
  }
}


