export default class Movies {
  constructor() {
    this._movies = [];
    this._filter = `all`; // all, watchlist, history, favorites
    this._dataChangeHandlers = [];
  }

  getMoviesAll() {
    return this._movies;
  }

  getMoviesByFilter() {
    if (this._filter === `watchlist`) {
      this._movies.filter((movie) => movie.isAddToWatch);
    }
    if (this._filter === `history`) {
      this._movies.filter((movie) => movie.isWatched);
    }
    if (this._filter === `favorites`) {
      this._movies.filter((movie) => movie.isFavourite);
    }

    return this._movies;
  }

  setFilter(newFilter) {
    this._filter = newFilter;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers();
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers();

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers() {
    this._dataChangeHandlers.forEach((handler) => handler());
  }
}
