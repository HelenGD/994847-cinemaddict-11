import {createElement} from "./utils.js";

const createFilterMarkup = (filter) => {
  const {name, count, isActive} = filter;
  return (
    `<a href="#watchlist" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
    ${name} 
    ${count !== undefined ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

const createSiteMenuTemplate = (filters) => {
  const filterMarkup = filters.map((filter) => createFilterMarkup(filter)).join(`\n`);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">${name}</a>
    ${filterMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>

  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

