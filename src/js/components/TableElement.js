class ATableELement {
  createElement(data) {
    throw new Error("Method not implemented");
  }

  updateElement(item, data) {
    throw new Error("Method not implemented");
  }
}

class TableElementServer extends ATableELement {
  createElement(data) {
    let { name, status, connections } = data;

    return `
      <tr data-id="${name}" data-status="${status}" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name status">
          ${name}
        </td>
        <td class="table-elements__column table-elements__column_amount-users">${
          Object.keys(connections).length
        }</td>
      </tr>
    `;
  }

  updateElement(item = null, data = null) {
    if (!(item instanceof HTMLElement) || !item || !data) {
      return;
    }

    let { status = null, connections = null } = data;

    item.dataset.status = status;

    item.querySelector(".table-elements__column_amount-users").textContent =
      Object.keys(connections).length;
  }
}

class TableElementUser extends ATableELement {
  createElement(data) {
    let { name, surname, email, id } = data;

    return `
      <tr data-id="${id}" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name">
          ${name}
        </td>
        <td class="table-elements__column table-elements__column_surname">
          ${surname}
        </td>
        <td class="table-elements__column table-elements__column_email">
          ${email}
        </td>
      </tr>
    `;
  }

  updateElement(item, data) {
    let { name, surname, email, id } = data;

    item.dataset.id = id;
    item.querySelector(".table-elements__column_name").textContent = name;
    item.querySelector(".table-elements__column_surname").textContent = surname;
    item.querySelector(".table-elements__column_email").textContent = email;
  }
}

export { TableElementServer, TableElementUser };
