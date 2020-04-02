import {createUserRankTemplate} from './components/user-rank';
import {createSiteMenuTemplate} from './components/site-menu';
import {createPopularFilmsTemplate} from './components/popular-films';
import {createFilmCardTemplate} from './components/film-card';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createFilmDetailsTemplate} from './components/film-details';

const FILM_CARD_COUNT = 5;
const FILM_CARD_EXTRA_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderEl = document.querySelector(`.header`);
const siteMainEl = document.querySelector(`.main`);

render(siteHeaderEl, createUserRankTemplate());
render(siteMainEl, createSiteMenuTemplate());
render(siteMainEl, createPopularFilmsTemplate());

const filmsListMainEl = siteMainEl.querySelector(`.films .films-list`);
const filmsListMainContainerEl = filmsListMainEl.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  render(filmsListMainContainerEl, createFilmCardTemplate());
}

render(filmsListMainEl, createShowMoreButtonTemplate());

const filmsListContainersEl = siteMainEl.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListContainersEl.forEach((containerEl) => {
  for (let i = 0; i < FILM_CARD_EXTRA_COUNT; i++) {
    render(containerEl, createFilmCardTemplate());
  }
});

render(document.body, createFilmDetailsTemplate());

const filmPopupEl = document.querySelector(`.film-details`);
filmPopupEl.classList.add(`visually-hidden`);
