const Method = {
  get: `GET`,
  delete: `DELETE`,
  post: `POST`,
  put: `PUT`
};

const AUTHORIZATION = `Basic ef7ac57523`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

export default class Api {
  fetch({method, url, body}) {
    const headers = new Headers();
    headers.append(`Authorization`, AUTHORIZATION);

    const requestOptions = {
      method,
      headers,
    };

    if ([Method.post, Method.put].includes(method)) {
      requestOptions.body = JSON.stringify(body);
      headers.append(`Content-Type`, `application/json`);
    }

    return fetch(`${END_POINT}/${url}`, requestOptions)
      .catch(() => []);
  }

  fetchMovies() {
    return this.fetch({
      method: Method.get,
      url: `movies`,
    }).then((response) => response.json());
  }

  updateMovie(movieId, body) {
    return this.fetch({
      method: Method.put,
      url: `movies/${movieId}`,
      body,
    }).then((response) => response.text);
  }

  fetchComments(movieId) {
    return this.fetch({
      method: Method.get,
      url: `comments/${movieId}`,
    }).then((response) => response.json());
  }

  deleteCommentById(commentId) {
    return this.fetch({
      method: Method.delete,
      url: `comments/${commentId}`,
    });
  }

  createComment(movieId, comment) {
    return this.fetch({
      method: Method.post,
      url: `comments/${movieId}`,
      body: comment,
    }).then((response) => response.json());
  }

  sync(movies) {
    return this.fetch({
      method: Method.post,
      url: `movies/sync`,
      body: movies,
    }).then((response) => response.json());
  }
}
