import AbstractComponent from "./abstract-component";

const createfilmDataTemplate = (filmData) => {
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
    comments,
    release,
  } = filmData;

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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comment${comments.length > 1 ? `s` : ``} <span class="film-details__comments-count">${comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${comments.map((comment) => `
                <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="${comment.emotion}" width="55" height="55" alt="emoji">
                </span>
                <div>
                  <p class="film-details__comment-text">${comment.text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${comment.author}</span>
                    <span class="film-details__comment-day">${comment.date}</span>
                    <button class="film-details__comment-delete">Delete</button>
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

export default class FilmCardDetailsComponent extends AbstractComponent {
  constructor() {
    super();
    this.isOpened = false;
    this._filmData = null;
    this._element = null;
    this._closeElement = null;
  }

  show(filmData) {
    this.isOpened = true;
    this._element = null;
    this._filmData = filmData;
    return this;
  }

  hide() {
    this.isOpened = false;
    this._filmData = null;
    this._closeElement = null;
    this.removeElement();
  }

  recoveryListeners() {

  }

  getTemplate() {
    return createfilmDataTemplate(this._filmData);
  }

  getCloseButtonElement() {
    if (!this._closeElement) {
      this._closeElement = this._element.querySelector(`.film-details__close-btn`);
    }

    return this._closeElement;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }

  getCommentsContainerElement() {
    return this.getElement().querySelector(`.film-details__comments-wrap`);
  }

  setCloseClickHandler(handler) {
    this.getCloseButtonElement().addEventListener(`click`, handler);
  }
}
