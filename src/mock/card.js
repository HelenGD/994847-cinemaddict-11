import {random, formatDuration, decimalRandom, randomArrayItem} from '../components/utils';
import {
  descriptions,
  genres,
  posters,
  titles
} from './strings';

const COMMENT_COUNT = 5;

const generateCard = () => {
  const commentsCount = random(0, COMMENT_COUNT);
  const year = random(1900, 2021);
  const rating = decimalRandom(0, 10, 1);

  return {
    title: randomArrayItem(titles),
    rating,
    poster: randomArrayItem(posters),
    year,
    duration: formatDuration(random(3600, 7200)),
    genre: randomArrayItem(genres),
    description: randomArrayItem(descriptions),
    commentsCount,
    isAddToWatch: true,
    isWatched: false,
    isFavourite: false
  };
};

const generateCards = (count) => {
  return Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};
