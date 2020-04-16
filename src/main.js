import UserRank from './components/user-rank';
import FilmFilter from './components/filter';
import FilmSort from './components/sort';
import PopularFilms from './components/popular-films';
import FilmCard from './components/film-card';
import ShowMoreButton from './components/show-more-button';
import FilmCardDetails from './components/film-details';
import FilmStatistics from './components/statistics';
import NoCards from './components/no-cards';
import {renderElement, onOutsideClick, checkEscPress} from './components/utils';
import {generateCards} from './mock/card';
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

const renderFilmCardDetails = (filmCard) => filmCard
.getElement()
.addEventListener(`click`, (evt) => {
  evt.stopPropagation();
  const filmCardDetails = new FilmCardDetails(filmCard.getCard());
  renderElement(document.body, filmCardDetails.getElement());

  const onOutsidePress = (offOutsideClick) => {
    filmCardDetails.removeElement();
    offOutsideClick();
  };
  const offOutsideClick = onOutsideClick(filmCardDetails.getElement(), onOutsidePress);

  const onClosePopup = () => {
    offOutsideClick();
    filmCardDetails.removeElement();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (event) => {
    checkEscPress(event, onClosePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  filmCardDetails
    .getCloseButtonElement()
    .addEventListener(`click`, onClosePopup);

  document.addEventListener(`keydown`, onPopupEscPress);
});

renderElement(
    siteHeaderEl,
    new UserRank().getElement()
);

renderElement(
    siteMainEl,
    new FilmFilter(filters).getElement()
);

renderElement(
    siteMainEl,
    new FilmSort().getElement()
);

renderElement(
    siteMainEl,
    new PopularFilms().getElement()
);

const filmsListMainEl = siteMainEl.querySelector(`.films .films-list`);
const filmsListMainContainerEl = filmsListMainEl.querySelector(`.films-list__container`);

if (!cards.length) {
  const noCards = new NoCards();
  renderElement(filmsListMainContainerEl, noCards.getElement());
}

cards
  .slice(0, SHOWING_CARDS_COUNT_ON_START)
  .forEach((card) => {
    const filmCard = new FilmCard(card);
    renderElement(filmsListMainContainerEl, filmCard.getElement());
    renderFilmCardDetails(filmCard);
  });
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

if (cards.length > SHOWING_CARDS_COUNT_ON_START) {
  renderElement(
      filmsListMainEl,
      new ShowMoreButton().getElement()
  );
  const showMoreButton = filmsListMainEl.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, () => {
    const prevCardsCount = filmsListMainContainerEl.children.length;
    const showingCardsCount = prevCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    cards
    .slice(prevCardsCount, showingCardsCount)
    .forEach((card) => {
      const filmCard = new FilmCard(card);
      renderElement(filmsListMainContainerEl, filmCard.getElement());
      renderFilmCardDetails(filmCard);
    });

    if (showingCardsCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

const filmsListContainersEl = siteMainEl.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListContainersEl.forEach((containerEl) => {
  cards
    .slice(0, FILM_CARD_EXTRA_COUNT)
    .forEach((card) => {
      const filmCard = new FilmCard(card);
      renderElement(containerEl, filmCard.getElement());
      renderFilmCardDetails(filmCard);
    });
});

const footerStatisticsEl = document.querySelector(`.footer__statistics`);
footerStatisticsEl.textContent = `${filmsCount} movies inside`;
renderElement(
    footerStatisticsEl,
    new FilmStatistics(filters).getElement()
);

