function formattingServers(data) {
  return data.reduce((acc, item) => {
    let key = item.name ? item.name : Date.now();

    item.subscribers = {};

    acc[key] = item;

    return acc;
  }, {});
}

function formattingUsers(data) {
  return data.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});
}

function formattingMain(servers, users) {
  let rezult = JSON.parse(JSON.stringify(servers));

  Object.keys(users).forEach((item) => {
    let { licenses = null } = users[item];

    licenses?.forEach((server) => {
      rezult[server].subscribers[item] = users[item];
    });
  });

  return rezult;
}

export { formattingUsers, formattingServers, formattingMain };
