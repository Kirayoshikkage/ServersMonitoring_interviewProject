import { toggleScrollPadding } from "../functions/toggleScrollPadding";
import { getTransitionDuration } from "../functions/getTransitionDuration";

class InfoUser {
  constructor({
    selector = null,
    closeBtn = null,
    selectorActive = "open",
    apiAnimation = null,
    apiBlockFocus = null,
  } = {}) {
    this._infoUser =
      typeof selector === "string" ? document.querySelector(selector) : null;

    this._closeBtn =
      typeof closeBtn === "string" ? document.querySelector(closeBtn) : null;

    this._selectorActive =
      typeof selectorActive === "string" ? selectorActive : "open";

    this._apiAnimation =
      Object.prototype.toString.call(apiAnimation) === "[object Object]"
        ? apiAnimation
        : null;

    this._apiBlockFocus =
      Object.prototype.toString.call(apiBlockFocus) === "[object Object]"
        ? apiBlockFocus
        : null;
  }

  _isOpen = false;
  _transitionDuration;
  _eventOpenFunction = [];

  init() {
    this._transitionDuration = getTransitionDuration(this._infoUser);

    this._infoUser.addEventListener("pointerdown", (e) => {
      if (
        e.target === this._infoUser.querySelector(".info-user__body") &&
        !this._disabled
      ) {
        this.toggleState();
      }
    });

    this._closeBtn.addEventListener("pointerdown", (e) => {
      this.toggleState();
    });
  }

  toggleState() {
    let body = document.body;

    if (!this._isOpen) {
      this._show();

      setTimeout(() => {
        this._closeBtn.focus();
      }, this._transitionDuration);
    } else {
      this._hide();
    }

    this._toggleBlockFocus();

    toggleScrollPadding(body, this._isOpen);

    /*     toggleScrollPadding(this._infoUser, this._isOpen); */

    body.classList.toggle("overflow-hidden");

    this._infoUser.classList.toggle(this._selectorActive);
  }

  eventOpen(fn) {
    if (Array.isArray(fn)) {
      fn.forEach((func) => this._eventOpenFunction.push(func));

      return;
    }

    this._eventOpenFunction.push(fn);
  }

  isOpen() {
    return this._isOpen;
  }

  resize(cb) {
    window.addEventListener("resize", (e) => {
      cb(e);
    });
  }

  _show() {
    this._apiAnimation?.show(this._infoUser);

    if (!this._apiAnimation) this._infoUser.style.display = "block";

    this._isOpen = true;
  }

  _hide() {
    this._apiAnimation?.hide(this._infoUser);

    if (!this._apiAnimation) this._infoUser.style.display = "none";

    this._isOpen = false;
  }

  _toggleBlockFocus() {
    this._apiBlockFocus?.toggleBlock();
  }
}

function userInfoChangeDesc({ name, surname, email, licenses }) {
  let infoUser = document.querySelector(".servers__info-user"),
    nameInput = infoUser.querySelector('[name="name"'),
    surnameInput = infoUser.querySelector('[name="surname"'),
    emailInput = infoUser.querySelector('[name="email"'),
    licencesList = infoUser.querySelector(".info-user__licences");

  nameInput.value = name;
  surnameInput.value = surname;
  emailInput.value = email;

  let licencesItems = ``;

  licenses?.forEach((license) => {
    licencesItems += `
      <li class="info-user__item">
        <p class="info-user__text">${license}</p>
      </li>
    `;
  });
  licencesList.innerHTML = "";
  licencesList.insertAdjacentHTML("beforeend", licencesItems);
}

export { InfoUser, userInfoChangeDesc };
