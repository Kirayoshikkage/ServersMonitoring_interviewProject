class Api {
  constructor({ url = null, api = null } = {}) {
    this._url =
      typeof url === "string" ||
      Object.prototype.toString.call(url) === "[object URL]"
        ? url
        : null;

    this._api =
      Object.prototype.toString.call(api) === "[object Object]" ? api : null;
  }

  init() {
    if (!this._url) throw new Error("Url invalid");

    if (!this._api) throw new Error("Url invalid");
  }

  async get() {
    return await this._api.get(this._url);
  }
}

class FetchRequest {
  get(url) {
    return fetch(url);
  }
}

export { Api, FetchRequest };
