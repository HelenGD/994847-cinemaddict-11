import formatDistance from 'date-fns/formatDistance';
import Model from './model';

export default class Comment extends Model {
  constructor({id, emotion, date, comment, author}) {
    super();

    this.isDeleting = false;
    this.id = id;
    this.emotion = emotion ? `./images/emoji/${emotion}.png` : ``;
    this.date = new Date(date || 0);
    this.text = comment || `Loading...`;
    this.author = author || ``;
    this.commentDate = formatDistance(
        Date.now(),
        this.date,
        {includeSeconds: true}
    );
  }
}
