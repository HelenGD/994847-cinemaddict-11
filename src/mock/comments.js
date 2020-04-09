import format from 'date-fns/format';
import {randomArrayItem} from '../components/utils';

import {
  emotions,
  authors,
  texts
} from './strings';

const COMMENTS_COUNT = 10;

const generateComment = () => {

  return {
    text: randomArrayItem(texts),
    emotion: randomArrayItem(emotions),
    author: randomArrayItem(authors),
    date: format(Date.now(), `yyyy/M/d h:m`)
  };
};

export const generateComments = () => {
  return Array(COMMENTS_COUNT)
    .fill(``)
    .map(generateComment);
};
