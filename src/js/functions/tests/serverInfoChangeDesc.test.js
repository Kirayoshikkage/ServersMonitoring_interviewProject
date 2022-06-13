/**
 * @jest-environment jsdom
 */

import { serverInfoChangeDesc } from "../serverInfoChangeDesc";

let data = {
  name: "Russia_1",
  status: "no problems",
  subscribers: {
    1: {
      id: 1,
      name: "Leanne",
      surname: "Graham",
      email: "Sincere@april.biz",
      licenses: ["Russia_1"],
    },
    2: {
      id: 2,
      name: "Ervin",
      surname: "Howell",
      email: "Shanna@melissa.tv",
      licenses: ["Russia_1"],
    },
  },
};

describe("Тестирование изменения описания сервера", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let serverInfoDesc = `
      <section class="info">
        <div class="info__item info__item_status" data-status="">
          <h2 class="info__title"></h2>
          <p class="info__amount"></p>
          <p class="info__desc-status"></p>
        </div>
      </section>
    `;

    document.body.insertAdjacentHTML("beforeend", serverInfoDesc);
  });

  it("Изменение описания", () => {
    let title = document.querySelector(".info__title"),
      amount = document.querySelector(".info__amount"),
      descStatus = document.querySelector(".info__desc-status"),
      statusContainer = document.querySelector(".info__item_status");

    serverInfoChangeDesc(data);

    expect(title.textContent).toBe(data.name);
    expect(parseFloat(amount.textContent.match(/\d+/))).toBe(
      Object.keys(data.subscribers).length
    );
    expect(descStatus.textContent).not.toBe("");
    expect(statusContainer.dataset.status).not.toBe("");
  });
});
