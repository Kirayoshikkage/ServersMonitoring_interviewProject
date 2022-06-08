/**
 * @jest-environment jsdom
 */
/**
 * @jest-environment jsdom
 */

/**
 *
 * Генерация списка элементов с нормальными значениями
 *
 * Генерация списка элемента если данные не массив и не объект
 *
 * Генерация списка если ничего не передано
 *
 *
 * Обновление списка с нормальными значениями
 *
 * Обновление списка если данные не массив и не объект
 *
 * Обновление списка если ничего не передано
 *
 */

import { TableElementServer } from "../TableElement";
import { TableElements } from "../TableElements";

let data = {
  Russia_1: {
    name: "Russia_1",
    status: "no problems",
    connections: [
      {
        name: "Leanne",
        surname: "Graham",
        email: "Sincere@april.biz",
      },
      {
        name: "Clementin",
        surname: "Bauch",
        email: "Nathan@yesenia.net",
      },
      {
        name: "Mrs. Dennis",
        surname: "Schulist",
        email: "Karley_Dach@jasper.info",
      },
    ],
  },
};
describe("Тестирование таблицы в элементами", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let table = `
      <table class="table"></table>
    `;

    document.body.insertAdjacentHTML("beforeend", table);
  });

  it("Генерация элементов, переданные данные корректны", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });

    sut.generationElements(data);

    expect(document.querySelector("table").children.length).not.toBe(0);
  });

  it("Генерация элементов, переданные данные в конструктор некорректны", () => {
    let sut = new TableElements({
      selector: 123,
      api: "",
    });

    expect(() => sut.generationElements(data)).toThrow();
  });

  it("Генерация элементов, переданные данные в конструктор пустые", () => {
    let sut = new TableElements({});

    expect(() => sut.generationElements(data)).toThrow();
  });

  it("Генерация элементов, данные не переданы в конструктор", () => {
    let sut = new TableElements();

    expect(() => sut.generationElements(data)).toThrow();
  });

  it("Генерация элементов, переданные данные некорректны", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });

    expect(() => sut.generationElements(123)).toThrow();
  });

  it("Генерация элементов, переданные данные пустые", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });

    expect(() => sut.generationElements([])).toThrow();
  });

  it("Генерация элементов, данные не переданы", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });

    expect(() => sut.generationElements()).toThrow();
  });
  /** */

  it("Обновление элементов, переданные данные корректны", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });
    sut.generationElements(data);

    expect(() => sut.updateElements(data)).not.toThrow();
  });

  it("Обновление элементов, переданные данные некорректны", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });
    sut.generationElements(data);

    expect(() => sut.updateElements(123)).toThrow();
  });

  it("Обновление элементов, переданные данные пустые", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });
    sut.generationElements(data);

    expect(() => sut.updateElements([])).toThrow();
  });

  it("Обновление элементов, данные не переданы", () => {
    let sut = new TableElements({
      selector: ".table",
      api: new TableElementServer(),
    });
    sut.generationElements(data);

    expect(() => sut.updateElements()).toThrow();
  });
});
