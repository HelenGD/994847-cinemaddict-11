import {encode} from 'he';
import AbstractSmartComponent from "./abstract-smart-component";

const createfilmDataTemplate = (movieModel) => {
  const {
    title,
    genres,
    writers,
    duration,
    rating,
    originalTitle,
    directors,
    actors,
    countries,
    description,
    ratingAge,
    poster,
    release,
    comments,
    isWatchlist,
    isWatched,
    isFavorite
  } = movieModel;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${ratingAge}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${directors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">
                    ${writers}
                  </td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell film-details__cell-actors">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell film-details__cell-release">${release}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell film-details__cell-runtime">
                    ${duration}
                  </td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell film-details__cell-country">${countries}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${genres.length > 1 ? `s` : ``}</td>
                  <td class="film-details__cell">
                    ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
          <section class="film-details__controls">
            <input ${isWatchlist ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" value="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input ${isWatched ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" value="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input ${isFavorite ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" value="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
              Comment${comments.getComments().length > 1 ? `s` : ``} <span class="film-details__comments-count">${comments.getComments().length}</span>
            </h3>
            <ul class="film-details__comments-list">
              ${comments.getComments().map((comment) => `
                <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  ${comment.emotion ? `<img src="${comment.emotion}" width="55" height="55" alt="emoji">` : ``}
                </span>
                <div>
                  <p class="film-details__comment-text">${encode(comment.text)}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${comment.author}</span>
                    <span class="film-details__comment-day">${comment.humanDate}</span>
                    <button ${comment.isDeleting ? `disabled` : ``} data-id="${comment.id}" class="film-details__comment-delete">
                      ${comment.isDeleting ? `Deleting...` : `Delete`}
                    </button>
                  </p>
                </div>
              </li>
              `).join(``)}
            </ul>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmCardDetailsComponent extends AbstractSmartComponent {
  constructor() {
    super();
    this.isOpened = false;
    this._movieModel = null;
    this._element = null;
    this._closeElement = null;
  }

  show(movieModel) {
    this.isOpened = true;
    this._movieModel = movieModel;
    return this;
  }

  hide() {
    this.isOpened = false;
    this._closeElement = null;
    this._movieModel = null;
  }

  recoveryListeners() {
    this.setCloseClickHandler(this._closeHandler);
    this.setCommentDeleteHandle();
    this.setUserDetailsChange();
  }

  getTemplate() {
    return createfilmDataTemplate(this._movieModel);
  }

  getCloseButtonElement() {
    if (!this._closeElement) {
      this._closeElement = this._element.querySelector(`.film-details__close-btn`);
    }

    return this._closeElement;
  }

  getCommentsContainerElement() {
    return this.getElement().querySelector(`.film-details__comments-wrap`);
  }

  _handleActionClick(handler) {
    return (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      handler(this._card);
    };
  }

  setCloseClickHandler(handler) {
    this._closeHandler = handler;
    this.getCloseButtonElement().addEventListener(`click`, this._handleActionClick(this._closeHandler));
  }

  afterRender() {
    this.setCommentDeleteHandle();
    this.setUserDetailsChange();
  }

  beforeRerender() {
    this._closeElement = null;
  }

  setCommentDeleteHandle() {
    this
      .getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((element) => {
        element.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const commentId = evt.target.dataset.id;
          this._movieModel.comments.deleteCommentById(commentId);
        });
      });
  }

  setUserDetailsChange() {
    this
      .getElement()
      .querySelectorAll(`.film-details__control-input`)
      .forEach((element) => {
        element.addEventListener(`change`, (evt) => {
          this._movieModel.toggleUserDetails(evt.target.value);
        });
      });
  }
}
