import format from 'date-fns/format';
import {random, formatDuration, decimalRandom, randomArrayItem} from '../utils/common';
import {generateComments} from './comments';
import {
  descriptions,
  genres,
  posters,
  titles,
  originalTitles,
  ratingAges,
  countries,
  directors,
  writers,
  actors
} from './strings';

const MAX_COUNT_GENRES = 3;
const MIN_COUNT_GENRES = 1;
const MAX_COUNT_DESCRIPTION = 8;
const MIN_COUNT_DESCRIPTION = 3;
const MAX_COMMENTS_COUNT = 10;
const MAX_COUNT_RATING = 3;
const DECIMAL_PLACES = 1;
const MIN_FILM_DURATION = 3600;
const MAX_FILM_DURATION = 7200;
const POSTERS_ROOT = `./images/posters/`;

export const generateDetailsOfFilm = () => {
  return {
    title: randomArrayItem(titles),
    rating: decimalRandom(0, MAX_COUNT_RATING, DECIMAL_PLACES),
    description: descriptions.slice().splice(random(0, descriptions.length - MAX_COUNT_DESCRIPTION), random(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)).join(``),
    descriptionShort: randomArrayItem(descriptions),
    duration: formatDuration(random(MIN_FILM_DURATION, MAX_FILM_DURATION)),
    directors: randomArrayItem(directors),
    writers: randomArrayItem(writers),
    actors: randomArrayItem(actors),
    release: format(Date.now(), `d MMMM yyyy`),
    releaseYear: format(Date.now(), `yyyy`),
    countries: randomArrayItem(countries),
    genres: genres.slice().splice(random(0, genres.length - MAX_COUNT_GENRES), random(MIN_COUNT_GENRES, MAX_COUNT_GENRES)),
    originalTitle: randomArrayItem(originalTitles),
    ratingAge: randomArrayItem(ratingAges),
    poster: `${POSTERS_ROOT}${randomArrayItem(posters)}`,
    comments: generateComments(random(0, MAX_COMMENTS_COUNT)),
    isAddToWatch: true,
    isWatched: false,
    isFavourite: false
  };
};

export const generateCards = (count) => {
  return Array(count)
    .fill(``)
    .map(generateDetailsOfFilm);
};
