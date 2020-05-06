import FilmCardComponent from "../components/film-card-component";
import {renderElement, remove} from "../utils/render";
import {checkEscPress} from "../utils/common";
import FilmCardDetailsComponent from "../components/film-card-details-component";
import NewCommentComponent from "../components/new-comment-component";

const filmCardDetails = new FilmCardDetailsComponent();
const newCommentComponent = new NewCommentComponent();

const renderFilmCardDetails = (evt, movieModel) => {
  renderElement(
      document.body,
      filmCardDetails.show(movieModel)
  );
  newCommentComponent.clearForm();

  const closeHandler = () => {
    newCommentComponent.clearForm();
    filmCardDetails.hide();
    remove(filmCardDetails);
    document.removeEventListener(`keydown`, escPressHandler);
    newCommentComponent.removeListeners();
  };

  const escPressHandler = (event) => {
    checkEscPress(event, closeHandler);
  };

  filmCardDetails.setCloseClickHandler(closeHandler);

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
      renderFilmCardDetails(evt, movieModel, newCommentComponent);
      renderElement(
          filmCardDetails.getCommentsContainerElement(),
          newCommentComponent
      );
      movieModel.comments.load();
      newCommentComponent.emojiClickHandler();
    });
    this._filmCardComponent.setButtonHandler((currentMovieModel, buttonType) => {
      currentMovieModel.toggleUserDetails(buttonType);
    });
  }
}


