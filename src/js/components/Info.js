class Info {
  constructor(selector) {
    this._selector = selector;
  }

  _key;
  _data;
  _setDataFunctions = [];

  setData(key, data) {
    this._key = key;
    this._data = data;

    for (let func of this._setDataFunctions) {
      func();
    }
  }

  getData() {
    return this._data;
  }

  updateData(data) {
    this._data = data;
  }

  getKey() {
    return this._key;
  }

  eventSet(fn) {
    if (Array.isArray(fn)) {
      fn.forEach((func) => this._setDataFunctions.push(func));

      return;
    }

    this._setDataFunctions.push(fn);
  }
}

function serverInfoChangeDesc({ status, name, connections }) {
  let infoContainer = document.querySelector(".info"),
    title = infoContainer.querySelector(".info__title"),
    amount = infoContainer.querySelector(".info__amount"),
    statusContainer = infoContainer.querySelector(".info__item_status");

  statusContainer.dataset.status = status;
  title.textContent = name;
  amount.textContent = `(${Object.keys(connections).length} connections)`;
}

export { Info, serverInfoChangeDesc };
