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

    this._validateData(data);

    let list = ``;

    for (let item in data) {
      list += this._createElement(data[item]);
    }

    this._selector.insertAdjacentHTML("beforeend", list);
  }

  updateElements(data) {
    this._validateData(data);

    this._selector.querySelectorAll("[data-id]").forEach((item) => {
      let id = item.dataset.id;

      this._api.updateElement(item, data[id]);
    });
  }

  _createElement(data) {
    return this._api.createElement(data);
  }

  _validateData(data) {
    if (
      Object.prototype.toString.call(data) !== "[object Object]" &&
      !Array.isArray(data)
    ) {
      throw new Error("Data incorrect");
    }

    if (!Object.keys(data).length) throw new Error("Data is empty");
  }
}

export { TableElements };
