import AbstractComponent from "./abstract-component";

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  removeBefore() {
    this._handler = null;
  }

  addClickHandler(handler) {
    if (this._handler) {
      return;
    }

    this._handler = handler;
    this.getElement().addEventListener(`click`, this._handler);
  }
}


