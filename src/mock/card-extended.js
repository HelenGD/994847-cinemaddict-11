import format from 'date-fns/format';
import {random, formatDuration, decimalRandom, randomArrayItem} from '../components/utils';
import {generateComments} from '../mock/comments';
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

export const generateDetailsOfFilm = () => {
  const rating = decimalRandom(0, 10, 1);

  const MAX_COUNT_GENRES = 3;
  const MIN_COUNT_GENRES = 1;
  const MAX_COUNT_DESCRIPTION = 8;
  const MIN_COUNT_DESCRIPTION = 3;

  return {
    title: randomArrayItem(titles),
    rating,
    description: descriptions.slice().splice(random(0, descriptions.length - MAX_COUNT_DESCRIPTION), random(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)).join(``),
    duration: formatDuration(random(3600, 7200)),
    directors: randomArrayItem(directors),
    writers: randomArrayItem(writers),
    actors: randomArrayItem(actors),
    release: format(Date.now(), `d MMMM yyyy`),
    countries: randomArrayItem(countries),
    genres: genres.slice().splice(random(0, genres.length - MAX_COUNT_GENRES), random(MIN_COUNT_GENRES, MAX_COUNT_GENRES)),
    originalTitle: randomArrayItem(originalTitles),
    ratingAge: randomArrayItem(ratingAges),
    poster: randomArrayItem(posters),
    comments: generateComments()
  };
};
