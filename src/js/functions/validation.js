function validateServers(data = null) {
  if (!data) throw new Error("Data not transfered");

  if (!data.length) throw new Error("Data is empty");

  return data.reduce((acc, item) => {
    if (!Object.keys(item).length) return acc;

    let { name = null, status = null, geo = null } = item;

    if (!name || name === "") return acc;

    if (!status || status === "") return acc;

    if (!geo) return acc;

    acc.push({
      name,
      status,
      geo,
    });

    return acc;
  }, []);
}

function validateUsers(data) {
  if (!data) throw new Error("Data not transfered");

  if (!data.length) throw new Error("Data is empty");

  return data.reduce((acc, item) => {
    if (!Object.keys(item).length) return acc;

    let { id = null, name, surname, email, licenses } = item;

    if (!Array.isArray(licenses) || !licenses.length) return acc;

    acc.push({
      name: typeof name === "string" && name !== "" ? name : "No name",
      surname:
        typeof surname === "string" && surname !== "" ? surname : "No surname",
      email: typeof email === "string" && email !== "" ? email : "No email",
      id: id ? id : Date.now(),
      licenses: licenses,
    });

    return acc;
  }, []);
}

export { validateServers, validateUsers };
