import { Storage, formatDataKeyValue } from "../Storage";

describe("Тестирование сторы", () => {
  it("Добавление данных в хранилище с корректным ключем", () => {
    let sut = new Storage();

    expect(() =>
      sut.setData("users", [
        {
          name: "Alex",
        },
      ])
    ).not.toThrow();
  });

  it("Добавление данных в хранилище с некорректным ключем", () => {
    let sut = new Storage();

    expect(() =>
      sut.setData(21, [
        {
          name: "Alex",
        },
      ])
    ).toThrow();
  });

  it("Добавление данных в хранилище если ключ не передан", () => {
    let sut = new Storage();

    expect(() =>
      sut.setData([
        {
          name: "Alex",
        },
      ])
    ).toThrow();
  });

  it("Добавление данных в хранилище, данные не переданы", () => {
    let sut = new Storage();

    expect(() => sut.setData("users")).toThrow();
  });

  it("Получение данных из хранилища, данные имеются в хранилище", () => {
    let sut = new Storage();
    sut.setData("users", [
      {
        name: "Alex",
      },
    ]);

    let rezult = sut.getData("users");

    expect(rezult).toEqual([
      {
        name: "Alex",
      },
    ]);
  });

  it("Получение данных из хранилища, данные не имеются в хранилище", () => {
    let sut = new Storage();
    sut.setData("users", [
      {
        name: "Alex",
      },
    ]);

    let rezult = sut.getData("user");

    expect(rezult).toBeUndefined();
  });

  it("Получение данных из хранилища, ключ не передан", () => {
    let sut = new Storage();
    sut.setData("users", [
      {
        name: "Alex",
      },
    ]);

    expect(() => sut.getData()).toThrow();
  });

  it("Получение данных из хранилища, ключ не валидный", () => {
    let sut = new Storage();
    sut.setData("users", [
      {
        name: "Alex",
      },
    ]);

    expect(() => sut.getData({})).toThrow();
  });

  it("Форматирование данных", () => {
    let sut = new Storage(formatDataKeyValue),
      arr = [
        {
          name: "Russia_1",
          status: "died",
        },
      ];

    let rezult = sut.formatData(arr);

    expect(rezult).toEqual({
      Russia_1: {
        name: "Russia_1",
        status: "died",
      },
    });
  });

  it("Подписка на обновление данных, данные с таким ключем есть и передана функция", () => {
    let sut = new Storage(),
      flag = false;
    sut.setData("user", [
      {
        name: "Alex",
      },
    ]);

    sut.observer("user", () => (flag = true));
    sut.setData("user", [
      {
        name: "Sanya",
      },
    ]);

    expect(flag).toBeTruthy();
  });

  it("Подписка на обновление данных, данных с таким ключем нет", () => {
    let sut = new Storage();

    expect(() => sut.observer("user", () => (flag = true))).toThrow();
  });

  it("Подписка на обновление данных, ключ передан в неверном формате", () => {
    let sut = new Storage();

    expect(() => sut.observer(new Map(), () => (flag = true))).toThrow();
  });

  it("Подписка на обновление данных, передана не функция", () => {
    let sut = new Storage();

    expect(() => sut.observer("user", {})).toThrow();
  });

  it("Подписка на обновление данных, функция не передана", () => {
    let sut = new Storage();

    expect(() => sut.observer("user")).toThrow();
  });

  it("Подписка на обновление данных, ключ не передан", () => {
    let sut = new Storage();

    expect(() => sut.observer()).toThrow();
  });
});

/**
 * *
 * Форматирование данных
 *
 * Подписка на обновление данных
 *
 */
