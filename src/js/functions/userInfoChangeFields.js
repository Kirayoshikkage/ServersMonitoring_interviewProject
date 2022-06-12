function userInfoChangeFilds({ name, surname, email, licenses }) {
  let infoSidebar = document.querySelector(".info__sidebar"),
    nameField = infoSidebar.querySelector(".sidebar__name"),
    emailField = infoSidebar.querySelector(".sidebar__email"),
    licencesAmount = infoSidebar.querySelector(".sidebar__amount"),
    licencesList = infoSidebar.querySelector(".sidebar-licences"),
    licencesItems = "";

  nameField.textContent = `${name} ${surname}`;
  emailField.textContent = email;
  licencesAmount.textContent = `(${licenses.length})`;

  licenses.forEach((license) => {
    licencesItems += `
    <li class="sidebar-licences__item">
      <h3 class="sidebar__subtitle">${license}</h3>
    </li>
    `;
  });

  licencesList.innerHTML = "";
  licencesList.insertAdjacentHTML("beforeend", licencesItems);
}

export { userInfoChangeFilds };
