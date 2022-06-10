import { Storage } from "../Storage";

describe("Тестирование сторы", () => {
  it("Добавление данных в стору, ключ валидный, данные переданы", () => {
    let sut = new Storage();

    expect(() => sut.setData("users", {})).not.toThrow();
  });

  it("Добавление данных в стору, ключ не строка, данные переданы", () => {
    let sut = new Storage();

    expect(() => sut.setData(123, {})).toThrow();
  });

  it("Добавление данных в стору, ключ пустая строка, данные переданы", () => {
    let sut = new Storage();

    expect(() => sut.setData("", {})).toThrow();
  });

  it("Добавление данных в стору, ключ валидный, данные переданы", () => {
    let sut = new Storage();

    expect(() => sut.setData("users", {})).not.toThrow();
  });

  it("Добавление данных в стору, ключ валидный, данные не переданы", () => {
    let sut = new Storage();

    expect(() => sut.setData("users")).toThrow();
  });

  it("Получение данных из сторы, ключ валидный", () => {
    let sut = new Storage();
    sut.setData("users", {
      Alex: {
        name: "Alex",
        age: 30,
      },
    });

    expect(sut.getData("users")).toEqual({
      Alex: {
        name: "Alex",
        age: 30,
      },
    });
  });

  it("Получение данных из сторы, ключ невалидный", () => {
    let sut = new Storage();
    sut.setData("users", {
      Alex: {
        name: "Alex",
        age: 30,
      },
    });

    expect(sut.getData(123)).toBeUndefined();
  });

  it("Получение данных из сторы, ключ не передан", () => {
    let sut = new Storage();
    sut.setData("users", {
      Alex: {
        name: "Alex",
        age: 30,
      },
    });

    expect(sut.getData()).toBeUndefined();
  });

  it("Добавление функции валидирования, ключ валидный, функция валидна", () => {
    let sut = new Storage();

    sut.setValidation("users", (data) => {
      return data.reduce((acc, item) => {
        let { name, age } = item;

        acc.push({
          name: name !== "" ? name : "No name",
          age,
        });

        return acc;
      }, []);
    });
    sut.setData("users", [
      {
        name: "",
        age: 30,
      },
    ]);

    expect(sut.getData("users")).toEqual([
      {
        name: "No name",
        age: 30,
      },
    ]);
  });

  it("Добавление функции валидирования, ключ передан, функция не передана", () => {
    let sut = new Storage();

    expect(() => sut.setValidation("users")).toThrow();
  });

  it("Добавление функции валидирования, ключ не строка, функция валидна", () => {
    let sut = new Storage();

    expect(() => sut.setValidation(123, () => {})).toThrow();
  });

  it("Добавление функции валидирования, ключ валидный, передана не функция", () => {
    let sut = new Storage();

    expect(() => sut.setValidation("user", 233)).toThrow();
  });

  it("Добавление функции валидирования, передана пустая строка, функция валидна", () => {
    let sut = new Storage();

    expect(() => sut.setValidation("", () => {})).toThrow();
  });

  it("Добавление функции форматирования, ключ валидный, функция валидна", () => {
    let sut = new Storage();

    sut.setFormatting("users", (data) => {
      return data.reduce((acc, item) => {
        acc[item.name] = item;

        return acc;
      }, {});
    });
    sut.setData("users", [
      {
        name: "Alex",
        age: 30,
      },
    ]);

    expect(sut.getData("users")).toEqual({
      Alex: {
        name: "Alex",
        age: 30,
      },
    });
  });

  it("Добавление функции форматирования, ключ передан, функция не передана", () => {
    let sut = new Storage();

    expect(() => sut.setFormatting("users")).toThrow();
  });

  it("Добавление функции форматирования, ключ не строка, функция валидна", () => {
    let sut = new Storage();

    expect(() => sut.setFormatting(123, () => {})).toThrow();
  });

  it("Добавление функции форматирования, ключ валидный, передана не функция", () => {
    let sut = new Storage();

    expect(() => sut.setFormatting("user", 233)).toThrow();
  });

  it("Добавление функции форматирования, передана пустая строка, функция валидна", () => {
    let sut = new Storage();

    expect(() => sut.setFormatting("", () => {})).toThrow();
  });

  it("Подписка на обновление данных, ключ валидный, передана функция или массив функций", () => {
    let sut = new Storage(),
      flag = false;
    sut.setData("users", {
      Alex: {
        name: "Alex",
        age: 30,
      },
    });

    sut.observer("users", () => {
      flag = true;
    });
    sut.setData("users", {
      Alex: {
        name: "Alex",
        age: 28,
      },
    });

    expect(flag).toBe(true);
  });

  it("Подписка на обновление данных, ключ валидный, но для этого ключа нет данных, передана функция или массив функций", () => {
    let sut = new Storage();

    expect(() => sut.observer("users", () => {})).toThrow();
  });

  it("Подписка на обновление данных, ключ не строка, передана функция или массив функций", () => {
    let sut = new Storage();

    expect(() => sut.observer(123, () => {})).toThrow();
  });

  it("Подписка на обновление данных, ключ пустaя строка, передана функция или массив функций", () => {
    let sut = new Storage();

    expect(() => sut.observer("", () => {})).toThrow();
  });

  it("Подписка на обновление данных, ключ валидный, передана не функция или не массив функций", () => {
    let sut = new Storage();
    sut.setData("users", {
      Alex: {
        name: "Alex",
        age: 30,
      },
    });

    expect(() => sut.observer("users", 123)).toThrow();
  });

  it("Подписка на обновление данных, ключ валидный, ни функция, ни массив функций не передан", () => {
    let sut = new Storage();
    sut.setData("users", {
      Alex: {
        name: "Alex",
        age: 30,
      },
    });

    expect(() => sut.observer("users")).toThrow();
  });
});
