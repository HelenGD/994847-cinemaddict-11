import Model from './model';
import Comment from './comment';

export default class Comments extends Model {
  constructor(api, movieId, comments = []) {
    super();
    this._api = api;
    this._movieId = movieId;
    this._comments = comments.map((id) => new Comment({id}));
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments.map((comment) => {
      return new Comment(comment);
    });

    this.callHandlers();
  }

  load() {
    this._api
      .fetchComments(this._movieId)
      .then((comments) => {
        this.setComments(comments);
      });
  }

  addComment({text, emoji}) {
    return this._api.createComment(this._movieId, {
      comment: text,
      emotion: emoji,
      date: new Date().toISOString(),
    }).then(({comments}) => {
      this.setComments(comments);
    });
  }

  deleteCommentById(commentId) {
    const comment = this._comments.find(({id}) => id === commentId);
    comment.isDeleting = true;
    this._api
      .deleteCommentById(commentId)
      .then(() => {
        this._comments = this._comments.filter(({id}) => id !== commentId);
        this.callHandlers();
      })
      .catch(() => {
        comment.isDeleting = false;
        this.callHandlers();
      });

    this.callHandlers();
  }
}
