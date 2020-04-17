import UserRankComponent from './components/user-rank';
import FilmFilterComponent from './components/filter';
import FilmSortComponent from './components/sort';
import PopularFilmsComponent from './components/films-list-extra';
import FilmStatisticsComponent from './components/statistics';
import {renderElement} from './utils/render';
import {generateCards} from './mock/card';
import {generateFilters} from './mock/filter';
import MainController from './controllers/main-controller';

const FILM_CARD_COUNT = 15;

const siteHeaderEl = document.querySelector(`.header`);
const mainEl = document.querySelector(`.main`);

const filters = generateFilters();

const cards = generateCards(FILM_CARD_COUNT);
const filmsCount = cards.length;

renderElement(
    siteHeaderEl,
    new UserRankComponent()
);

const mainController = new MainController(mainEl);
mainController.render({cards, filters});

const footerStatisticsEl = document.querySelector(`.footer__statistics`);
footerStatisticsEl.textContent = `${filmsCount} movies inside`;
renderElement(
    footerStatisticsEl,
    new FilmStatisticsComponent(filters)
);

