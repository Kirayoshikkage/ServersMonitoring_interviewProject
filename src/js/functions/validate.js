function validateServers(data) {
  return data.reduce((acc, item) => {
    if (!Object.keys(item).length) return acc;

    let { name, status } = item;

    acc.push({
      name: typeof name === "string" && name !== "" ? name : "No name",
      status: typeof status === "string" && status !== "" ? status : "died",
    });

    return acc;
  }, []);
}

function validateUsers(data) {
  return data.reduce((acc, item) => {
    if (!Object.keys(item).length) return acc;

    let { id, name, email, licenses } = item;

    if (!Array.isArray(licenses) || !licenses.length) return acc;

    acc.push({
      name: typeof name === "string" && name !== "" ? name : "No name",
      email: typeof email === "string" && email !== "" ? email : "No email",
      id: id ? id : Date.now(),
      licenses: licenses,
    });

    return acc;
  }, []);
}

export { validateServers, validateUsers };
