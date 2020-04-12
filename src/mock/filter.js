import {random} from '../components/utils';
import {
  filterNames
} from './strings';

const ALL_MOVIES_COUNT = 15;

export const generateFilters = () => {
  return filterNames.map((it, index) => {
    return {
      name: it,
      isActive: !index,
      count: index ? random(0, ALL_MOVIES_COUNT) : undefined,
    };
  });
};

