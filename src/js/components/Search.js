class Search {
  constructor(
    {
      input = null,
      container = null,
      selectorElements = null,
      compare = null,
    } = null
  ) {
    this._input =
      typeof input === "string" ? document.querySelector(input) : null;
    this._container =
      typeof container === "string" ? document.querySelector(container) : null;
    this._selectorElements =
      typeof selectorElements === "string" ? selectorElements : null;
    this._compare = typeof compare === "string" ? compare : null;
  }

  _hideFn;
  _showFn;
  _comparison;
  _elements;

  init() {
    if (!this._input) throw new Error("Input invalid");

    if (!this._container) throw new Error("Container invalid");

    if (!this._selectorElements) throw new Error("SelectorElements invalid");

    if (!this._compare) throw new Error("Compare invalid");

    this._elements = this._container.querySelectorAll(this._selectorElements);

    let observer = new MutationObserver(() => {
      this._elements = this._container.querySelectorAll(this._selectorElements);
    });

    observer.observe(this._container, {
      childList: true,
    });

    this._input.addEventListener("input", (e) => {
      this._search(e.target.value.trim());
    });
  }

  setHide(fn) {
    this._hideFn = fn;
  }

  setShow(fn) {
    this._showFn = fn;
  }

  setComparison(fn) {
    this._comparison = fn;
  }

  _search(value) {
    if (value === "") {
      this._elements.forEach((element) => this._show(element));

      return;
    }

    this._elements.forEach((element) => {
      let compare = element.querySelector(this._compare).textContent;

      if (this._comparison(compare, value)) {
        this._show(element);
      } else {
        this._hide(element);
      }
    });
  }

  _hide(element) {
    element.dataset.visibility = "hidden";
    this._hideFn(element);
  }

  _show(element) {
    element.dataset.visibility = "visible";
    this._showFn(element);
  }
}

function hideElementTable(element = null) {
  if (!element) return;

  element.style.display = "none";
}

function showElementTable(element = null) {
  if (!element) return;

  element.style.display = "table";
}

function tableElementsComparison(compare = null, inputValue = null) {
  if (!compare) throw new Error("Compare not transferred");

  if (!inputValue) throw new Error("InputValue not transferred");

  if (typeof compare !== "string") throw new Error("Compare wrong type");

  if (typeof inputValue !== "string") throw new Error("InputValue wrong type");

  if (
    compare.trim().toLowerCase().substr(0, inputValue.length) ===
    inputValue.toLowerCase()
  ) {
    return true;
  } else {
    return false;
  }
}

export { Search, hideElementTable, showElementTable, tableElementsComparison };
