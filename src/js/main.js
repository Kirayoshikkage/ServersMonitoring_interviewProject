import { settings } from "./components/Settings";
import { Api, FetchRequest } from "./components/Api";
import { Storage, formatDataKeyValue } from "./components/Storage";
import { TableElements } from "./components/TableElements";
import { TableElementServer } from "./components/TableElement";

async function app() {
  let servers = new Api({
      url: settings.url,
      api: new FetchRequest(),
    }),
    serversData = await (await servers.get()).json(),
    storage = new Storage(formatDataKeyValue),
    listServers = new TableElements({
      selector: ".servers__table-elements .table-elements__body",
      api: new TableElementServer(),
    });

  storage.setData("servers", storage.formatData(serversData));

  listServers.generationElements(storage.getData("servers"));

  storage.observer("servers", () => {
    listServers.updateElements(storage.getData("servers"));
  });

  /*   setTimeout(() => {
    let obj = {
      Russia_1: {
        name: "Russia_1",
        status: "died",
        connections: [],
      },
      Russia_2: {
        name: "Russia_2",
        status: "minor problems",
        connections: [
          {
            name: "Patricia",
            surname: "Lebsack",
            email: "Julianne.OConner@kory.org",
          },
          {
            name: "Clementin",
            surname: "Bauch",
            email: "Nathan@yesenia.net",
          },
        ],
      },
      Russia_3: {
        name: "Russia_3",
        status: "many problems",
        connections: [
          {
            name: "Patricia",
            surname: "Lebsack",
            email: "Julianne.OConner@kory.org",
          },
          {
            name: "Clementin",
            surname: "Bauch",
            email: "Nathan@yesenia.net",
          },
          {
            name: "Nicholas",
            surname: "Runolfsdottir",
            email: "Sherwood@rosamond.me",
          },
          {
            name: "Clementina",
            surname: "DuBuque",
            email: "Rey.Padberg@karina.biz",
          },
        ],
      },
      Russia_4: {
        name: "Russia_4",
        status: "no problems",
        connections: [
          {
            name: "Patricia",
            surname: "Lebsack",
            email: "Julianne.OConner@kory.org",
          },
          {
            name: "Mrs. Dennis",
            surname: "Schulist",
            email: "Karley_Dach@jasper.info",
          },
          {
            name: "Ervin",
            surname: "Howell",
            email: "Shanna@melissa.tv",
          },
        ],
      },
      Russia_5: {
        name: "Russia_5",
        status: "died",
        connections: [
          {
            name: "Patricia",
            surname: "Lebsack",
            email: "Julianne.OConner@kory.org",
          },
          {
            name: "Leanne",
            surname: "Graham",
            email: "Sincere@april.biz",
          },
          {
            name: "Ervin",
            surname: "Howell",
            email: "Shanna@melissa.tv",
          },
          {
            name: "Nicholas",
            surname: "Runolfsdottir",
            email: "Sherwood@rosamond.me",
          },
        ],
      },
      USA_1: {
        name: "USA_1",
        status: "no problems",
        connections: [
          {
            name: "Patricia",
            surname: "Lebsack",
            email: "Julianne.OConner@kory.org",
          },
        ],
      },
      USA_2: {
        name: "USA_2",
        status: "minor problems",
        connections: [
          {
            name: "Patricia",
            surname: "Lebsack",
            email: "Julianne.OConner@kory.org",
          },
          {
            name: "Chelsey",
            surname: "Dietrich",
            email: "Lucio_Hettinger@annie.ca",
          },
          {
            name: "Mrs. Dennis",
            surname: "Schulist",
            email: "Karley_Dach@jasper.info",
          },
          {
            name: "Kurtis",
            surname: "Weissnat",
            email: "Telly.Hoeger@billy.biz",
          },
          {
            name: "Nicholas",
            surname: "Runolfsdottir",
            email: "Sherwood@rosamond.me",
          },
          {
            name: "Glenna",
            surname: "Reichert",
            email: "Chaim_McDermott@dana.io",
          },
          {
            name: "Clementina",
            surname: "DuBuque",
            email: "Rey.Padberg@karina.biz",
          },
        ],
      },
      USA_3: {
        name: "USA_3",
        status: "many problems",
        connections: [
          {
            name: "Clementina",
            surname: "DuBuque",
            email: "Rey.Padberg@karina.biz",
          },
        ],
      },
      USA_4: {
        name: "USA_4",
        status: "no problems",
        connections: [
          {
            name: "Clementina",
            surname: "DuBuque",
            email: "Rey.Padberg@karina.biz",
          },
          {
            name: "Leanne",
            surname: "Graham",
            email: "Sincere@april.biz",
          },
          {
            name: "Ervin",
            surname: "Howell",
            email: "Shanna@melissa.tv",
          },
          {
            name: "Clementin",
            surname: "Bauch",
            email: "Nathan@yesenia.net",
          },
        ],
      },
      USA_5: {
        name: "USA_5",
        status: "died",
      },
    };

    storage.setData("servers", obj);
  }, 2000); */
}

app();
