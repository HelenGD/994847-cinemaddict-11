import {random} from '../components/utils';

const filterNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

const generateFilters = () => {
  return filterNames.map((it, index) => {
    return {
      name: it,
      isActive: !index,
      count: index ? random(0, 15) : undefined,
    };
  });
};

export {generateFilters};
