import AbstractComponent from "./abstract-component.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {renderElement, remove} from "../utils/render.js";

const EMOJI_SRC = `./images/emoji/`;

const emojiList = [
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

const createEmojiesTemplate = () => (
  `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label"></div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">
      ${emojiList.map((emoji) => `
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji.name}" value="${emoji.name}">
        <label class="film-details__emoji-label" for="emoji-${emoji.name}">
          <img src="${EMOJI_SRC}${emoji.src}" width="30" height="30" alt="emoji">
        </label>
      `).join(``)}
    </div>
  </div>`
);

class EmojiPreviewComponent extends AbstractComponent {
  getTemplate() {
    return `<img src="" width="55" height="55" alt="">`;
  }

  setPreview(preview) {
    const {src} = emojiList.find(({name}) => name === preview);
    const element = this.getElement();
    element.src = `${EMOJI_SRC}${src}`;
    element.alt = `emoji-${preview}`;
  }
}

export default class EmojiesComponent extends AbstractSmartComponent {
  constructor(commentModel) {
    super();

    this._commentModel = commentModel;
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
  }

  getTemplate() {
    return createEmojiesTemplate();
  }

  recoveryListeners() {
    this.setClickOnEmoji();
  }

  getEmojiPreviewContainerElement() {
    return this.getElement().querySelector(`.film-details__add-emoji-label`);
  }

  _setSelectedEmoji(evt) {
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

  setClickOnEmoji() {
    const emojies = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojies.forEach((it) => it.addEventListener(`change`, (evt) => this._setSelectedEmoji(evt)));
  }

  clearForm() {
    this._newComment = {};
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    const emojies = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojies.forEach((it) => {
      it.checked = false;
    });
    remove(this._emojiPreviewComponent);
  }

  _handleKeydown(evt) {
    if (evt.keyCode === 13 && evt.ctrlKey) {
      if (this._newComment.text && this._newComment.emoji) {
        this._commentModel.addComment(this._newComment);
        this.clearForm();
      }
    }
  }

  _handleTextChange(evt) {
    this._newComment.text = evt.target.value;
  }

  afterRender() {
    document.addEventListener(`keydown`, this._handleKeydown);
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._handleTextChange);

    this._newComment = {};
  }
}
