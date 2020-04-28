import UserRankComponent from './components/user-rank';
import FilmStatisticsComponent from './components/statistics';
import {renderElement} from './utils/render';
import {generateCards} from './mock/card';
import MainController from './controllers/main-controller';
import Movies from './models/movies';

const FILM_CARD_COUNT = 15;

const siteHeaderEl = document.querySelector(`.header`);
const mainEl = document.querySelector(`.main`);

const cards = generateCards(FILM_CARD_COUNT);
const filmsCount = cards.length;

const moviesModel = new Movies();
moviesModel.setMovies(cards);

renderElement(
    siteHeaderEl,
    new UserRankComponent()
);

const mainController = new MainController(mainEl, moviesModel);
mainController.render({cards});

const footerStatisticsEl = document.querySelector(`.footer__statistics`);
footerStatisticsEl.textContent = `${filmsCount} movies inside`;
renderElement(
    footerStatisticsEl,
    new FilmStatisticsComponent()
);

