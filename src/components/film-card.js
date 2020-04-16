import {createElement} from "./utils.js";

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
      isActive: isAddToWatch,
      icon: `add-to-watchlist`,
    },
    {
      isActive: isWatched,
      icon: `mark-as-watched`,
    },
    {
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
    <a class="film-card__comments">${comments.length} comment${comments.length !== 1 ? `s` : ``}</a>
    <form class="film-card__controls">
      ${buttons
        .map((button) => `<button class="film-card__controls-item button film-card__controls-item--${button.icon} ${button.isActive ? ACTIVE_CLASS_NAME : ``}"></button>`)
        .join(``)}
    </form>
  </article>`;
};

export default class FilmCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getCard() {
    return this._card;
  }
}
