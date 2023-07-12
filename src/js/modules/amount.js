import amountsTemplate from "../../html/templates/amounts.hbs";

const AMOUNTS = [5000, 2000, 1000, 500, 250, 100, 50, 25];

export class Amount {
  constructor() {
    this._refs = this._getRefs();
    this.init();
    this._bindEvents();
  }

  init() {
    this._refs.amountsList.innerHTML = amountsTemplate({ amounts: AMOUNTS });
    this._refs.amounts =
      this._refs.amountsList.querySelectorAll('[name="amount"]');
    this._refs.value.value = "100";
    this._onInput();
  }

  _onChange(e) {
    this._refs.value.value = e.currentTarget.value;
  }

  _onInput() {
    const valueElem = this._refs.value;
    const value = valueElem.value.slice(0, 4);
    valueElem.value = value;
    this._refs.amounts.forEach((item) => {
      item.checked = item.value === value;
    });
    if (value.length > 4) {
    }
  }

  _bindEvents() {
    this._refs.amounts.forEach((elem) => {
      elem.addEventListener("change", this._onChange.bind(this));
    });
    this._refs.value.addEventListener("input", this._onInput.bind(this));
  }

  _getRefs() {
    const amountsList = document.querySelector(".js-amounts-list");
    return {
      amountsList,
      amounts: null,
      value: document.querySelector(".js-amount-value"),
    };
  }
}
