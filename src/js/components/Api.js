class Api {
  constructor({ url = null, api = null } = {}) {
    this._url = url;
    this._api = api;
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
