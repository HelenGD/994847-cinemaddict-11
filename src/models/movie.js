import format from 'date-fns/format';
import Model from './model';
import {formatDuration} from '../utils/common';

export default class Movie extends Model {
  constructor(data) {
    super();

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
    this.isWatched = details.already_watched;
    this.isFavorite = details.favorite;
    this.isWatchlist = details.watchlist;
  }
}
