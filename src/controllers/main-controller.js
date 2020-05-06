import {renderElement} from "../utils/render";
import FilmSortComponent from "../components/film-sort-component";
import {cardsSort} from "../utils/cards-sort";
import CardsController from "./cards-controller";
import FilmsContainerComponent from "../components/films-container-component";
import FilmsListComponent from "../components/films-list-component";
import PaginationController from "./pagination-controller";
import FilmsListExtraComponent from "../components/films-list-extra-component";
import FilterController from "./filter-controller";

export default class MainController {
  constructor(container, moviesModel, filterModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const filterController = new FilterController(
        this._container,
        this._moviesModel,
        this._filterModel
    );
    filterController.render();

    const filmSortComponent = new FilmSortComponent();
    renderElement(
        this._container,
        filmSortComponent
    );

    filmSortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedMovies = cardsSort(this._moviesModel.getMoviesAll(), sortType);
      this._moviesModel.setMovies(sortedMovies);
      paginationController.reset();
      paginationController.render((nextMovies) => {
        cardsController.render(nextMovies);
      });
    });

    this._filterModel.setDataChangeHandler(() => {
      const defaultSortedMovies = cardsSort(this._moviesModel.getMoviesAll());
      this._moviesModel.setMovies(defaultSortedMovies);
      filmSortComponent.reset();
      filmSortComponent.rerender();
      filterController.render();
      paginationController.reset();
      paginationController.render((nextMovies) => {
        cardsController.render(nextMovies);
      });

      if (this._filterModel.getFilter() === `stats`) {
        filmsListComponent.hide();
        filmsListTopRatedComponent.hide();
        filmsListMostCommentedComponent.hide();
        filmSortComponent.hide();
      } else {
        filmsListComponent.show();
        filmsListTopRatedComponent.show();
        filmsListMostCommentedComponent.show();
        filmSortComponent.show();
      }
    });

    this._moviesModel.setDataChangeHandler(() => {
      filterController.render();
      paginationController.render((nextMovies) => {
        cardsController.render(nextMovies);
      });
      topRatedCardsController.render(this._moviesModel.getTopRatedMovies());
      mostCommentedCardsController.render(this._moviesModel.getMostCommentedMovies());
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

    const topRatedCardsController = new CardsController(filmsListTopRatedComponent.getContainer());
    topRatedCardsController.render(this._moviesModel.getTopRatedMovies());

    const mostCommentedCardsController = new CardsController(filmsListMostCommentedComponent.getContainer());
    mostCommentedCardsController.render(this._moviesModel.getMostCommentedMovies());

    const cardsController = new CardsController(filmsListComponent.getContainer());

    const paginationController = new PaginationController(
        filmsListComponent.getElement(),
        this._moviesModel
    );
    paginationController.render((nextMovies) => {
      cardsController.render(nextMovies);
    });
  }
}

