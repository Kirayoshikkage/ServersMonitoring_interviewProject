import { settings } from "./components/Settings";
import { Api, FetchRequest } from "./components/Api";
import { Storage } from "./components/Storage";
import { validateServers, validateUsers } from "./functions/validate";
import {
  formattingUsers,
  formattingServers,
  formattingMain,
} from "./functions/formatting";
import { TableElements } from "./components/TableElements";
import {
  TableElementServer,
  TableElementUser,
} from "./components/TableElement";
import { Info, serverInfoChangeDesc } from "./components/Info";
import {
  Search,
  hideElementTable,
  showElementTable,
  tableElementsComparison,
} from "./components/Search";

async function app() {
  let servers = new Api({
      url: settings.urlServers,
      api: new FetchRequest(),
    }),
    users = new Api({
      url: settings.urlUsers,
      api: new FetchRequest(),
    }),
    serversData = await (await servers.get()).json(),
    usersData = await (await users.get()).json(),
    storage = new Storage(),
    listServers = new TableElements({
      selector: ".servers__table-elements .table-elements__body",
      api: new TableElementServer(),
    }),
    listUsers = new TableElements({
      selector: ".info .table-elements__body",
      api: new TableElementUser(),
    }),
    showInfoServer = new Info(),
    listServersSearch = new Search({
      input: ".servers .search__input",
      container: ".servers .table-elements__body",
      selectorElements: ".table-elements__line",
      compare: ".table-elements__column_name",
    }),
    listUsersSearch = new Search({
      input: ".info .search__input",
      container: ".info .table-elements__body",
      selectorElements: ".table-elements__line",
      compare: ".table-elements__column_name",
    });

  storage.setFormatting("servers", formattingServers);
  storage.setFormatting("users", formattingUsers);
  storage.setValidation("servers", validateServers);
  storage.setValidation("users", validateUsers);

  storage.setData("servers", serversData);
  storage.setData("users", usersData);

  storage.setData(
    "main",
    formattingMain(storage.getData("servers"), storage.getData("users"))
  );

  storage.observer("servers", [
    () => {
      let users = storage.getData("users"),
        servers = storage.getData("servers");

      storage.setData("main", formattingMain(servers, users));
    },
  ]);

  storage.observer("users", [
    () => {
      let users = storage.getData("users"),
        servers = storage.getData("servers");

      storage.setData("main", formattingMain(servers, users));
    },
  ]);

  storage.observer("main", [
    () => {
      listServers.updateElements(storage.getData("main"));
    },
    () => {
      let key = showInfoServer.getKey();

      if (!key) return;

      let data = storage.getData("main")[key];

      listUsers.updateElements(data["subscribers"]);

      serverInfoChangeDesc(data);

      showInfoServer.updateData(data);
    },
  ]);

  listServers.generationElements(storage.getData("main"));

  showInfoServer.eventSet([
    () => {
      listUsers.generationElements(showInfoServer.getData()["subscribers"]);
    },
    () => {
      serverInfoChangeDesc(showInfoServer.getData());
    },
  ]);

  listServers.event("pointerdown", (e) => {
    if (e.target.closest("[data-id]")) {
      let element = e.target.closest("[data-id]"),
        id = element.dataset.id,
        data = storage.getData("main")[id];

      showInfoServer.setData(id, data);
    }
  });

  storage.updateData(() => {
    setInterval(() => {
      let users = [
        {
          id: 1,
          name: "Leanne Graham",
          email: "Sincere@april.biz",
          licenses: ["Russia_5", "USA_1"],
        },
        {
          id: 2,
          name: "Ervin Howell",
          email: "Shanna@melissa.tv",
          licenses: ["Russia_4", "USA_4", "Russia_5", "USA_2"],
        },
        {
          id: 3,
          name: "Clementine Bauch",
          email: "Nathan@yesenia.net",
          licenses: ["Russia_3", "USA_3"],
        },
        {
          id: 4,
          name: "Patricia Lebsack",
          email: "Julianne.OConner@kory.org",
          licenses: ["USA_1"],
        },
        {
          id: 5,
          name: "Chelsey Dietrich",
          email: "Lucio_Hettinger@annie.ca",
          licenses: ["USA_2", "USA_3", "USA_5"],
        },
        {
          id: 6,
          name: "Mrs. Dennis Schulist",
          email: "Karley_Dach@jasper.info",
          licenses: ["Russia_1", "Russia_2", "Russia_3"],
        },
        {
          id: 7,
          name: "Kurtis Weissnat",
          email: "Telly.Hoeger@billy.biz",
          licenses: ["USA_1", "Russia_4", "Russia_3"],
        },
        {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          email: "Sherwood@rosamond.me",
        },
        {
          id: 9,
          name: "Glenna Reichert",
          email: "Chaim_McDermott@dana.io",
          licenses: ["Russia_3"],
        },
        {
          id: 10,
          name: "Clementina DuBuque",
          email: "Rey.Padberg@karina.biz",
          licenses: ["Russia_3", "Russia_3"],
        },
      ];

      let servers = [
        {
          name: "Russia_1",
          status: "died",
        },
        {
          name: "Russia_2",
          status: "minor problems",
        },
        {
          name: "Russia_3",
          status: "many problems",
        },
        {
          name: "Russia_4",
          status: "no problems",
        },
        {
          name: "Russia_5",
          status: "died",
        },
        {
          name: "USA_1",
          status: "no problems",
        },
        {
          name: "USA_2",
          status: "minor problems",
        },
        {
          name: "USA_3",
          status: "many problems",
        },
        {
          name: "USA_4",
          status: "no problems",
        },
        {
          name: "USA_5",
          status: "died",
        },
      ];

      storage.setData("servers", servers);
      storage.setData("users", users);
    }, 5000);
  });

  listServersSearch.init();

  listServersSearch.setHide(hideElementTable);

  listServersSearch.setShow(showElementTable);

  listServersSearch.setComparison(tableElementsComparison);

  listUsersSearch.init();

  listUsersSearch.setHide(hideElementTable);

  listUsersSearch.setShow(showElementTable);

  listUsersSearch.setComparison(tableElementsComparison);
}

app();

/**
 *
 * Делаем запрос на сервер для получения списка серверов
 *
 * Делаем запрос на сервер для получения списка с пользователями
 *
 * -
 *
 * Валидируем список серверов (Если имени сервера нет - No name, если статуса нет - died, если пустые данные - пропускаем)
 *
 * Валидируем список пользователей (Если имени нет - No name, если почты нет - No email, если списка подписок нет - пропускаем, если пустые данные - пропускаем)
 *
 * -
 *
 * Форматируем список серверов {
 *  Russia_1: {
 *    name:'Russia_1',
 *    ...
 *  } - если имени нет, в ид ставим Date.now()
 * }
 *
 * Форматируем список пользователей {
 *  1: {
 *    id: 1,
 *    ...
 *  }
 * } - если id нет, в ид ставим Date.now()
 *
 * -
 *
 * Перебираем список пользователей, берем у каждого список лицензий, перебираем его
 * и в сервер добавляем этого пользователя
 *
 * -
 *
 * Записываем в стору получившиеся данные о серверах
 *
 * Генериурем список серверов
 *
 * Подписываем список серверов на обновление значений сторе
 *
 */
