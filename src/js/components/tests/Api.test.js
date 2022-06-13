import { Api, FetchRequest } from "../Api";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: "Alex",
      }),
  })
);

describe("Тестирование api", () => {
  it("Переданные в конструктор данные валидны", () => {
    let sut = new Api({
      url: new URL("http://localhost:3000/"),
      api: new FetchRequest(),
    });

    expect(() => sut.init()).not.toThrow();
  });

  it("Переданные в конструктор данные невалидны", () => {
    let sut = new Api({
      url: {},
      api: 123,
    });

    expect(() => sut.init()).toThrow();
  });

  it("В конструктор ничего не передано", () => {
    let sut = new Api();

    expect(() => sut.init()).toThrow();
  });

  it("Тестирование get запроса", async () => {
    let sut = new Api({
      url: "http://localhost:3000/fixtures/servers.json",
      api: new FetchRequest(),
    });

    let request = await sut.get();
    let response = await request.json();

    expect(response).toEqual({
      name: "Alex",
    });
  });
});
