import { feedbacksData } from "../data/feedbacksData";
import feedbacksTemplate from "../../html/templates/feedbacks.hbs";

export class Feedbacks {
  constructor(rootSelector) {
    this._refs = this._getRefs(rootSelector);
    this._media = this._getMedia();
    this._bindEvents();
    this.init();
  }

  init() {
    this._refs.sliderContent.innerHTML = feedbacksTemplate({
      feedbacks: feedbacksData,
    });
    this._onMediaChange();
  }

  openPopup(content) {
    this._refs.popupContent.innerHTML = content;
    this._refs.popup.classList.add("is-shown");
    this._refs.backdrop.classList.add("is-shown");
    this._refs.backdrop.style.zIndex = "10";
    document.body.classList.add("no-scroll");
  }

  closePopup() {
    this._refs.popup.classList.remove("is-shown");
    this._refs.backdrop.classList.remove("is-shown");
    document.body.classList.remove("no-scroll");
  }

  _bindEvents() {
    this._refs.sliderRange.addEventListener("input", this._onChange.bind(this));
    this._refs.sliderContent.addEventListener(
      "click",
      this._onClick.bind(this)
    );
    this._refs.backdrop.addEventListener("click", this.closePopup.bind(this));
    this._refs.popupClose.addEventListener("click", this.closePopup.bind(this));
    this._media.desktop.onchange = this._onMediaChange.bind(this);
    this._media.tablet.onchange = this._onMediaChange.bind(this);
  }

  _onChange() {
    const value = this._refs.sliderRange.value;
    const sliderContent = this._refs.sliderContent;
    const offset = sliderContent.children[value].offsetLeft;
    sliderContent.style.transform = `translateX(-${offset}px)`;
  }

  _onClick(e) {
    const card = e.target.closest(".feedback");
    if (!card || !this._media.tablet.matches) {
      return;
    }
    this.openPopup(card.innerHTML);
  }

  _onMediaChange() {
    this._refs.sliderRange.max = this._media.desktop.matches ? "8" : "7";
    if (this._media.tablet.matches) {
      this._refs.sliderRange.value = 0;
    }
    this._onChange();
  }

  _getRefs(rootSelector) {
    const rootElem = document.querySelector(rootSelector);
    const backdrop = document.querySelector(".js-backdrop");
    return {
      backdrop,
      root: rootElem,
      sliderContent: rootElem.querySelector(".js-slider-content"),
      sliderRange: rootElem.querySelector(".js-slider-range"),
      popup: rootElem.querySelector(".js-popup"),
      popupContent: rootElem.querySelector(".js-popup-content"),
      popupClose: rootElem.querySelector(".js-close-popup"),
    };
  }

  _getMedia() {
    return {
      desktop: window.matchMedia("screen and (max-width: 1365px)"),
      tablet: window.matchMedia("screen and (max-width: 999px)"),
    };
  }
}
