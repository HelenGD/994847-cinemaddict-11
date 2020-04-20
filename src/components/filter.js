import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (filter) => {
  const {name, count, isActive} = filter;
  return (
    `<a href="#watchlist" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
    ${name} 
    ${count !== undefined ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

export const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((filter) => createFilterMarkup(filter)).join(`\n`);

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">${name}</a>
    ${filterMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class FilmFilterComponent extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

