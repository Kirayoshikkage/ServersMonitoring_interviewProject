class ATableELement {
  createElement(data) {
    throw new Error("Method not implemented");
  }

  updateElement(item, data) {
    throw new Error("Method not implemented");
  }
}

class TableElementServer extends ATableELement {
  createElement(data = null) {
    if (!data) throw new Error("Data not transferend");

    let { name, status, subscribers } = data;

    return `
      <tr data-id="${name}" data-status="${status}" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name status">
          ${name}
        </td>
        <td class="table-elements__column table-elements__column_amount-users">${
          Object.keys(subscribers).length
        }</td>
      </tr>
    `;
  }

  updateElement(element = null, data = null) {
    if (!element) throw new Error("Element not transferend");

    if (!data) throw new Error("Data not transferend");

    let { status, subscribers } = data;

    element.dataset.status = status;

    element.querySelector(".table-elements__column_amount-users").textContent =
      Object.keys(subscribers).length;
  }
}

class TableElementUser extends ATableELement {
  createElement(data) {
    if (!data) throw new Error("Data not transferend");

    let { name, licenses, email, id } = data;

    return `
      <tr data-id="${id}" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name">
          ${name}
        </td>
        <td class="table-elements__column table-elements__column_email">
          ${email}
        </td>
        <td class="table-elements__column table-elements__column_licenses">
          ${licenses}
        </td>
      </tr>
    `;
  }

  updateElement(element, data) {
    if (!element) throw new Error("Element not transferend");

    if (!data) throw new Error("Data not transferend");

    let { name, licenses, email, id } = data;

    element.dataset.id = id;
    element.querySelector(".table-elements__column_name").textContent = name;
    element.querySelector(".table-elements__column_email").textContent = email;
    element.querySelector(".table-elements__column_licenses").textContent =
      licenses;
  }
}

export { TableElementServer, TableElementUser };
