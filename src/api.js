const Method = {
  get: `GET`,
  delete: `DELETE`,
  post: `POST`,
  put: `PUT`
};

export class Api {
  fetch({method, url, body}) {
    const headers = new Headers();
    headers.append(`Authorization`, `Basic ef7ac57523`);

    const requestOptions = {
      method,
      headers,
    };

    if ([Method.post, Method.put].includes(method)) {
      requestOptions.body = JSON.stringify(body);
      headers.append(`Content-Type`, `application/json`);
    }

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/${url}`, requestOptions)
      .then((response) => {
        if (method === Method.get) {
          return response.json();
        }

        return response.text;
      });
  }

  fetchMovies() {
    return this.fetch({
      method: Method.get,
      url: `movies`,
    });
  }

  updateMovie(movieId, body) {
    return this.fetch({
      method: Method.put,
      url: `movies/${movieId}`,
      body,
    });
  }

  fetchComments(movieId) {
    return this.fetch({
      method: Method.get,
      url: `comments/${movieId}`,
    });
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
    });
  }
}
