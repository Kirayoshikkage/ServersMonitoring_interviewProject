class Api {
  constructor({ url, api }) {
    this.url = url;
    this.api = api;
  }

  async get() {
    return await this.api.get(this.url);
  }

  post(data) {
    this.api.post(this.url, data);
  }
}

class FetchRequest {
  get(url) {
    return fetch(url);
  }

  post(url, data) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: data,
    });
  }
}

export { Api, FetchRequest };
