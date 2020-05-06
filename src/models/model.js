export default class Model {
  constructor() {
    this._dataChangeHandlers = [];
  }

  dataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  callHandlers() {
    this._dataChangeHandlers.forEach((handler) => handler());
  }
}
