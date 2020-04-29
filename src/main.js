import UserRankComponent from './components/user-rank';
import FilmStatisticsComponent from './components/statistics';
import {renderElement} from './utils/render';
import {generateCards} from './mock/card';
import MainController from './controllers/main-controller';
import Movie from './models/movie';
import Filter from './models/filter';
import StatisticComponent from './components/statistic';

const FILM_CARD_COUNT = 15;

const siteHeaderEl = document.querySelector(`.header`);
const mainEl = document.querySelector(`.main`);

const cards = generateCards(FILM_CARD_COUNT);
const filmsCount = cards.length;

const filterModel = new Filter();
const moviesModel = new Movie(filterModel);
moviesModel.setMovies(cards);

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
footerStatisticsEl.textContent = `${filmsCount} movies inside`;
renderElement(
    footerStatisticsEl,
    new FilmStatisticsComponent()
);
const statistic = new StatisticComponent();
renderElement(mainEl, statistic);
// statistic.hide();
