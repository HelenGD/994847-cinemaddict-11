import UserRankComponent from './components/user-rank';
import FilmStatisticsComponent from './components/statistics';
import {renderElement} from './utils/render';
import MainController from './controllers/main-controller';
import Movies from './models/movies';
import Filter from './models/filter';
import StatisticComponent from './components/statistic';
import {Api} from './api';

const siteHeaderEl = document.querySelector(`.header`);
const mainEl = document.querySelector(`.main`);

const api = new Api();
const filterModel = new Filter();
const moviesModel = new Movies(api, filterModel);
moviesModel.load();

renderElement(
    siteHeaderEl,
    new UserRankComponent()
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
