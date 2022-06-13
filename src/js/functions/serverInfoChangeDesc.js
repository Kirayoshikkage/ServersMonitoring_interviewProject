import { getDetailedDescStatus } from "./getDetailedDescStatus";

function serverInfoChangeDesc({ status, name, subscribers }) {
  let infoContainer = document.querySelector(".info"),
    title = infoContainer.querySelector(".info__title"),
    amount = infoContainer.querySelector(".info__amount"),
    descStatus = infoContainer.querySelector(".info__desc-status"),
    statusContainer = infoContainer.querySelector(".info__item_status");

  descStatus.textContent = getDetailedDescStatus(status);
  statusContainer.dataset.status = status;
  title.textContent = name;
  amount.textContent = `(${Object.keys(subscribers).length} connections)`;
}

export { serverInfoChangeDesc };
