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
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        licenses: ["Russia_1", "Russia_5", "USA_1"],
      },
    },
  },
  user = {
    id: 1,
    name: "Leanne Graham",
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
      let sut = new TableElementServer(),
        waitRezult = `
      <tr data-id="Russia_1" data-status="no problems" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name status">
          Russia_1
        </td>
        <td class="table-elements__column table-elements__column_amount-users">1</td>
      </tr>
      `;

      let rezult = sut.createElement(main);

      expect(rezult.trim().replace(/\s/g, "")).toBe(
        waitRezult.trim().replace(/\s/g, "")
      );
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
              name: "Leanne Graham",
              email: "Sincere@april.biz",
              licenses: ["Russia_1", "Russia_5", "USA_1"],
            },
            2: {
              id: 2,
              name: "Graham Leanne",
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
      let sut = new TableElementUser(),
        waitRezult = `
          <tr data-id="1" class="table-elements__line">
            <td class="table-elements__column table-elements__column_name">
              Leanne Graham
            </td>
            <td class="table-elements__column table-elements__column_email">
              Sincere@april.biz
            </td>
            <td class="table-elements__column table-elements__column_licenses">
              Russia_1,Russia_5,USA_1
            </td>
          </tr>
        `;

      let rezult = sut.createElement(user);

      expect(rezult.trim().replace(/\s/g, "")).toMatch(
        waitRezult.trim().replace(/\s/g, "")
      );
    });

    it("Создание элемента, данные не переданы", () => {
      let sut = new TableElementUser();

      expect(() => sut.createElement()).toThrow();
    });

    it("Обновление элемента, данные переданы", () => {
      let sut = new TableElementUser(),
        testCase = {
          id: 21,
          name: "Leanne",
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
      ).toBe(testCase.name);
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
