/**
 * @jest-environment jsdom
 */

import { Sidebar } from "../Sidebar";

describe("Тестирование боковой панели", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let sidebar = `
        <div class="sidebar">
          <div class="sidebar__body">
            <div class="sidebar__content">
              Lorem
              <button type="button" class="sidebar__close">
                Close
              </button>
            </div>
          </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", sidebar);
  });

  it("Переданные данные не валидны", () => {
    let sut = new Sidebar({
      selector: [],
      closeBtn: 12,
      selectorActive: 343,
      apiAnimation: [],
      apiBlockFocus: {},
    });

    expect(() => sut.init()).toThrow();
  });

  it("Данные не переданы", () => {
    let sut = new Sidebar();

    expect(() => sut.init()).toThrow();
  });

  it("Переданные данные корректны", () => {
    let sut = new Sidebar({
      selector: ".sidebar",
      closeBtn: ".sidebar__close",
    });

    expect(() => sut.init()).not.toThrow();
  });

  it("Проверка состояния при открытой боковой панели", () => {
    let sut = new Sidebar({
      selector: ".sidebar",
      closeBtn: ".sidebar__close",
    });
    sut.init();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeTruthy();
  });

  it("Проверка состояния при закрытой боковой панели", () => {
    let sut = new Sidebar({
      selector: ".sidebar",
      closeBtn: ".sidebar__close",
    });
    sut.init();
    sut.toggleState();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeFalsy();
  });
});
