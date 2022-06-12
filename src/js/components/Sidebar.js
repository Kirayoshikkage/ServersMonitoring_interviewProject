import { toggleScrollPadding } from "../functions/toggleScrollPadding";
import { getTransitionDuration } from "../functions/getTransitionDuration";

class Sidebar {
  constructor({
    selector = null,
    closeBtn = null,
    selectorActive = "open",
    apiAnimation = null,
    apiBlockFocus = null,
  } = {}) {
    this._sidebar =
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
    this._transitionDuration = getTransitionDuration(this._sidebar);

    this._sidebar.addEventListener("click", (e) => {
      if (
        e.target === this._sidebar.querySelector(".sidebar__body") &&
        !this._disabled
      ) {
        this.toggleState();
      }
    });

    this._closeBtn.addEventListener("click", (e) => {
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

    body.classList.toggle("overflow-hidden");

    this._sidebar.classList.toggle(this._selectorActive);
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
    this._apiAnimation?.show(this._sidebar);

    if (!this._apiAnimation) this._sidebar.style.display = "block";

    this._isOpen = true;
  }

  _hide() {
    this._apiAnimation?.hide(this._sidebar);

    if (!this._apiAnimation) this._sidebar.style.display = "none";

    this._isOpen = false;
  }

  _toggleBlockFocus() {
    this._apiBlockFocus?.toggleBlock();
  }
}

export { Sidebar };
