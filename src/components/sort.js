import {SortType} from "../utils/cards-sort.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const activeClassName = `sort__button--active`;


const createSortTemplate = () => (
  `<ul class="sort">
  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${activeClassName}">Sort by default</a></li>
  <li><a href="#" data-sort-type="${SortType.DATE_RELEASE}" class="sort__button">Sort by date</a></li>
  <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
</ul>`
);

export default class FilmSortComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this.handler);
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  reset() {
    this._currenSortType = SortType.DEFAULT;
  }

  setSortTypeChangeHandler(handler) {
    this.handler = handler;

    this
      .getElement()
      .querySelectorAll(`.sort__button`)
      .forEach((sortButtonEl, index, sortButtonEls) => {
        sortButtonEl.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const sortType = evt.target.dataset.sortType;

          if (this._currenSortType === sortType) {
            return;
          }

          this._currenSortType = sortType;

          sortButtonEls.forEach((item) => item.classList.remove(activeClassName));
          evt.target.classList.add(activeClassName);
          handler(sortType);
        });
      });
  }
}
