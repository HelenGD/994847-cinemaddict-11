import format from 'date-fns/format';
import {randomArrayItem} from '../components/utils';

import {
  emotions,
  authors,
  texts
} from './strings';

const generateComment = () => {

  return {
    text: randomArrayItem(texts),
    emotion: randomArrayItem(emotions),
    author: randomArrayItem(authors),
    date: format(Date.now(), `yyyy/M/d h:m`)
  };
};

export const generateComments = () => {
  return Array(10)
    .fill(``)
    .map(generateComment);
};
