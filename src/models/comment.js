import Model from './model';

export default class Comment extends Model {
  constructor(comments = []) {
    super();
    this._comments = comments;
  }

  getComments() {
    return this._comments;
  }

  deleteCommentById(commentId) {
    this._comments = this._comments.filter((comment) => comment.id !== commentId);

    this.callHandlers();
  }
}
