/**
 * @jest-environment jsdom
 */

import { TableElementServer, TableElementUser } from "../TableElement";

let main = {
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
  user = {
    id: 1,
    name: "Leanne",
    surname: "Graham",
    email: "Sincere@april.biz",
    licenses: ["Russia_1", "Russia_5", "USA_1"],
  };

describe("Тестирование создания элемента таблицы", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let table = `
      <table class='table'>
        <tbody class="table__body"></tbody>
      </table>
    `;

    document.body.insertAdjacentHTML("beforeend", table);
  });

  describe("Создание элемента таблицы серверов", () => {
    it("Создание элемента, данные переданы", () => {
      let sut = new TableElementServer();

      let rezult = sut.createElement(main);

      expect(rezult).not.toBe("");
    });

    it("Создание элемента, данные не переданы", () => {
      let sut = new TableElementServer();

      expect(() => sut.createElement()).toThrow();
    });

    it("Обновление элемента, данные переданы", () => {
      let sut = new TableElementServer(),
        testCase = {
          name: "Russia_1",
          status: "died",
          subscribers: {
            1: {
              id: 1,
              name: "Leanne",
              surname: "Graham",
              email: "Sincere@april.biz",
              licenses: ["Russia_1", "Russia_5", "USA_1"],
            },
            2: {
              id: 2,
              name: "Graham",
              surname: "Leanne",
              email: "SincereGraham@april.biz",
              licenses: ["Russia_1", "Russia_5"],
            },
          },
        },
        tableBody = document.querySelector(".table__body");
      tableBody.insertAdjacentHTML("beforeend", sut.createElement(main));
      let element = tableBody.querySelector('[data-id="Russia_1"]');

      sut.updateElement(element, testCase);

      expect(element.dataset.status).toBe(testCase.status);
      expect(
        element.querySelector(".table-elements__column_amount-users")
          .textContent
      ).toBe(`${Object.keys(testCase.subscribers).length}`);
    });

    it("Обновление элемента, данные не переданы", () => {
      let sut = new TableElementServer();

      expect(() => sut.updateElement()).toThrow();
    });
  });

  describe("Создание элемента таблицы пользователей", () => {
    it("Создание элемента, данные переданы", () => {
      let sut = new TableElementUser();

      let rezult = sut.createElement(user);

      expect(rezult).not.toBe("");
    });

    it("Создание элемента, данные не переданы", () => {
      let sut = new TableElementUser();

      expect(() => sut.createElement()).toThrow();
    });

    it("Обновление элемента, данные переданы", () => {
      let sut = new TableElementUser(),
        testCase = {
          id: 21,
          name: "Graham",
          surname: "Leanne",
          email: "Sincere@.biz",
          licenses: ["Russia_1"],
        },
        tableBody = document.querySelector(".table__body");
      tableBody.insertAdjacentHTML("beforeend", sut.createElement(user));
      let element = tableBody.querySelector('[data-id="1"]');

      sut.updateElement(element, testCase);

      expect(element.dataset.id).toBe(`${testCase.id}`);
      expect(
        element.querySelector(".table-elements__column_name").textContent
      ).toBe(`${testCase.name} ${testCase.surname}`);
      expect(
        element.querySelector(".table-elements__column_email").textContent
      ).toBe(testCase.email);
      expect(
        element.querySelector(".table-elements__column_licenses").textContent
      ).toEqual(...testCase.licenses);
    });

    it("Обновление элемента, данные не переданы", () => {
      let sut = new TableElementUser();

      expect(() => sut.updateElement()).toThrow();
    });
  });
});
