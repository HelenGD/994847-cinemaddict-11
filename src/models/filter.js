import Model from './model';

export default class Filter extends Model {
  constructor() {
    super();
    this._data = `all`; // all, watchlist, history, favorites
  }

  setFilter(newFilter) {
    this._data = newFilter;
    this.callHandlers();
  }

  getFilter() {
    return this._data;
  }
}
