/**
 * @jest-environment jsdom
 */

import { TableElements } from "../TableElements";
import { TableElementServer } from "../TableElement";

let main = {
  Russia_1: {
    name: "Russia_1",
    status: "no problems",
    subscribers: {
      1: {
        id: 1,
        name: "Leanne",
        surname: "Graham",
        email: "Sincere@april.biz",
        licenses: ["Russia_1", "Russia_5", "USA_1"],
      },
    },
  },
  Russia_2: {
    name: "Russia_2",
    status: "minor problems",
    subscribers: {
      1: {
        id: 1,
        name: "Leanne",
        surname: "Graham",
        email: "Sincere@april.biz",
        licenses: ["Russia_1", "Russia_5", "USA_1"],
      },
    },
  },
};

describe("Тестирование показа элементов в таблице", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let table = `
      <table class='table'>
        <tbody class="table__body"></tbody>
      </table>
    `;

    document.body.insertAdjacentHTML("beforeend", table);
  });

  it("Инициализация, переданные данные в конструктор валидны", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });

    expect(() => sut.init()).not.toThrow();
  });

  it("Инициализация, selector невалиден", () => {
    let sut = new TableElements({
      selector: 123,
      api: new TableElementServer(),
    });

    expect(() => sut.init()).toThrow();
  });

  it("Инициализация, api невалидно", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: 123,
    });

    expect(() => sut.init()).toThrow();
  });

  it("Инициализация, данные в конструктор не переданы", () => {
    let sut = new TableElements();

    expect(() => sut.init()).toThrow();
  });

  it("Генерация элементов, данные переданы", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();

    sut.generationElements(main);

    expect(document.querySelector(".table__body").children.length).not.toBe(0);
  });

  it("Генерация элементов, данные не переданы", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();

    expect(() => sut.generationElements()).toThrow();
  });

  it("Обновление элементов, данные переданы, один элемент удалили", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();
    sut.generationElements(main);

    sut.updateElements({
      Russia_1: {
        name: "Russia_1",
        status: "no problems",
        subscribers: {
          1: {
            id: 1,
            name: "Leanne",
            surname: "Graham",
            email: "Sincere@april.biz",
            licenses: ["Russia_1", "Russia_5", "USA_1"],
          },
        },
      },
    });

    expect(document.querySelector(".table__body").children.length).toBe(1);
  });

  it("Обновление элементов, данные переданы, один элемент добавили", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();
    sut.generationElements(main);

    sut.updateElements({
      Russia_1: {
        name: "Russia_1",
        status: "no problems",
        subscribers: {
          1: {
            id: 1,
            name: "Leanne",
            surname: "Graham",
            email: "Sincere@april.biz",
            licenses: ["Russia_1", "Russia_5", "USA_1"],
          },
        },
      },
      Russia_2: {
        name: "Russia_2",
        status: "minor problems",
        subscribers: {
          1: {
            id: 1,
            name: "Graham",
            surname: "Loh",
            email: "Sincere@april.biz",
            licenses: ["Russia_1", "Russia_5", "USA_1"],
          },
        },
      },
      Russia_3: {
        name: "Russia_3",
        status: "died",
        subscribers: {},
      },
    });

    expect(document.querySelector(".table__body").children.length).toBe(3);
  });

  it("Обновление элементов, данные не переданы", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();
    sut.generationElements(main);

    expect(() => sut.updateElements()).toThrow();
  });

  it("Добавление одного элемента, данные переданы", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();

    sut.addOneElement({
      name: "Russia_1",
      status: "no problems",
      subscribers: {
        1: {
          id: 1,
          name: "Leanne",
          surname: "Graham",
          email: "Sincere@april.biz",
          licenses: ["Russia_1", "Russia_5", "USA_1"],
        },
      },
    });

    expect(document.querySelector(".table__body").children.length).toBe(1);
  });

  it("Добавление одного элемента, данные не переданы", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();

    expect(() => sut.addOneElement()).toThrow();
  });

  it("Добавление обработчика события, переданные данные корректны", () => {
    let sut = new TableElements({
        selector: ".table__body",
        api: new TableElementServer(),
      }),
      event = new Event("click"),
      flag = false;
    sut.init();
    sut.generationElements(main);

    sut.event("click", () => {
      flag = true;
    });
    document.querySelector(".table__body").dispatchEvent(event);

    expect(flag).toBe(true);
  });

  it("Добавление обработчика события, тип события не строка, передана функция", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();
    sut.generationElements(main);

    expect(() => sut.event(123, () => {})).toThrow();
  });

  it("Добавление обработчика события, тип события валидный, передана не функция", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();
    sut.generationElements(main);

    expect(() => sut.event("click", 123)).toThrow();
  });

  it("Добавление обработчика события, ничего не передано", () => {
    let sut = new TableElements({
      selector: ".table__body",
      api: new TableElementServer(),
    });
    sut.init();
    sut.generationElements(main);

    expect(() => sut.event()).toThrow();
  });
});
