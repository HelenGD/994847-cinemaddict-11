import {SortType} from "../utils/cards-sort.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const ACTIVE_CLASS_NAME = `sort__button--active`;

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${ACTIVE_CLASS_NAME}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE_RELEASE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class FilmSortComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this.handler);
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

          sortButtonEls.forEach((item) => item.classList.remove(ACTIVE_CLASS_NAME));
          evt.target.classList.add(ACTIVE_CLASS_NAME);
          handler(sortType);
        });
      });
  }
}
