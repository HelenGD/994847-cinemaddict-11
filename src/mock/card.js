import {random, formatDuration, decimalRandom, randomArrayItem} from '../components/utils';
import {
  descriptions,
  genres,
  posters,
  titles
} from './strings';

const COMMENT_COUNT = 5;
export const MIN_FILM_DURATION = 3600;
export const MAX_FILM_DURATION = 7200;
const FIRST_FILM_YEAR = 1900;
const LAST_FILM_YEAR = 2021;
export const MAX_COUNT_RATING = 3;
export const DECIMAL_PLACES = 1;

export const generateCard = () => {
  const commentsCount = random(0, COMMENT_COUNT);
  const year = random(FIRST_FILM_YEAR, LAST_FILM_YEAR);
  const rating = decimalRandom(0, 10, 1);

  return {
    title: randomArrayItem(titles),
    rating,
    poster: randomArrayItem(posters),
    year,
    duration: formatDuration(random(MIN_FILM_DURATION, MAX_FILM_DURATION)),
    genre: randomArrayItem(genres),
    description: randomArrayItem(descriptions),
    commentsCount,
    isAddToWatch: true,
    isWatched: false,
    isFavourite: false
  };
};

export const generateCards = (count) => {
  return Array(count)
    .fill(``)
    .map(generateCard);
};
