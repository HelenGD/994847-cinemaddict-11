import Model from './model';
import {randomArrayItem} from '../utils/common';
import Comment from './comment';
import {authors} from '../mock/strings';

export default class Comments extends Model {
  constructor(api, movieId, comments = []) {
    super();
    this._api = api;
    this._movieId = movieId;
    this._comments = comments.map((id) => new Comment({id}));
  }

  load() {
    this._api
      .fetchComments(this._movieId)
      .then((comments) => {
        this.setComments(comments);
      });
  }

  setComments(comments) {
    this._comments = comments.map((comment) => {
      return new Comment(comment);
    });

    this.callHandlers();
  }

  getComments() {
    return this._comments;
  }

  deleteCommentById(commentId) {
    const comment = this._comments.find(({id}) => id === commentId);
    comment.isDeleting = true;
    this._api
      .deleteCommentById(commentId)
      .then(() => {
        this._comments = this._comments.filter(({id}) => id !== commentId);
        this.callHandlers();
      });

    this.callHandlers();
  }

  addComment({text, emoji}) {
    return this._api.createComment(this._movieId, {
      comment: text,
      emotion: emoji,
      date: new Date().toISOString(),
    }).then(() => {
      this._comments.push(new Comment({
        comment: text,
        id: Date.now() + Math.random(),
        emotion: emoji,
        date: Date.now(),
        author: randomArrayItem(authors),
      }));

      this.callHandlers();
    });
  }
}
