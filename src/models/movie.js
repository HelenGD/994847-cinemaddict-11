import format from 'date-fns/format';
import Model from './model';
import {formatDuration} from '../utils/common';

export default class Movie extends Model {
  constructor(api, data) {
    super();

    this._api = api;

    const info = data.film_info;
    const comments = data.comments;
    const id = data.id;
    const details = data.user_details;

    this.id = id;
    this.comments = comments;
    this.actors = info.actors;
    this.ratingAge = info.age_rating;
    this.originalTitle = info.alternative_title;
    this.description = info.description;
    this.directors = info.director;
    this.genres = info.genre;
    this.poster = info.poster;
    this.releaseDate = new Date(info.release.date);
    this.release = format(this.releaseDate, `d MMMM yyyy`);
    this.countries = info.release.release_country;
    this.runtime = info.runtime;
    this.title = info.title;
    this.rating = info.total_rating;
    this.writers = info.writers;
    this.releaseYear = this.releaseDate.getFullYear();
    this.duration = formatDuration(info.runtime);
    this.watchingDate = new Date(details.watching_date);
    this.isWatched = details.already_watched;
    this.isFavorite = details.favorite;
    this.isWatchlist = details.watchlist;
  }

  update() {
    this._api.updateMovie(this.id, {
      'comments': this.comments.getComments().map(({id}) => id),
      'user_details': {
        'already_watched': this.isWatched,
        'favorite': this.isFavorite,
        'watchlist': this.isWatchlist,
        'watching_date': this.watchingDate
      },
      'film_info': {
        'actors': this.actors,
        'age_rating': this.ratingAge,
        'alternative_title': this.originalTitle,
        'description': this.description,
        'director': this.directors,
        'genre': this.genres,
        'poster': this.poster,
        'release': {
          'date': this.releaseDate.toISOString(),
          'release_country': this.countries
        },
        'runtime': this.runtime,
        'title': this.title,
        'total_rating': this.rating,
        'writers': this.writers
      },
    });

    this.callHandlers();
  }

  toggleUserDetails(type) {
    if (type === `watchlist`) {
      this.isWatchlist = !this.isWatchlist;
    } else if (type === `watched`) {
      this.isWatched = !this.isWatched;
    } else if (type === `favorite`) {
      this.isFavorite = !this.isFavorite;
    }

    this.update();
  }
}
