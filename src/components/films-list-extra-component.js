import AbstractComponent from "./abstract-component";

const createTemplate = ({title}) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListExtraComponent extends AbstractComponent {
  constructor(props) {
    super();

    this._props = props;
  }

  getTemplate() {
    return createTemplate(this._props);
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
