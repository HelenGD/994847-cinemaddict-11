import AbstractSmartComponent from "./abstract-smart-component";

const createUserRankTemplate = (moviesModel) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${moviesModel.getRank()}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRankComponent extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    moviesModel.dataChangeHandler(() => {
      this.rerender();
    });
  }

  getTemplate() {
    return createUserRankTemplate(this._moviesModel);
  }
}

