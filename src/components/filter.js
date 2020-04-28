import AbstractSmartComponent from "./abstract-smart-component.js";

const filters = [
  {
    name: `All movies`,
    type: `all`
  },
  {
    name: `Watchlist`,
    type: `watchlist`
  },
  {
    name: `History`,
    type: `history`
  },
  {
    name: `Favorites`,
    type: `favorites`
  }
];

export const createFilterTemplate = (currentFilter) => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filters.map((filter) => `
      <a href="#${filter.type}" data-type="${filter.type}" class="main-navigation__item ${currentFilter.activeFilterType === filter.type ? `main-navigation__item--active` : ``}">
      ${filter.name} 
      ${currentFilter[filter.type] !== undefined ? `<span class="main-navigation__item-count">${currentFilter[filter.type]}</span>` : ``}
      </a>`
    ).join(`\n`)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class FilmFilterComponent extends AbstractSmartComponent {
  constructor(moviesModel, filterModel) {
    super();

    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
  }

  recoveryListeners() {}

  getTemplate() {
    const currentFilter = {
      activeFilterType: this._filterModel.getFilter(),
      all: this._moviesModel.getMoviesAll().length,
      watchlist: this._moviesModel.getMoviesByWatchlist().length,
      history: this._moviesModel.getMoviesByWatched().length,
      favorites: this._moviesModel.getMoviesByFavorites().length
    };
    return createFilterTemplate(currentFilter);
  }

  _handleActionClick(handler, filterType) {
    return (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      handler(filterType);
    };
  }

  setClickHandle(handler) {
    this
      .getElement()
      .querySelectorAll(`.main-navigation__item`)
      .forEach((it) => it.addEventListener(`click`, this._handleActionClick(handler, it.dataset.type)));
  }
}

