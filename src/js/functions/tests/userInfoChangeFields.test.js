/**
 * @jest-environment jsdom
 */

import { userInfoChangeFilds } from "../userInfoChangeFields";

let data = {
  id: 1,
  name: "Leanne",
  surname: "Graham",
  email: "Sincere@april.biz",
  licenses: ["Russia_1"],
};

describe("Тестирование изменения значения полей пользователя", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let elements = `
      <div class="info__sidebar">
        <h2 class="sidebar__name"></h2>
        <h3 class="sidebar__email"></h3>
        <span class="sidebar__amount"></span>
        <ul class="sidebar-licences"></ul>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", elements);
  });

  it("Изменение значений", () => {
    let name = document.querySelector(".sidebar__name"),
      email = document.querySelector(".sidebar__email"),
      amount = document.querySelector(".sidebar__amount"),
      licencesList = document.querySelector(".sidebar-licences");

    userInfoChangeFilds(data);

    expect(name.textContent).toBe(`${data.name} ${data.surname}`);
    expect(email.textContent).toBe(data.email);
    expect(parseFloat(amount.textContent.match(/\d+/))).toBe(
      Object.keys(data.licenses).length
    );
    expect(licencesList.children.length).not.toBe(0);
  });
});
