import Model from './model';
import Comments from './comments';
import Movie from './movie';

export default class Movies extends Model {
  constructor(api, filterModel) {
    super();
    this._movies = [];
    this._api = api;
    this._filterModel = filterModel;
  }

  load() {
    this._api.fetchMovies().then((movies) => {
      this.setMovies(movies);
    });
  }

  getMoviesAll() {
    return this._movies;
  }

  getMoviesByFilter() {
    switch (this._filterModel.getFilter()) {
      case `watchlist`:
        return this.getMoviesByWatchlist();
      case `history`:
        return this.getMoviesByWatched();
      case `favorites`:
        return this.getMoviesByFavorites();
      default:
        return this._movies;
    }
  }

  getMoviesByWatchlist() {
    return this._movies.filter((movie) => movie.isWatchlist);
  }

  getMoviesByWatched() {
    return this._movies.filter((movie) => movie.isWatched);
  }

  getMoviesByFavorites() {
    return this._movies.filter((movie) => movie.isFavorite);
  }

  getTopRatedMovies() {
    return this._movies
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
  }

  getMostCommentedMovies() {
    return this._movies
      .slice()
      .sort((a, b) => b.comments.getComments().length - a.comments.getComments().length)
      .slice(0, 2);
  }

  getTopDuration() {
    const topDuration = this.getMoviesByWatched().reduce((total, movie) => {
      return total + movie.runtime;
    }, 0);

    const date = new Date(0);
    date.setMinutes(topDuration);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return {hours, minutes};
  }

  setMovies(movies) {
    this._movies = movies.map((movie) => {
      if (movie instanceof Movie) {
        return movie;
      }

      return new Movie(this._api, movie);
    });

    this._movies.forEach((movie) => {
      movie.setDataChangeHandler(() => {
        this.callHandlers();
      });

      if (!(movie.comments instanceof Comments)) {
        movie.comments = new Comments(this._api, movie.id, movie.comments);
      }
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

  getGenresStatistics() {
    const genres = {};

    this._movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        genres[genre] = genres[genre] === undefined
          ? 1
          : genres[genre] + 1;
      });
    });

    return genres;
  }

  getTopGenre() {
    const genres = this.getGenresStatistics();
    return Object
      .keys(genres)
      .reduce((topGenre, genre) => {
        if (topGenre === ``) {
          return genre;
        }

        return genres[genre] > genres[topGenre]
          ? genre
          : topGenre;
      }, ``);
  }
}
