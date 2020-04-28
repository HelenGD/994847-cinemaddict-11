import Model from './model';
import Comment from './comment';

export default class Movie extends Model {
  constructor(filterModel) {
    super();
    this._movies = [];
    this._filterModel = filterModel;
  }

  getMoviesAll() {
    return this._movies;
  }

  getMoviesByFilter() {
    if (this._filterModel.getFilter() === `watchlist`) {
      return this.getMoviesByWatchlist();
    }
    if (this._filterModel.getFilter() === `history`) {
      return this.getMoviesByWatched();
    }
    if (this._filterModel.getFilter() === `favorites`) {
      return this.getMoviesByFavorites();
    }

    return this._movies;
  }

  getMoviesByWatchlist() {
    return this._movies.filter((movie) => movie.isAddToWatch);
  }

  getMoviesByWatched() {
    return this._movies.filter((movie) => movie.isWatched);
  }

  getMoviesByFavorites() {
    return this._movies.filter((movie) => movie.isFavourite);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._movies.forEach((movie) => {
      movie.comments = new Comment(movie.comments);
    });
    this.callHandlers();
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this.callHandlers();

    return true;
  }
}
