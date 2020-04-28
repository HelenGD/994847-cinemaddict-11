import {renderElement} from "../utils/render";
import FilmFilterComponent from "../components/filter";

export default class FilterController {
  constructor(container, moviesModel, filterModel) {
    this._isRendered = false;
    this._container = container;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._filterComponent = new FilmFilterComponent(moviesModel, filterModel);
  }

  render() {
    if (this._isRendered) {
      this._filterComponent.rerender();
    } else {
      renderElement(
          this._container,
          this._filterComponent
      );
    }

    this._filterComponent.setClickHandle((filterType) => {
      this._filterModel.setFilter(filterType);
    });

    this._isRendered = true;
  }
}
