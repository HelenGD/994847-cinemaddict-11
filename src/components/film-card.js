import {createElement} from "./utils.js";

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
  const addToWatchButtonActiveClass = isAddToWatch ? `film-card__controls-item--active` : ``;
  const watchedButtonActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favouriteButtonActiveClass = isFavourite ? `film-card__controls-item--active` : ``;

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
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addToWatchButtonActiveClass}"></button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">${watchedButtonActiveClass}</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">${favouriteButtonActiveClass}</button>
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
