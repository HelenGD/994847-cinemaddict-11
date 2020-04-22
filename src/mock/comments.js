import formatDistance from 'date-fns/formatDistance';
import {randomArrayItem} from '../utils/common';

import {
  emotions,
  authors,
  texts
} from './strings';

const EMOTIONS_ROOT = `./images/emoji/`;

const generateComment = () => {

  return {
    text: randomArrayItem(texts),
    emotion: `${EMOTIONS_ROOT}${randomArrayItem(emotions)}`,
    author: randomArrayItem(authors),
    date: formatDistance(
        Date.now(),
        Date.parse(`2023-10-24`),
        {includeSeconds: true}
    )
  };
};

export const generateComments = (count) => {
  return Array(count)
    .fill(``)
    .map(generateComment);
};
