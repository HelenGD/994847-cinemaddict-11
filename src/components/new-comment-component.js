import AbstractComponent from "./abstract-component";
import AbstractSmartComponent from "./abstract-smart-component";
import {renderElement, remove} from "../utils/render";
import {isOnline} from "../utils/common";

const EMOJI_SRC = `./images/emoji/`;
const ENTER_KEYCODE = 13;
const MAX_SHAKE_TIME_IN_MS = 1000;

const emojiesProperties = [
  {
    name: `smile`,
    src: `smile.png`
  },
  {
    name: `sleeping`,
    src: `sleeping.png`
  },
  {
    name: `puke`,
    src: `puke.png`
  },
  {
    name: `angry`,
    src: `angry.png`
  }
];

const createEmojiesTemplate = () => {
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emojiesProperties.map((emoji) => `
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji.name}" value="${emoji.name}">
          <label class="film-details__emoji-label" for="emoji-${emoji.name}">
            <img src="${EMOJI_SRC}${emoji.src}" width="30" height="30" alt="emoji">
          </label>
        `).join(``)}
      </div>
    </div>`
  );
};

class EmojiPreviewComponent extends AbstractComponent {
  getTemplate() {
    return `<img src="" width="55" height="55" alt="">`;
  }

  setPreview(preview) {
    const {src} = emojiesProperties.find(({name}) => name === preview);
    const element = this.getElement();
    element.src = `${EMOJI_SRC}${src}`;
    element.alt = `emoji-${preview}`;
  }
}

export default class NewCommentComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this._isDisabled = false;
    this._addKeydownHandler = this._addKeydownHandler.bind(this);
    this._addKeypressHandler = this._addKeypressHandler.bind(this);
    this._addTextChangeHandler = this._addTextChangeHandler.bind(this);
  }

  getTemplate() {
    return createEmojiesTemplate();
  }

  getEmojiPreviewContainerElement() {
    return this.getElement().querySelector(`.film-details__add-emoji-label`);
  }

  setCommentsModel(commentModel) {
    this._commentModel = commentModel;
  }

  recoveryListeners() {
    this.addEmojiClickHandler();
    this.addInputHandler();
  }

  removeListeners() {
    document.removeEventListener(`keydown`, this._addKeydownHandler);
    document.removeEventListener(`keypress`, this._addKeypressHandler);
  }

  clearForm() {
    this._newComment = {};
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    const emojies = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojies.forEach((it) => {
      it.checked = false;
    });
    if (this._emojiPreviewComponent) {
      remove(this._emojiPreviewComponent);
    }
  }

  shake() {
    this
      .getElement()
      .classList.add(`shake`);

    setTimeout(() => {
      this
        .getElement()
        .classList.remove(`shake`);
    }, MAX_SHAKE_TIME_IN_MS);
  }

  renderAfter() {
    this.addInputHandler();
  }

  _addSelectedEmoji(evt) {
    if (this._isDisabled || !isOnline()) {
      evt.preventDefault();
      return;
    }

    if (!this._emojiPreviewComponent) {
      this._emojiPreviewComponent = new EmojiPreviewComponent();
    }

    this._emojiPreviewComponent.setPreview(evt.target.value);
    renderElement(
        this.getEmojiPreviewContainerElement(),
        this._emojiPreviewComponent
    );

    this._newComment.emoji = evt.target.value;
  }

  _addKeydownHandler(evt) {
    if (evt.keyCode === ENTER_KEYCODE && evt.ctrlKey) {
      if (this._newComment.text && this._newComment.emoji && !this._isDisabled) {
        this._isDisabled = true;
        this._commentModel
          .addComment(this._newComment)
          .then(() => {
            this.clearForm();
            this._isDisabled = false;
          })
          .catch(() => {
            this._isDisabled = false;
            this.shake();
          });
      } else {
        this.shake();
      }
    }
  }

  _addTextChangeHandler(evt) {
    this._newComment.text = evt.target.value;
  }

  _addKeypressHandler(evt) {
    if (this._isDisabled || !isOnline()) {
      evt.preventDefault();
    }
  }

  addEmojiClickHandler() {
    const emojies = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojies.forEach((it) => it.addEventListener(`click`, (evt) => this._addSelectedEmoji(evt)));
  }

  addInputHandler() {
    document.addEventListener(`keypress`, this._addKeypressHandler);
    document.addEventListener(`keydown`, this._addKeydownHandler);
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._addTextChangeHandler);
  }
}
