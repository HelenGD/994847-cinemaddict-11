import formatDistance from 'date-fns/formatDistance';
import Model from './model';
import {randomArrayItem} from '../utils/common';

import {authors} from '../mock/strings';

const EMOTIONS_ROOT = `./images/emoji/`;

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

  addComment({text, emoji}) {
    const newComment = {
      text,
      id: Date.now() + Math.random(),
      author: randomArrayItem(authors),
      emotion: `${EMOTIONS_ROOT}${emoji}.png`,
      date: formatDistance(
          Date.now(),
          Date.now(),
          {includeSeconds: true}
      )
    };

    this._comments.push(newComment);

    this.callHandlers();
  }
}
