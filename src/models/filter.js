import Model from './model';

export default class Filter extends Model {
  constructor() {
    super();
    this._data = `all`;
  }

  setFilter(newFilter) {
    this._data = newFilter;
    this.callHandlers();
  }

  getFilter() {
    return this._data;
  }
}
