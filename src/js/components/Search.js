class Search {
  constructor({ input, container, selectorElements, compare }) {
    this._input = document.querySelector(input);
    this._container = document.querySelector(container);
    this._selectorElements = selectorElements;
    this._compare = compare;
  }

  _hide;
  _show;
  _comparison;
  _elements;

  init() {
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

  setHide(fn) {
    this._hide = fn;
  }

  setShow(fn) {
    this._show = fn;
  }

  setComparison(fn) {
    this._comparison = fn;
  }

  _comparison(compare, value) {
    this._comparison(compare, value);
  }

  _hide(element) {
    this._hide(element);
  }

  _show(element) {
    this._show(element);
  }
}

function hideElementTable(element) {
  element.style.display = "none";
}

function showElementTable(element) {
  element.style.display = "table";
}

function tableElementsComparison(compare, value) {
  if (
    compare.trim().toLowerCase().substr(0, value.length) === value.toLowerCase()
  ) {
    return true;
  } else {
    return false;
  }
}

export { Search, hideElementTable, showElementTable, tableElementsComparison };
