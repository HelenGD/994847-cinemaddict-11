import AbstractComponent from "./abstract-component.js";

const createNoCardsTemplate = (isLoading) => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">
        ${isLoading ? `Loading...` : `There are no movies in our database`}
      </h2>
    </section>
  </section>`
  );
};


export default class NoCardsComponent extends AbstractComponent {
  constructor(isLoading) {
    super();
    this._isLoading = isLoading;
  }

  getTemplate() {
    return createNoCardsTemplate(this._isLoading);
  }
}
