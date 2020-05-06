import differenceInDays from 'date-fns/differenceInDays';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInYears from 'date-fns/differenceInYears';
import Model from './model';
import Comments from './comments';
import Movie from './movie';
import {cardsSort} from '../utils/cards-sort';

const TOP_RATED_MOVIES_COUNT = 2;
const MOST_COMMENTED_MOVIES_COUNT = 2;
const MINUTES_PER_HOUR = 60;
const MAX_FAN = 20;
const MAX_NOVICE = 10;

export default class Movies extends Model {
  constructor(api, filterModel) {
    super();
    this._movies = [];
    this._api = api;
    this._filterModel = filterModel;
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

  getMoviesByWatched(filter = `all-time`) {
    const filterMap = {
      'today': differenceInDays,
      'week': differenceInWeeks,
      'month': differenceInMonths,
      'year': differenceInYears,
      'all-time': () => 0,
    };

    return this._movies.filter(({isWatched, watchingDate}) => {
      return isWatched && Math.abs(filterMap[filter](Date.now(), watchingDate)) < 1;
    });
  }

  getMoviesByFavorites() {
    return this._movies.filter((movie) => movie.isFavorite);
  }

  getTopRatedMovies() {
    return this._movies
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, TOP_RATED_MOVIES_COUNT);
  }

  getMostCommentedMovies() {
    return this._movies
      .slice()
      .sort((a, b) => b.comments.getComments().length - a.comments.getComments().length)
      .slice(0, MOST_COMMENTED_MOVIES_COUNT);
  }

  getTopDuration(filter) {
    const topDuration = this.getMoviesByWatched(filter).reduce((total, movie) => {
      return total + movie.runtime;
    }, 0);

    const hours = parseInt(topDuration / MINUTES_PER_HOUR, 10);
    const minutes = topDuration - hours * MINUTES_PER_HOUR;

    return {
      hours,
      minutes,
    };
  }

  getGenresStatistics(filter) {
    const genres = {};

    this.getMoviesByWatched(filter).forEach((movie) => {
      movie.genres.forEach((genre) => {
        genres[genre] = genres[genre] === undefined
          ? 1
          : genres[genre] + 1;
      });
    });

    return genres;
  }

  getTopGenre(filter) {
    const genres = this.getGenresStatistics(filter);

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

  getRank() {
    const watchedCount = this.getMoviesByWatched().length;

    if (watchedCount > MAX_FAN) {
      return `movie buff`;
    } else if (watchedCount > MAX_NOVICE) {
      return `fan`;
    } else if (watchedCount > 0) {
      return `novice`;
    }

    return ``;
  }

  setMovies(movies) {
    this._movies = movies.map((movie) => {
      if (movie instanceof Movie) {
        return movie;
      }

      return new Movie(this._api, movie);
    });

    this._movies.forEach((movie) => {
      movie.dataChangeHandler(() => {
        this.callHandlers();
      });

      if (!(movie.comments instanceof Comments)) {
        movie.comments = new Comments(this._api, movie.id, movie.comments);
      }
    });
    this.callHandlers();
  }

  load() {
    this._api.fetchMovies().then((movies) => {
      const movieModels = movies.map((movie) => new Movie(this._api, movie));

      this.setMovies(cardsSort(movieModels));
    });
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
