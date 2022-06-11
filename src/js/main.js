import { settings } from "./components/Settings";
import { Api, FetchRequest } from "./components/Api";
import { Storage } from "./components/Storage";
import { validateServers, validateUsers } from "./functions/validation";
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
import { DetailedInfo, serverInfoChangeDesc } from "./components/DetailedInfo";
import {
  Search,
  hideElementTable,
  showElementTable,
  tableElementsComparison,
} from "./components/Search";
import { InfoUser, userInfoChangeDesc } from "./components/InfoUser";
import { FadeAnimation } from "./components/FadeAnimation";
import { BlockFocus } from "./components/BlockFocus.js";

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
    detailedInfoServer = new DetailedInfo(),
    detailedInfoUser = new DetailedInfo(),
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
    }),
    infoUser = new InfoUser({
      selector: ".servers__info-user",
      closeBtn: ".servers__info-user .info-user__close",
      selectorActive: "info-user_active",
      apiAnimation: new FadeAnimation(),
      apiBlockFocus: new BlockFocus(),
    });

  infoUser.init();

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
      let key = detailedInfoServer.getKey();

      if (!key) return;

      let data = storage.getData("main")[key];

      listUsers.updateElements(data["subscribers"]);

      serverInfoChangeDesc(data);

      detailedInfoServer.updateData(data);
    },
  ]);

  listServers.init();

  listUsers.init();

  listServers.generationElements(storage.getData("main"));

  detailedInfoServer.eventSet([
    () => {
      listUsers.generationElements(detailedInfoServer.getData()["subscribers"]);
    },
    () => {
      serverInfoChangeDesc(detailedInfoServer.getData());
    },
  ]);

  detailedInfoUser.eventSet([
    () => {
      let data = detailedInfoUser.getData();

      userInfoChangeDesc(data);
      infoUser.toggleState();
    },
  ]);

  listServers.event("pointerdown", (e) => {
    if (e.target.closest("[data-id]")) {
      let element = e.target.closest("[data-id]"),
        id = element.dataset.id,
        data = storage.getData("main")[id];

      detailedInfoServer.setData(id, data);
    }
  });

  listUsers.event("pointerdown", (e) => {
    if (e.target.closest("[data-id]")) {
      let element = e.target.closest("[data-id]"),
        id = element.dataset.id,
        data = storage.getData("users")[id];

      detailedInfoUser.setData(id, data);
    }
  });

  storage.updateData(() => {
    setInterval(() => {
      let users = [
        {
          id: 1,
          name: "Leanne",
          surname: "Graham",
          email: "Sincere@april.biz",
          licenses: ["Russia_5", "USA_1"],
        },
        {
          id: 2,
          name: "Ervin",
          surname: "Howell",
          email: "Shanna@melissa.tv",
          licenses: ["Russia_4", "USA_4", "Russia_5", "USA_2"],
        },
        {
          id: 3,
          name: "Clementine",
          surname: "Bauch",
          email: "Nathan@yesenia.net",
          licenses: ["Russia_3", "USA_3", "Russia_1"],
        },
        {
          id: 4,
          name: "Patricia",
          surname: "Lebsack",
          email: "Julianne.OConner@kory.org",
          licenses: ["USA_1"],
        },
        {
          id: 5,
          name: "Chelsey",
          surname: "Dietrich",
          email: "Lucio_Hettinger@annie.ca",
          licenses: ["USA_2", "USA_3", "USA_5"],
        },
        {
          id: 6,
          name: "Mrs. Dennis",
          surname: "Schulist",
          email: "Karley_Dach@jasper.info",
          licenses: ["Russia_1", "Russia_2", "Russia_3"],
        },
        {
          id: 7,
          name: "Kurtis",
          surname: "Weissnat",
          email: "Telly.Hoeger@billy.biz",
          licenses: ["USA_1", "Russia_4", "Russia_3"],
        },
        {
          id: 8,
          name: "Nicholas",
          surname: "Runolfsdottir V",
          email: "Sherwood@rosamond.me",
        },
        {
          id: 9,
          name: "Glenna",
          surname: "Reichert",
          email: "Chaim_McDermott@dana.io",
          licenses: ["Russia_3"],
        },
        {
          id: 10,
          name: "Clementina",
          surname: "DuBuque",
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
        {
          name: "USA_6",
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

  document.querySelector(".logo").addEventListener("click", (e) => {
    e.preventDefault();

    infoUser.toggleState();
  });
}

app();

/**
 *
 * Тесты на :
 *
 *  TableElement
 *
 *  Search
 *
 */
