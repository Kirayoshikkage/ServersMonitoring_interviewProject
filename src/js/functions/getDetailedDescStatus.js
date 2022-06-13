function getDetailedDescStatus(status) {
  switch (status) {
    case "no problems":
      return "No problems";

    case "minor problems":
      return "Minor problems";

    case "many problems":
      return "Numerous problems or likely under active attack";

    case "died":
      return "Doesn't answer";
  }
}

export { getDetailedDescStatus };
