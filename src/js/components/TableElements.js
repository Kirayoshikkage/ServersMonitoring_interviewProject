class TableElements {
  constructor({ selector = null, api = null } = {}) {
    this._selector =
      typeof selector === "string" ? document.querySelector(selector) : null;

    this._api =
      Object.prototype.toString.call(api) === "[object Object]" ? api : null;
  }

  generationElements(data = null) {
    if (!this._api) throw new Error("Api incorrect");

    if (!this._selector) throw new Error("Selector incorrect");

    let list = ``;

    for (let item in data) {
      list += this._createElement(data[item]);
    }

    this._selector.innerHTML = "";
    this._selector.insertAdjacentHTML("beforeend", list);
  }

  updateElements(data = null) {
    if (!data) return;

    this._selector.querySelectorAll("[data-id]").forEach((item) => {
      let id = item.dataset.id,
        dataItem = data[id];

      if (!dataItem) {
        item.remove();

        return;
      }

      this._api.updateElement(item, dataItem);
    });
  }

  _createElement(data) {
    return this._api.createElement(data);
  }

  event(event, cb) {
    if (typeof event !== "string") throw new Error("Type event is invalid");

    if (typeof cb !== "function" && !Array.isArray(cb))
      throw new Error("Type cb is invalid");

    this._setEvent(event, cb);
  }

  _setEvent(event, cb) {
    if (Array.isArray(cb)) {
      cb.forEach((func) => this._selector.addEventListener(event, func));

      return;
    }

    this._selector.addEventListener(event, cb);
  }
}

export { TableElements };
