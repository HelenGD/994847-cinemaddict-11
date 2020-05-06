import Model from './model';

export default class Filter extends Model {
  constructor() {
    super();
    this._data = `all`;
  }

  getFilter() {
    return this._data;
  }

  setFilter(newFilter) {
    this._data = newFilter;
    this.callHandlers();
  }
}
