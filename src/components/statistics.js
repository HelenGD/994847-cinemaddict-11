import {createElement} from "./utils.js";

const createStatisticsTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p></p>
    </section>`
  );
};

export default class FilmStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
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
