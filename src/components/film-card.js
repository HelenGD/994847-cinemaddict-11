export const createFilmCardTemplate = (card) => {
  const {
    title,
    rating,
    poster,
    year,
    duration,
    description,
    genre,
    commentsCount,
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
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentsCount} comment${commentsCount > 1 ? `s` : ``}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addToWatchButtonActiveClass}"></button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">${watchedButtonActiveClass}</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">${favouriteButtonActiveClass}</button>
    </form>
  </article>`;
};
