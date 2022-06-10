function formattingServers(data) {
  if (!Array.isArray(data)) throw new Error("Invalid type passed data");

  if (!data.length) throw new Error("Data is empty");

  return data.reduce((acc, item) => {
    let key = item.name ? item.name : Date.now();

    item.subscribers = {};

    acc[key] = item;

    return acc;
  }, {});
}

function formattingUsers(data) {
  if (!Array.isArray(data)) throw new Error("Invalid type passed data");

  if (!data.length) throw new Error("Data is empty");

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

/**
 *
 * Переданы валидные данные
 *
 * Переданы пустые данные
 *
 * Передан не массив
 *
 */
