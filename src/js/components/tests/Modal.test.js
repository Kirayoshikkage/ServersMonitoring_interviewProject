/**
 * @jest-environment jsdom
 */

import { Modal } from "../Modal";

describe("Тестирование модального окна", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let modal = `
      <div class="modal">
        <div class="modal__body">
          <div class="container">
            <div class="modal__content">
              Lorem
              <button class="btn-reset modal__close">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    let trigger = '<button class="modal-trigger">Click</button>';

    document.body.insertAdjacentHTML("beforeend", modal);
    document.body.insertAdjacentHTML("beforeend", trigger);
  });

  it("Переданные данные не валидны", () => {
    let sut = new Modal({
      selector: [],
      openBtn: {},
      closeBtn: 12,
      selectorActive: 343,
      apiAnimation: [],
      apiBlockFocus: {},
    });

    expect(() => sut.init()).toThrow();
  });

  it("Данные не переданы", () => {
    let sut = new Modal();

    expect(() => sut.init()).toThrow();
  });

  it("Переданные данные корректны", () => {
    let sut = new Modal({
      selector: ".modal",
      openBtn: ".modal-trigger",
      closeBtn: ".modal__close",
    });

    expect(() => sut.init()).not.toThrow();
  });

  it("Проверка состояния при открытом модальном окне", () => {
    let sut = new Modal({
      selector: ".modal",
      openBtn: ".modal-trigger",
      closeBtn: ".modal__close",
      selectorActive: "modal_active",
    });
    sut.init();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeTruthy();
  });

  it("Проверка состояния при закрытом модальном окне", () => {
    let sut = new Modal({
      selector: ".modal",
      openBtn: ".modal-trigger",
      closeBtn: ".modal__close",
      selectorActive: "modal_active",
    });
    sut.init();
    sut.toggleState();
    sut.toggleState();

    let rezult = sut.isOpen();

    expect(rezult).toBeFalsy();
  });
});
