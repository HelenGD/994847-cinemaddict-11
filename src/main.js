import UserRank from './components/user-rank';
import FilmFilter from './components/filter';
import FilmSort from './components/sort';
import PopularFilms from './components/popular-films';
import FilmCard from './components/film-card';
import ShowMoreButton from './components/show-more-button';
import FilmCardDetails from './components/film-details';
import FilmStatistics from './components/statistics';
import NoCards from './components/no-cards';
import {onOutsideClick, checkEscPress} from './utils/common';
import {renderElement, remove} from './utils/render';
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
  renderElement(document.body, filmCardDetails);

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

  filmCardDetails.setEscClickHandler(onClosePopup);

  document.addEventListener(`keydown`, onPopupEscPress);
});

renderElement(
    siteHeaderEl,
    new UserRank()
);

renderElement(
    siteMainEl,
    new FilmFilter(filters)
);

renderElement(
    siteMainEl,
    new FilmSort()
);

renderElement(
    siteMainEl,
    new PopularFilms()
);

const filmsListMainEl = siteMainEl.querySelector(`.films .films-list`);
const filmsListMainContainerEl = filmsListMainEl.querySelector(`.films-list__container`);

if (!cards.length) {
  const noCards = new NoCards();
  renderElement(filmsListMainContainerEl, noCards);
}

cards
  .slice(0, SHOWING_CARDS_COUNT_ON_START)
  .forEach((card) => {
    const filmCard = new FilmCard(card);
    renderElement(filmsListMainContainerEl, filmCard);
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
  const showMoreButton = new ShowMoreButton();
  renderElement(
      filmsListMainEl,
      showMoreButton
  );
  showMoreButton.setClickHandler(() => {
    const prevCardsCount = filmsListMainContainerEl.children.length;
    const showingCardsCount = prevCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    cards
    .slice(prevCardsCount, showingCardsCount)
    .forEach((card) => {
      const filmCard = new FilmCard(card);
      renderElement(filmsListMainContainerEl, filmCard);
      renderFilmCardDetails(filmCard);
    });

    if (showingCardsCount >= cards.length) {
      remove(showMoreButton);
    }
  });
}

const filmsListContainersEl = siteMainEl.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListContainersEl.forEach((containerEl) => {
  cards
    .slice(0, FILM_CARD_EXTRA_COUNT)
    .forEach((card) => {
      const filmCard = new FilmCard(card);
      renderElement(containerEl, filmCard);
      renderFilmCardDetails(filmCard);
    });
});

const footerStatisticsEl = document.querySelector(`.footer__statistics`);
footerStatisticsEl.textContent = `${filmsCount} movies inside`;
renderElement(
    footerStatisticsEl,
    new FilmStatistics(filters)
);

