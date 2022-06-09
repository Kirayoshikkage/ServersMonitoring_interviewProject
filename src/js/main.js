import { settings } from "./components/Settings";
import { Api, FetchRequest } from "./components/Api";
import { Storage, formatServers, validateServers } from "./components/Storage";
import { TableElements } from "./components/TableElements";
import {
  TableElementServer,
  TableElementUser,
} from "./components/TableElement";
import { Info, serverInfoChangeDesc } from "./components/Info";

async function app() {
  try {
    let servers = new Api({
        url: settings.url,
        api: new FetchRequest(),
      }),
      serversData = await (await servers.get()).json(),
      storage = new Storage({
        format: {
          servers: formatServers,
        },
        validate: {
          servers: validateServers,
        },
      }),
      listServers = new TableElements({
        selector: ".servers__table-elements .table-elements__body",
        api: new TableElementServer(),
      }),
      listUsers = new TableElements({
        selector: ".info .table-elements__body",
        api: new TableElementUser(),
      }),
      showInfoServer = new Info(".info");

    storage.setData("servers", serversData);

    listServers.generationElements(storage.getData("servers"));

    storage.observer("servers", [
      () => {
        listServers.updateElements(storage.getData("servers"));
      },
      () => {
        let key = showInfoServer.getKey(),
          data = storage.getData("servers")[key];

        listUsers.updateElements(data["connections"]);
        serverInfoChangeDesc(data);
        showInfoServer.updateData(data);
      },
    ]);

    showInfoServer.eventSet([
      () => {
        listUsers.generationElements(showInfoServer.getData()["connections"]);
      },
      () => {
        serverInfoChangeDesc(showInfoServer.getData());
      },
    ]);

    listServers.event("pointerdown", (e) => {
      if (e.target.closest("[data-id]")) {
        let element = e.target.closest("[data-id]"),
          id = element.dataset.id,
          data = storage.getData("servers")[id];

        showInfoServer.setData(id, data);
      }
    });

    listUsers.event("pointerdown", (e) => {
      if (e.target.closest("[data-id]")) {
        let element = e.target.closest("[data-id]");

        console.log(element);
      }
    });

    setInterval(() => {
      let obj = [
        {
          name: "Russia_1",
          status: "no problems",
          connections: [
            {
              id: "1",
              name: "Leanne",
              surname: "Graham",
              email: "Sincere@april.biz",
            },
          ],
        },
        {
          name: "Russia_2",
          status: "minor problems",
          connections: [
            {
              id: "4",
              name: "Patricia",
              surname: "Lebsack",
              email: "Julianne.OConner@kory.org",
            },
            {
              id: "2",
              name: "Clementin",
              surname: "Bauch",
              email: "Nathan@yesenia.net",
            },
          ],
        },
        {
          name: "Russia_3",
          status: "many problems",
          connections: [
            {
              id: "4",
              name: "Patricia",
              surname: "Lebsack",
              email: "Julianne.OConner@kory.org",
            },
            {
              id: "2",
              name: "Clementin",
              surname: "Bauch",
              email: "Nathan@yesenia.net",
            },
            {
              id: "5",
              name: "Nicholas",
              surname: "Runolfsdottir",
              email: "Sherwood@rosamond.me",
            },
            {
              id: "6",
              name: "Clementina",
              surname: "DuBuque",
              email: "Rey.Padberg@karina.biz",
            },
          ],
        },
        {
          name: "Russia_4",
          status: "no problems",
          connections: [
            {
              id: "4",
              name: "Patricia",
              surname: "Lebsack",
              email: "Julianne.OConner@kory.org",
            },
            {
              id: "3",
              name: "Mrs. Dennis",
              surname: "Schulist",
              email: "Karley_Dach@jasper.info",
            },
            {
              id: "7",
              name: "Ervin",
              surname: "Howell",
              email: "Shanna@melissa.tv",
            },
          ],
        },
        {
          name: "Russia_5",
          status: "died",
          connections: [
            {
              id: "4",
              name: "Patricia",
              surname: "Lebsack",
              email: "Julianne.OConner@kory.org",
            },
            {
              id: "1",
              name: "Leanne",
              surname: "Graham",
              email: "Sincere@april.biz",
            },
            {
              id: "7",
              name: "Ervin",
              surname: "Howell",
              email: "Shanna@melissa.tv",
            },
            {
              id: "5",
              name: "Nicholas",
              surname: "Runolfsdottir",
              email: "Sherwood@rosamond.me",
            },
          ],
        },
        {
          name: "USA_1",
          status: "no problems",
          connections: [
            {
              id: "4",
              name: "Patricia",
              surname: "Lebsack",
              email: "Julianne.OConner@kory.org",
            },
          ],
        },
        {
          name: "USA_2",
          status: "minor problems",
          connections: [
            {
              id: "4",
              name: "Patricia",
              surname: "Lebsack",
              email: "Julianne.OConner@kory.org",
            },
            {
              id: "8",
              name: "Chelsey",
              surname: "Dietrich",
              email: "Lucio_Hettinger@annie.ca",
            },
            {
              id: "3",
              name: "Mrs. Dennis",
              surname: "Schulist",
              email: "Karley_Dach@jasper.info",
            },
            {
              id: "9",
              name: "Kurtis",
              surname: "Weissnat",
              email: "Telly.Hoeger@billy.biz",
            },
            {
              id: "5",
              name: "Nicholas",
              surname: "Runolfsdottir",
              email: "Sherwood@rosamond.me",
            },
            {
              id: "10",
              name: "Glenna",
              surname: "Reichert",
              email: "Chaim_McDermott@dana.io",
            },
            {
              id: "6",
              name: "Clementina",
              surname: "DuBuque",
              email: "Rey.Padberg@karina.biz",
            },
          ],
        },
        {
          name: "USA_3",
          status: "many problems",
          connections: [
            {
              id: "6",
              name: "Clementina",
              surname: "DuBuque",
              email: "Rey.Padberg@karina.biz",
            },
          ],
        },
        {
          name: "USA_4",
          status: "no problems",
          connections: [
            {
              id: "6",
              name: "Clementina",
              surname: "DuBuque",
              email: "Rey.Padberg@karina.biz",
            },
            {
              id: "1",
              name: "Leanne",
              surname: "Graham",
              email: "Sincere@april.biz",
            },
            {
              id: "7",
              name: "Ervin",
              surname: "Howell",
              email: "Shanna@melissa.tv",
            },
            {
              id: "2",
              name: "Clementin",
              surname: "Bauch",
              email: "Nathan@yesenia.net",
            },
          ],
        },
        {
          name: "USA_5",
          status: "died",
        },
      ];

      storage.setData("servers", obj);
    }, 5000);
  } catch (error) {
    console.log(error);
  }
}

app();
