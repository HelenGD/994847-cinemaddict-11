import AbstractComponent from "./abstract-component.js";

const createStatisticsTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p></p>
    </section>`
  );
};

export default class FilmStatisticsComponent extends AbstractComponent {
  getTemplate() {
    return createStatisticsTemplate();
  }
}

