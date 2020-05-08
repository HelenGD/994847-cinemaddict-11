import {isOnline} from "./utils/common";

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  fetchMovies() {
    if (isOnline()) {
      return this._api.fetchMovies()
      .then((movies) => {
        this._store.setItems(createStoreStructure(movies));

        return movies;
      });
    }

    const localMovies = Object.values(this._store.getItems());

    return Promise.resolve(localMovies);
  }

  updateMovie(movieId, newMovie) {
    if (isOnline()) {
      return this._api.updateMovie(movieId, newMovie)
        .then((movie) => {
          const localMovies = this._store.getItems();
          localMovies[movie.id] = movie;
          this._store.setItems(localMovies);

          return movie;
        })
        .catch(() => {});
    }

    const localMovies = this._store.getItems();
    localMovies[newMovie.id] = newMovie;
    this._store.setItems(localMovies);

    return Promise.resolve(newMovie);
  }

  fetchComments(movieId) {
    return this._api.fetchComments(movieId);
  }

  createComment(movieId, comment) {
    return this._api.createComment(movieId, comment);
  }

  deleteCommentById(commentId) {
    return this._api.deleteCommentById(commentId);
  }

  sync() {
    if (isOnline()) {
      const movies = Object.values(this._store.getItems());

      return this._api.sync(movies)
        .then(({updated}) => {
          this._store.setItems(createStoreStructure(updated));

          return updated;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
