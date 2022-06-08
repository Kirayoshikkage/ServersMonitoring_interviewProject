/**
 * @jest-environment jsdom
 */

import { TableElementServer } from "../TableElement";

describe("Тестирование создания одного элемента из таблицы серверов", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    document.body.insertAdjacentHTML("beforeend", "<table></table>");
  });

  it("Создание элемента, переданные данные корректны", () => {
    let sut = new TableElementServer(),
      data = {
        name: "Russia_1",
        status: "died",
        connections: [{ name: "Alex" }],
      };

    let rezult = sut.createElement(data);

    expect(rezult.trim()).toBe(
      `
      <tr data-id="Russia_1" data-status="died" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name">
          Russia_1
        </td>
        <td class="table-elements__column table-elements__column_amount-users">1</td>
      </tr>
      `.trim()
    );
  });

  it("Создание элемента, некоторые значения пусты", () => {
    let sut = new TableElementServer(),
      data = {
        name: "",
        status: "no problems",
        connections: [{ name: "Alex" }],
      };

    let rezult = sut.createElement(data);

    expect(rezult.trim()).toBe(
      `
      <tr data-id="No name" data-status="no problems" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name">
          No name
        </td>
        <td class="table-elements__column table-elements__column_amount-users">1</td>
      </tr>
      `.trim()
    );
  });

  it("Создание элемента, переданные данные пусты", () => {
    let sut = new TableElementServer(),
      data = {};

    let rezult = sut.createElement(data);

    expect(rezult.trim()).toBe(
      `<tr class="table-elements__line">
        <td class="table-elements__error">
          Что-то пошло не так...
        </td>
      </tr>`.trim()
    );
  });

  it("Создание элемента, данные не переданы", () => {
    let sut = new TableElementServer();

    let rezult = sut.createElement();

    expect(rezult.trim()).toBe(
      `<tr class="table-elements__line">
        <td class="table-elements__error">
          Что-то пошло не так...
        </td>
      </tr>`.trim()
    );
  });

  it("Обновление данных", () => {
    let sut = new TableElementServer(),
      data = {
        name: "Russia_1",
        status: "died",
        connections: [{ name: "Alex" }],
      };
    document
      .querySelector("table")
      .insertAdjacentHTML("beforeend", sut.createElement(data));
    data["connections"] = [];
    data["status"] = "no problem";
    let item = document.querySelector(`[data-id="${data.name}"]`);

    sut.updateElement(item, data);

    expect(item.dataset.status).toBe(data.status);
    expect(
      item.querySelector(".table-elements__column_amount-users").textContent
    ).toBe("0");
  });

  it("Обновление данных, переданный элемент null", () => {
    let sut = new TableElementServer(),
      data = {
        name: "Russia_1",
        status: "died",
        connections: [{ name: "Alex" }],
      };
    document
      .querySelector("table")
      .insertAdjacentHTML("beforeend", sut.createElement(data));
    data["connections"] = [];
    data["status"] = "no problem";
    let item = document.querySelector(`[data-id="${data.name}"]`);

    sut.updateElement(null, data);

    expect(item.dataset.status).toBe("died");
    expect(
      item.querySelector(".table-elements__column_amount-users").textContent
    ).toBe("1");
  });

  it("Обновление данных, переданный элемент не html", () => {
    let sut = new TableElementServer(),
      data = {
        name: "Russia_1",
        status: "died",
        connections: [{ name: "Alex" }],
      };
    document
      .querySelector("table")
      .insertAdjacentHTML("beforeend", sut.createElement(data));
    data["connections"] = [];
    data["status"] = "no problem";
    let item = document.querySelector(`[data-id="${data.name}"]`);

    sut.updateElement(123, data);

    expect(item.dataset.status).toBe("died");
    expect(
      item.querySelector(".table-elements__column_amount-users").textContent
    ).toBe("1");
  });

  it("Обновление данных, переданные данные невалидны", () => {
    let sut = new TableElementServer(),
      data = {
        name: "Russia_1",
        status: "died",
        connections: [{ name: "Alex" }],
      };
    document
      .querySelector("table")
      .insertAdjacentHTML("beforeend", sut.createElement(data));
    data["connections"] = "arr";
    data["status"] = 123;
    let item = document.querySelector(`[data-id="${data.name}"]`);

    sut.updateElement(item, data);

    expect(item.dataset.status).toBe("died");
    expect(
      item.querySelector(".table-elements__column_amount-users").textContent
    ).toBe("1");
  });
});
