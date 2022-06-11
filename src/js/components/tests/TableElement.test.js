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
};

describe("Тестирование создание элемента таблицы", () => {
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

      expect(rezult.trim()).toMatch(waitRezult.trim());
    });

    it("Создание элемента, данные не переданы", () => {
      let sut = new TableElementServer();

      expect(() => sut.createElement()).toThrow();
    });

    it("Обновление элемента, данные переданы", () => {
      let sut = new TableElementServer(),
        tableBody = document.querySelector(".table__body");
      tableBody.insertAdjacentHTML("beforeend", sut.createElement(main));
      let element = tableBody.querySelector('[data-id="Russia_1"]');

      sut.updateElement(element, {
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
      });

      expect(element.dataset.status).toBe("died");
      expect(
        element.querySelector(".table-elements__column_amount-users")
          .textContent
      ).toBe("2");
    });

    it("Обновление элемента, данные не переданы", () => {
      let sut = new TableElementServer();

      expect(() => sut.updateElement()).toThrow();
    });
  });
});
