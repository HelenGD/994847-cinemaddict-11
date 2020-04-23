import {renderElement} from "../utils/render";
import FilmSortComponent from "../components/sort";
import FilmFilterComponent from "../components/filter";
import {cardsSort} from "../utils/cards-sort";
import CardsController from "./cards-controller";
import FilmsContainerComponent from "../components/films-container";
import FilmsListComponent from "../components/films-list";
import PaginationController from "./pagination-controller";
import FilmsListExtraComponent from "../components/films-list-extra";

export default class MainController {
  constructor(container) {
    this._container = container;
  }

  render({cards, filters}) {
    this._cards = {current: cards};

    renderElement(
        this._container,
        new FilmFilterComponent(filters)
    );

    const filmSortComponent = new FilmSortComponent();
    renderElement(
        this._container,
        filmSortComponent
    );

    filmSortComponent.setSortTypeChangeHandler((sortType) => {
      this._cards.current = cardsSort(cards, sortType);
      paginationController.reset(this._cards, (nextCards) => {
        cardsController.render(nextCards);
      });
    });

    const filmsContainerComponent = new FilmsContainerComponent();
    renderElement(
        this._container,
        filmsContainerComponent
    );

    const filmsListComponent = new FilmsListComponent();
    renderElement(
        filmsContainerComponent.getElement(),
        filmsListComponent
    );

    const filmsListTopRatedComponent = new FilmsListExtraComponent({title: `Top rated`});
    renderElement(
        filmsContainerComponent.getElement(),
        filmsListTopRatedComponent
    );

    const filmsListMostCommentedComponent = new FilmsListExtraComponent({title: `Most commented`});
    renderElement(
        filmsContainerComponent.getElement(),
        filmsListMostCommentedComponent
    );

    const topRatedCardsController = new CardsController(
        filmsListTopRatedComponent.getContainer(),
        {
          onButtonClick: (card, buttonType) => {
            changeButtonType(card, buttonType);

            topRatedCardsController.render(cards.slice(0, 2));
          }
        }
    );
    topRatedCardsController.render(cards.slice(0, 2));

    const mostCommentedCardsController = new CardsController(
        filmsListMostCommentedComponent.getContainer(),
        {
          onButtonClick: (card, buttonType) => {
            changeButtonType(card, buttonType);

            mostCommentedCardsController.render(cards.slice(0, 2));
          }
        }
    );
    mostCommentedCardsController.render(cards.slice(0, 2));

    const cardsController = new CardsController(
        filmsListComponent.getContainer(),
        {
          onButtonClick: (card, buttonType) => {
            changeButtonType(card, buttonType);

            paginationController.slice(this._cards, (nextCards) => {
              cardsController.render(nextCards);
            });
          }
        }
    );

    const paginationController = new PaginationController(filmsListComponent.getElement());
    paginationController.render(this._cards, (nextCards) => {
      cardsController.render(nextCards);
    });

    const changeButtonType = function (card, buttonType) {
      if (buttonType === `watchlist`) {
        card.isAddToWatch = !card.isAddToWatch;
      } else if (buttonType === `watched`) {
        card.isWatched = !card.isWatched;
      } else if (buttonType === `favorite`) {
        card.isFavourite = !card.isFavourite;
      }
    };
  }
}

