import formatDistance from 'date-fns/formatDistance';
import Model from './model';

export default class Comment extends Model {
  constructor(data) {
    super();

    this.isDeleting = false;
    this.id = data.id;
    this.emotion = data.emotion ? `./images/emoji/${data.emotion}.png` : ``;
    this.date = new Date(data.date || 0);
    this.text = data.comment || ``;
    this.author = data.author || ``;
    this.humanDate = formatDistance(
        Date.now(),
        this.date,
        {includeSeconds: true}
    );
  }
}
