function formattingServers(data = null) {
  if (!data) throw new Error("Data not transfered");

  if (!Array.isArray(data)) throw new Error("Invalid type passed data");

  if (!data.length) throw new Error("Data is empty");

  return data.reduce((acc, item) => {
    item.subscribers = {};

    acc[item.name] = item;

    return acc;
  }, {});
}

function formattingUsers(data = null) {
  if (!data) throw new Error("Data not transfered");

  if (!Array.isArray(data)) throw new Error("Invalid type passed data");

  if (!data.length) throw new Error("Data is empty");

  return data.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});
}

function formattingMain(servers = null, users = null) {
  if (!servers) throw new Error("Servers not transfered");

  if (!users) throw new Error("Users not transfered");

  if (Object.prototype.toString.call(servers) !== "[object Object]") {
    throw new Error("Servers wrong type");
  }

  if (Object.prototype.toString.call(users) !== "[object Object]") {
    throw new Error("Users wrong type");
  }

  if (!Object.keys(servers).length) throw new Error("Servers is empty");

  if (!Object.keys(users).length) throw new Error("Users is empty");

  let rezult = JSON.parse(JSON.stringify(servers));

  Object.keys(users).forEach((item) => {
    let { licenses = null } = users[item];

    licenses?.forEach((server) => {
      if (!rezult[server]) return;

      rezult[server].subscribers[item] = users[item];
    });
  });

  return rezult;
}

export { formattingUsers, formattingServers, formattingMain };
