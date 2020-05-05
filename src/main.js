import UserRankComponent from './components/user-rank';
import FilmStatisticsComponent from './components/user-statistics';
import {renderElement} from './utils/render';
import MainController from './controllers/main-controller';
import Movies from './models/movies';
import Filter from './models/filter';
import StatisticComponent from './components/film-count-statistic';
import Api from './api';
import Provider from './provider';
import Store from './store';

const siteHeaderEl = document.querySelector(`.header`);
const mainEl = document.querySelector(`.main`);

const store = new Store(`movies`, localStorage);
const apiWithProvider = new Provider(new Api(), store);
const filterModel = new Filter();
const moviesModel = new Movies(apiWithProvider, filterModel);
moviesModel.load();

renderElement(
    siteHeaderEl,
    new UserRankComponent(moviesModel)
);

const mainController = new MainController(
    mainEl,
    moviesModel,
    filterModel
);
mainController.render();

const footerStatisticsEl = document.querySelector(`.footer__statistics`);
moviesModel.setDataChangeHandler(() => {
  footerStatisticsEl.textContent = `${moviesModel.getMoviesAll().length} movies inside`;
});

renderElement(
    footerStatisticsEl,
    new FilmStatisticsComponent()
);
const statisticComponent = new StatisticComponent(moviesModel);
renderElement(mainEl, statisticComponent);
statisticComponent.hide();

moviesModel.setDataChangeHandler(() => {
  statisticComponent.rerender();
});

filterModel.setDataChangeHandler(() => {
  if (filterModel.getFilter() === `stats`) {
    statisticComponent.show();
  } else {
    statisticComponent.hide();
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
