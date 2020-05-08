import format from 'date-fns/format';
import Model from './model';
import {formatDuration, toClamp} from '../utils/common';
import Comments from './comments';

const MAX_LENGTH_SHOWING_COMMENT = 139;

export default class Movie extends Model {
  constructor(api, rawMovie) {
    super();

    this._api = api;

    const id = rawMovie.id;
    const info = rawMovie.film_info;
    const comments = new Comments(this._api, id, rawMovie.comments);

    comments.addDataChangeHandler(() => {
      this.callHandlers();
    });

    const details = rawMovie.user_details;
    this.id = id;
    this.comments = comments;
    this.actors = info.actors;
    this.ratingAge = info.age_rating;
    this.originalTitle = info.alternative_title;
    this.description = info.description;
    this.descriptionClamped = toClamp(info.description, MAX_LENGTH_SHOWING_COMMENT);
    this.director = info.director;
    this.genres = info.genre;
    this.poster = info.poster;
    this.releaseDate = new Date(info.release.date);
    this.release = format(this.releaseDate, `dd MMMM yyyy`);
    this.country = info.release.release_country;
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
      'id': this.id,
      'comments': this.comments.getComments().map(({id}) => id),
      'user_details': {
        'already_watched': this.isWatched,
        'favorite': this.isFavorite,
        'watchlist': this.isWatchlist,
        'watching_date': this.watchingDate.toISOString()
      },
      'film_info': {
        'actors': this.actors,
        'age_rating': this.ratingAge,
        'alternative_title': this.originalTitle,
        'description': this.description,
        'director': this.director,
        'genre': this.genres,
        'poster': this.poster,
        'release': {
          'date': this.releaseDate.toISOString(),
          'release_country': this.country
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
