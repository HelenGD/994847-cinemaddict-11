import {renderElement} from "../utils/render";
import FilmFilterComponent from "../components/filter";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const currentFilter = {
      activeFilterType: 'all', 
      all: 69,
      watchlist: 100,
    };
    const filterComponent = new FilmFilterComponent(currentFilter);
    renderElement(
        this._container,
        filterComponent
    );

    filterComponent.setClickHandle((filterType) => {
      this._moviesModel.setFilter(filterType);
    });
  }
}
