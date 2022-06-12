function serverInfoChangeDesc({ status, name, subscribers }) {
  let infoContainer = document.querySelector(".info"),
    title = infoContainer.querySelector(".info__title"),
    amount = infoContainer.querySelector(".info__amount"),
    descStatus = infoContainer.querySelector(".info__desc-status"),
    descStatusText = "",
    statusContainer = infoContainer.querySelector(".info__item_status");

  switch (status) {
    case "no problems":
      descStatusText = "No problems";
      break;
    case "minor problems":
      descStatusText = "Minor problems";
      break;
    case "many problems":
      descStatusText = "Numerous problems or likely under active attack";
      break;
    case "died":
      descStatusText = "Doesn't answer";
      break;
  }

  descStatus.textContent = descStatusText;
  statusContainer.dataset.status = status;
  title.textContent = name;
  amount.textContent = `(${Object.keys(subscribers).length} connections)`;
}

export { serverInfoChangeDesc };
