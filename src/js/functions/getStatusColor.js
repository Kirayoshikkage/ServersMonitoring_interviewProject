function getStatusColor(status) {
  switch (status) {
    case "no problems":
      return "#87ff85";
    case "minor problems":
      return "#fffb95";
    case "many problems":
      return "#f55151";
    case "died":
      return "#cbcbcb";
  }
}

export { getStatusColor };
