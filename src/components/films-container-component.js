import AbstractComponent from "./abstract-component";

export default class FilmsContainerComponent extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
