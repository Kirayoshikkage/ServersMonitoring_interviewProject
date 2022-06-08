class ATableELement {
  createElement(data) {
    throw new Error("Method not implemented");
  }

  updateElement(item) {
    throw new Error("Method not implemented");
  }
}

class TableElementServer extends ATableELement {
  createElement(data = null) {
    if (
      Object.prototype.toString.call(data) !== "[object Object]" ||
      !Object.keys(data).length
    ) {
      return `<tr class="table-elements__line">
        <td class="table-elements__error">
          Что-то пошло не так...
        </td>
      </tr>`;
    }

    let { name = null, status = null, connections = null } = data;

    name = typeof name === "string" && name !== "" ? name : "No name";

    status = typeof status === "string" && status !== "" ? status : "died";

    let amountConnections =
      connections && Array.isArray(connections) ? connections.length : 0;

    return `
      <tr data-id="${name}" data-status="${status}" class="table-elements__line">
        <td class="table-elements__column table-elements__column_name">
          ${name}
        </td>
        <td class="table-elements__column table-elements__column_amount-users">${amountConnections}</td>
      </tr>
    `;
  }

  updateElement(item = null, data) {
    if (!(item instanceof HTMLElement) || !item) {
      return;
    }

    let { status = null, connections = null } = data;

    if (!status || typeof status !== "string" || status === "") {
      return;
    }

    if (!connections || !Array.isArray(connections)) {
      return;
    }

    item.dataset.status = status;

    item.querySelector(".table-elements__column_amount-users").textContent =
      connections.length;
  }
}

export { TableElementServer };
