import {renderElement} from "../utils/render";
import FilmSortComponent from "../components/film-sort-component";
import {sortCards} from "../utils/sort-cards";
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

    filmSortComponent.addSortTypeChangeHandler((sortType) => {
      const sortedMovies = sortCards(this._moviesModel.getMoviesAll(), sortType);
      this._moviesModel.setMovies(sortedMovies);
      paginationController.reset();
      paginationController.render((nextMovies) => {
        cardsController.render(nextMovies);
      });
    });

    this._filterModel.addDataChangeHandler(() => {
      const defaultSortedMovies = sortCards(this._moviesModel.getMoviesAll());
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

    this._moviesModel.addDataChangeHandler(() => {
      filterController.render();
      paginationController.render((nextMovies) => {
        cardsController.render(nextMovies);
      });
      topRatedCardsController.render(this._moviesModel.getTopRatedMovies());
      if (this._moviesModel.getTopRatedMovies().length > 0) {
        filmsListTopRatedComponent.show();
      } else {
        filmsListTopRatedComponent.hide();
      }
      mostCommentedCardsController.render(this._moviesModel.getMostCommentedMovies());
      if (this._moviesModel.getMostCommentedMovies().length > 0) {
        filmsListMostCommentedComponent.show();
      } else {
        filmsListMostCommentedComponent.hide();
      }
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
    filmsListTopRatedComponent.hide();

    const filmsListMostCommentedComponent = new FilmsListExtraComponent({title: `Most commented`});
    renderElement(
        filmsContainerComponent.getElement(),
        filmsListMostCommentedComponent
    );
    filmsListMostCommentedComponent.hide();

    const topRatedCardsController = new CardsController(filmsListTopRatedComponent.getContainer());
    const mostCommentedCardsController = new CardsController(filmsListMostCommentedComponent.getContainer());
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

