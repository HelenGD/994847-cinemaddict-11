import {random} from '../components/utils';

const ALL_MOVIES_COUNT = 15;

const filterNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

export const generateFilters = () => {
  return filterNames.map((it, index) => {
    return {
      name: it,
      isActive: !index,
      count: index ? random(0, ALL_MOVIES_COUNT) : undefined,
    };
  });
};

