import AbstractComponent from "./abstract-component.js";
import {SortType} from "../utils/cards-sort.js";

const activeClassName = `sort__button--active`;


const createSortTemplate = () => (
  `<ul class="sort">
  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${activeClassName}">Sort by default</a></li>
  <li><a href="#" data-sort-type="${SortType.DATE_RELEASE}" class="sort__button">Sort by date</a></li>
  <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
</ul>`
);

export default class FilmSortComponent extends AbstractComponent {
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

  setSortTypeChangeHandler(handler) {
    this
      .getElement()
      .querySelectorAll(`.sort__button`)
      .forEach((sortButtonEl, index, sortButtonEls) => {
        sortButtonEl.addEventListener(`click`, (evt) => {
          evt.preventDefault();

          sortButtonEls.forEach((item) => item.classList.remove(activeClassName));
          evt.target.classList.add(activeClassName);

          const sortType = evt.target.dataset.sortType;

          handler(sortType);
        });
      });
  }
}
