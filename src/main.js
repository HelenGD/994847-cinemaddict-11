import {createUserRankTemplate} from './components/user-rank';
import {createSiteMenuTemplate} from './components/site-menu';
import {createPopularFilmsTemplate} from './components/popular-films';
import {createFilmCardTemplate} from './components/film-card';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createFilmDetailsTemplate} from './components/film-details';
import {render} from './components/utils';
import {generateDetailsOfFilm, generateCards} from './mock/card';
import {generateFilters} from './mock/filter';

const FILM_CARD_COUNT = 15;
const FILM_CARD_EXTRA_COUNT = 2;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;
const MAX_LENGTH_SHOWING_COMMENT = 140;

const siteHeaderEl = document.querySelector(`.header`);
const siteMainEl = document.querySelector(`.main`);

const filters = generateFilters();

const cards = generateCards(FILM_CARD_COUNT);
const filmsCount = cards.length;

render(siteHeaderEl, createUserRankTemplate());
render(siteMainEl, createSiteMenuTemplate(filters));
render(siteMainEl, createPopularFilmsTemplate());

const filmsListMainEl = siteMainEl.querySelector(`.films .films-list`);
const filmsListMainContainerEl = filmsListMainEl.querySelector(`.films-list__container`);

cards
  .slice(0, SHOWING_CARDS_COUNT_ON_START)
  .forEach((card) => render(filmsListMainContainerEl, createFilmCardTemplate(card)));

document
  .querySelectorAll(`.film-card__description`)
  .forEach((filmCardDescriptionEl) => {
    const filmCardDescription = filmCardDescriptionEl.textContent;
    let cutDescription = filmCardDescription.substring(0, MAX_LENGTH_SHOWING_COMMENT);
    if (cutDescription.length < filmCardDescription.length) {
      cutDescription += `...`;
    }
    filmCardDescriptionEl.textContent = cutDescription;
  });

render(filmsListMainEl, createShowMoreButtonTemplate());

const showMoreButton = filmsListMainEl.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevCardsCount = filmsListMainContainerEl.children.length;
  const showingCardsCount = prevCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards
    .slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(filmsListMainContainerEl, createFilmCardTemplate(card)));

  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
});

const filmsListContainersEl = siteMainEl.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListContainersEl.forEach((containerEl) => {
  cards
    .slice(0, FILM_CARD_EXTRA_COUNT)
    .forEach((card) => {
      render(containerEl, createFilmCardTemplate(card));
    });
});

const filmDetails = generateDetailsOfFilm();
render(document.body, createFilmDetailsTemplate(filmDetails));

document.querySelector(`.footer__statistics`).textContent = filmsCount;

const filmPopupEl = document.querySelector(`.film-details`);
filmPopupEl.classList.add(`visually-hidden`);
