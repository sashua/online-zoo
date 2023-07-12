import shuffle from "lodash.shuffle";
import { animalsData } from "../data/animalsData";
import animalsTemplate from "../../html/templates/animals.hbs";
import sprite from "../../img/sprite.svg";

export class Animals {
  constructor(rootSelector) {
    this._refs = this._getRefs(rootSelector);
    this._bindEvents();
    this.init();
  }

  init() {
    this._refs.content.innerHTML = this.getRandomMarkup();
  }

  onLeftBtnClick() {
    this.disableButtons();
    const content = this._refs.content;
    content.insertAdjacentHTML("afterbegin", this.getRandomMarkup());
    content.classList.add("move-left");

    setTimeout(() => {
      content.classList.add("animate");
      content.classList.remove("move-left");
      content.addEventListener(
        "transitionend",
        () => {
          content.lastElementChild?.remove();
          content.classList.remove("animate");
          this.enableButtons();
        },
        { once: true }
      );
    }, 0);
  }

  onRightBtnClick() {
    this.disableButtons();
    const content = this._refs.content;
    content.insertAdjacentHTML("beforeend", this.getRandomMarkup());
    content.classList.add("move-left", "animate");
    content.addEventListener(
      "transitionend",
      () => {
        content.firstElementChild?.remove();
        content.classList.remove("move-left", "animate");
        this.enableButtons();
      },
      { once: true }
    );
  }

  getRandomMarkup() {
    const data = shuffle(animalsData)
      .slice(0, 6)
      .map((animal) => ({
        ...animal,
        food: `${sprite}#${
          animal.predator ? "icon-fish-meat" : "icon-banana-bamboo"
        }`,
      }));
    return animalsTemplate({
      animals: data,
    });
  }

  enableButtons() {
    this._refs.leftBtn.disabled = false;
    this._refs.rightBtn.disabled = false;
  }

  disableButtons() {
    this._refs.leftBtn.disabled = true;
    this._refs.rightBtn.disabled = true;
  }

  _bindEvents() {
    this._refs.leftBtn.addEventListener(
      "click",
      this.onLeftBtnClick.bind(this)
    );
    this._refs.rightBtn.addEventListener(
      "click",
      this.onRightBtnClick.bind(this)
    );
  }

  _getRefs(rootSelector) {
    const rootElem = document.querySelector(rootSelector);
    return {
      root: rootElem,
      content: rootElem.querySelector(".js-slider-content"),
      leftBtn: rootElem.querySelector(".js-left"),
      rightBtn: rootElem.querySelector(".js-right"),
    };
  }
}
