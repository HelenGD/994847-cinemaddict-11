import UserRankComponent from './components/user-rank-component';
import FilmStatisticsComponent from './components/film-statistic-component';
import {renderElement} from './utils/render';
import MainController from './controllers/main-controller';
import Movies from './models/movies';
import Filter from './models/filter';
import UserStatisticComponent from './components/user-statistic-component';
import Api from './api';
import Provider from './provider';
import Store from './store';

const siteHeader = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const store = new Store(`movies`, localStorage);
const apiWithProvider = new Provider(new Api(), store);
const filterModel = new Filter();
const moviesModel = new Movies(apiWithProvider, filterModel);
const footerStatistics = document.querySelector(`.footer__statistics`);
const userStatisticComponent = new UserStatisticComponent(moviesModel);
const mainController = new MainController(
    main,
    moviesModel,
    filterModel
);
moviesModel.load();

renderElement(
    siteHeader,
    new UserRankComponent(moviesModel)
);
mainController.render();

moviesModel.dataChangeHandler(() => {
  footerStatistics.textContent = `${moviesModel.getMoviesAll().length} movies inside`;
});

renderElement(
    footerStatistics,
    new FilmStatisticsComponent()
);

renderElement(main, userStatisticComponent);
userStatisticComponent.hide();

moviesModel.dataChangeHandler(() => {
  userStatisticComponent.rerender();
});

filterModel.dataChangeHandler(() => {
  if (filterModel.getFilter() === `stats`) {
    userStatisticComponent.show();
  } else {
    userStatisticComponent.hide();
  }
});

window.addEventListener(`load`, () => {
  // navigator.serviceWorker.register(`/sw.js`)
  //   .then(() => {})
  //   .catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider
    .sync()
    .then((movies) => {
      moviesModel.setMovies(movies);
    });
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
