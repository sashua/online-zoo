export class Menu {
  constructor() {
    this._refs = this._getRefs();
    this._bindEvents();
  }

  open() {
    this._refs.menu.classList.add("is-shown");
    this._refs.backdrop.classList.add("is-shown");
    this._refs.backdrop.style.zIndex = "5";
    document.body.classList.add("no-scroll");
  }

  close() {
    this._refs.menu.classList.remove("is-shown");
    this._refs.backdrop.classList.remove("is-shown");
    document.body.classList.remove("no-scroll");
  }

  onMenuClick(e) {
    if (e.target.closest("a")) {
      this.close();
    }
  }

  _bindEvents() {
    this._refs.openBtn.addEventListener("click", this.open.bind(this));
    this._refs.closeBtn.addEventListener("click", this.close.bind(this));
    this._refs.backdrop.addEventListener("click", this.close.bind(this));
    this._refs.menu.addEventListener("click", this.onMenuClick.bind(this));
  }

  _getRefs() {
    return {
      menu: document.querySelector(".js-menu"),
      openBtn: document.querySelector(".js-open-menu"),
      closeBtn: document.querySelector(".js-close-menu"),
      backdrop: document.querySelector(".js-backdrop"),
    };
  }
}
