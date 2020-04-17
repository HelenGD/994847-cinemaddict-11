import format from 'date-fns/format';
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
    date: format(Date.now(), `yyyy/M/d h:m`)
  };
};

export const generateComments = (count) => {
  return Array(count)
    .fill(``)
    .map(generateComment);
};
