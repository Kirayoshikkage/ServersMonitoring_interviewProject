/**
 * @jest-environment jsdom
 */

import {
  Search,
  hideElementTable,
  showElementTable,
  tableElementsComparison,
} from "../Search";

describe("Тестирование поиска по элементам", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let input = `
      <label class="search">
        <input
          type="text"
          name="search"
          class="search__input"
        />
      </label>
    `,
      items = `
      <div class="items">
        <div class="item item_visible">
          <div class="name">Alex</div>
        </div>
        <div class="item item_hidden">
          <div class="name">Jeck</div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", input);
    document.body.insertAdjacentHTML("beforeend", items);
  });

  it("Переданные в конструктор данные валидны", () => {
    let sut = new Search({
      input: ".search__input",
      container: ".items",
      selectorElements: ".item",
      compare: ".name",
    });

    expect(() => sut.init()).not.toThrow();
  });

  it("Переданные в конструктор данные невалидны", () => {
    let sut = new Search({
      input: 123,
      container: {},
      selectorElements: [],
      compare: new Map(),
    });

    expect(() => sut.init()).toThrow();
  });

  it("Переданные в конструктор данные пусты", () => {
    let sut = new Search({});

    expect(() => sut.init()).toThrow();
  });

  it("Поиск элемента", () => {
    let sut = new Search({
        input: ".search__input",
        container: ".items",
        selectorElements: ".item",
        compare: ".name",
      }),
      input = document.querySelector("input"),
      visibleElement = document.querySelector(".item_visible"),
      hiddenElement = document.querySelector(".item_hidden"),
      event = new Event("input"),
      testCase = "Alex";
    sut.init();
    sut.setHide(hideElementTable);
    sut.setShow(showElementTable);
    sut.setComparison(tableElementsComparison);

    input.value = testCase;
    input.dispatchEvent(event);

    expect(hiddenElement.dataset.visibility).toBe("hidden");
    expect(visibleElement.dataset.visibility).toBe("visible");
  });
});

describe("Тестирование поиска элемента таблицы", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let input = `
      <label class="search">
        <input
          type="text"
          name="search"
          class="search__input"
        />
      </label>
    `,
      items = `
      <div class="items">
        <div class="item">
          <div class="name">Alex</div>
        </div>
        <div class="item">
          <div class="name">Jeck</div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", input);
    document.body.insertAdjacentHTML("beforeend", items);
  });

  it("Переданы валидиные данные", () => {
    expect(() => tableElementsComparison("123", "123")).not.toThrow();
  });

  it("Переданы невалидиные данные", () => {
    expect(() => tableElementsComparison([], new Map())).toThrow();
  });

  it("Данные не переданы", () => {
    expect(() => tableElementsComparison()).toThrow();
  });

  it("Сравнение значений, значения одинаковы", () => {
    expect(tableElementsComparison("lox", "lox")).toBe(true);
  });

  it("Сравнение значений, значения разные", () => {
    expect(tableElementsComparison("l1ox", "lox")).toBe(false);
  });

  it("Сравнение значений, значения одинаковые, но разный регистр", () => {
    expect(tableElementsComparison("loX", "lOX")).toBe(true);
  });
});
