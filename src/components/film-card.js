import AbstractComponent from "./abstract-component.js";

const ACTIVE_CLASS_NAME = `film-card__controls-item--active`;

const createFilmCardTemplate = (card) => {
  const {
    title,
    rating,
    poster,
    releaseYear,
    duration,
    descriptionShort,
    genres,
    comments,
    isAddToWatch,
    isWatched,
    isFavourite
  } = card;

  const buttons = [
    {
      type: `watchlist`,
      isActive: isAddToWatch,
      icon: `add-to-watchlist`,
    },
    {
      type: `watched`,
      isActive: isWatched,
      icon: `mark-as-watched`,
    },
    {
      type: `favorite`,
      isActive: isFavourite,
      icon: `favorite`
    }
  ];

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${descriptionShort}</p>
    <a class="film-card__comments">${comments.getComments().length} comment${comments.getComments().length !== 1 ? `s` : ``}</a>
    <form class="film-card__controls">
      ${buttons
        .map((button) => `<button data-type="${button.type}" class="film-card__controls-item button film-card__controls-item--${button.icon} ${button.isActive ? ACTIVE_CLASS_NAME : ``}"></button>`)
        .join(``)}
    </form>
  </article>`;
};

export default class FilmCardComponent extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  getCard() {
    return this._card;
  }

  setClickHandler(handler) {
    const clicks = this.getElement().querySelectorAll(`.film-card__poster`);
    clicks.forEach((it) => it.addEventListener(`click`, this._handleActionClick(handler)));
  }

  _handleActionClick(handler, buttonType) {
    return (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      handler(this._card, buttonType);
    };
  }

  setActionHandler(handler) {
    const buttons = this.getElement().querySelectorAll(`.film-card__controls-item`);
    buttons.forEach((it) => it.addEventListener(`click`, this._handleActionClick(handler, it.dataset.type)));
  }
}
