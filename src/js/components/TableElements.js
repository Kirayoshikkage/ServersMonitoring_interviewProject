class TableElements {
  constructor({ selector = null, api = null } = {}) {
    this._selector =
      typeof selector === "string" ? document.querySelector(selector) : null;

    this._api =
      Object.prototype.toString.call(api) === "[object Object]" ? api : null;
  }

  init() {
    if (!this._api) throw new Error("Api incorrect");

    if (!this._selector) throw new Error("Selector incorrect");
  }

  generationElements(data = null) {
    if (!data) throw new Error("Data not transferd");

    let list = ``;

    for (let item in data) {
      list += this._createElement(data[item]);
    }

    this._selector.innerHTML = "";
    this._selector.insertAdjacentHTML("beforeend", list);
  }

  updateElements(data = null) {
    if (!data) throw new Error("Data not transferd");

    this._selector.querySelectorAll("[data-id]").forEach((item) => {
      let id = item.dataset.id,
        dataItem = data[id];

      if (!dataItem) {
        item.remove();

        return;
      }

      this._api.updateElement(item, dataItem);
    });

    for (let key in data) {
      let element = this._selector.querySelector(`[data-id='${key}']`);

      if (!element) {
        this.addOneElement(data[key]);
      }
    }
  }

  addOneElement(data) {
    if (!data) throw new Error("Data not transferd");

    let element = this._createElement(data);

    this._selector.insertAdjacentHTML("beforeend", element);
  }

  event(event = null, cb = null) {
    if (!event) throw new Error("Event not transferend");

    if (!cb) throw new Error("Cb not transferend");

    if (typeof event !== "string") throw new Error("Event wrong type");

    if (typeof cb !== "function") throw new Error("Cb wrong type");

    this._selector.addEventListener(event, cb);
  }

  _createElement(data) {
    return this._api.createElement(data);
  }
}

export { TableElements };
