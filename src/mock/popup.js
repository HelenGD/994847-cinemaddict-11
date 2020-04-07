export const fillFilmDetails = (card) => {
  const filmDetailsEl = document.querySelector(`.film-details`);
  const filmDetailsTitleEl = filmDetailsEl.querySelector(`.film-details__title`);
  const filmDetailsRatingEl = filmDetailsEl.querySelector(`.film-details__total-rating`);
  const filmDetailsDirectorEl = filmDetailsEl.querySelector(`.film-details__cell-director`);
  const filmDetailsWritersEl = filmDetailsEl.querySelector(`.film-details__cell-writers`);
  const filmDetailsActorsEl = filmDetailsEl.querySelector(`.film-details__cell-actors`);
  const filmDetailsReleaseEl = filmDetailsEl.querySelector(`.film-details__cell-release`);
  const filmDetailsRuntimeEl = filmDetailsEl.querySelector(`.film-details__cell-runtime`);
  const filmDetailsCountriesEl = filmDetailsEl.querySelector(`.film-details__cell-country`);
  const filmDetailsGenreEl = filmDetailsEl.querySelectorAll(`.film-details__genre`);

  const {
    title,
    rating,
    directors,
    writers,
    actors,
    release,
    duration,
    countries,
    genre
  } = card;

  filmDetailsTitleEl.textContent = title;
  filmDetailsRatingEl.textContent = rating;
  filmDetailsDirectorEl.textContent = directors.join(`, `);
  filmDetailsWritersEl.textContent = writers.join(`, `);
  filmDetailsActorsEl.textContent = actors.join(`, `);
  filmDetailsReleaseEl.textContent = release;
  filmDetailsRuntimeEl.textContent = duration;
  filmDetailsCountriesEl.textContent = countries.join(`, `);
  filmDetailsGenreEl.textContent = genre.join(`, `);
};
