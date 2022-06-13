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
import { serverInfoChangeDesc } from "./functions/serverInfoChangeDesc";
import {
  Search,
  hideElementTable,
  showElementTable,
  tableElementsComparison,
} from "./components/Search";
import { Sidebar } from "./components/Sidebar";
import { FadeAnimation } from "./components/FadeAnimation";
import { BlockFocus } from "./components/BlockFocus.js";
import { userInfoChangeFilds } from "./functions/userInfoChangeFields";
import { Modal } from "./components/Modal";
import { getStatusColor } from "./functions/getStatusColor";
import { getDetailedDescStatus } from "./functions/getDetailedDescStatus";

async function app() {
  try {
    // Запрос для получения списка серверов

    let serversRequest = new Api({
      url: settings.urlServers,
      api: new FetchRequest(),
    });

    serversRequest.init();

    // Запрос для получения списка пользователей

    let usersRequest = new Api({
      url: settings.urlUsers,
      api: new FetchRequest(),
    });

    usersRequest.init();

    // Ответ на запрос получения списка серверов

    let serversResponse = await serversRequest.get();

    if (!serversResponse.ok) {
      throw new Error("Request failed to get list of servers");
    }

    // Ответ на запрос получения списка пользователей

    let usersResponse = await usersRequest.get();

    if (!usersResponse.ok) {
      throw new Error("Request failed to get list of users");
    }

    // Полученный список серверов

    let serversData = await serversResponse.json();

    // Полученный список пользователей

    let usersData = await usersResponse.json();

    // Хранилище

    let storage = new Storage();

    // Таблица серверов

    let tableServers = new TableElements({
      selector: ".servers__table-elements .table-elements__body",
      api: new TableElementServer(),
    });

    // Поиск по таблице серверов

    let searchOnTableServers = new Search({
      input: ".servers .search__input",
      container: ".servers .table-elements__body",
      selectorElements: ".table-elements__line",
      compare: ".table-elements__column_name",
    });

    // Таблица пользователей

    let tableUsers = new TableElements({
      selector: ".info .table-elements__body",
      api: new TableElementUser(),
    });

    // Поиск по таблице пользователей

    let searchOnTableUsers = new Search({
      input: ".info .search__input",
      container: ".info .table-elements__body",
      selectorElements: ".table-elements__line",
      compare: ".table-elements__column_name",
    });

    // Боковая панель, в ней выводится подробная информация о пользователе

    let sidebarUser = new Sidebar({
      selector: ".info__sidebar",
      closeBtn: ".info__sidebar .sidebar__close",
      selectorActive: "sidebar_active",
      apiAnimation: new FadeAnimation(),
      apiBlockFocus: new BlockFocus(),
    });

    /*************************************************************************** */

    // Добавление функции валидирования для списка серверов и пользователей

    storage.setValidation("servers", validateServers);
    storage.setValidation("users", validateUsers);

    // Добавление функции форматирования для списка серверов и пользователей

    storage.setFormatting("servers", formattingServers);
    storage.setFormatting("users", formattingUsers);

    // Добавление списка пользователей и серверов в хранилище

    storage.setData("servers", serversData);
    storage.setData("users", usersData);

    // Объединение списка серверов и пользователей, добавление основных данных

    storage.setData(
      "main",
      formattingMain(storage.getData("servers"), storage.getData("users"))
    );

    // Добавление подписки на обновление списка серверов

    storage.observer("servers", [
      () => {
        let users = storage.getData("users"),
          servers = storage.getData("servers");

        storage.setData("main", formattingMain(servers, users));
      },
    ]);

    // Добавление подписки на обновление списка пользователей

    storage.observer("users", [
      () => {
        let users = storage.getData("users"),
          servers = storage.getData("servers");

        storage.setData("main", formattingMain(servers, users));
      },
    ]);

    // Добавление подписки на обновление основных данных

    storage.observer("main", [
      () => {
        tableServers.updateElements(storage.getData("main"));
      },
      () => {
        if (!storage.getData("selected-server")) return;

        let [id] = storage.getData("selected-server");

        if (!id) return;

        let newData = storage.getData("main")[id];

        storage.setData("selected-server", [id, newData]);
      },
      () => {
        if (!storage.getData("selected-user")) return;

        let [id] = storage.getData("selected-user");

        if (!id) return;

        let newData = storage.getData("users")[id];

        storage.setData("selected-user", [id, newData]);
      },
    ]);

    // Инициализация таблицы серверов

    tableServers.init();

    // Функция обработки события для таблицы серверов

    function eventHandlingTableServers(e) {
      if (e.target.closest("[data-id]")) {
        let element = e.target.closest("[data-id]"),
          id = element.dataset.id,
          data = storage.getData("main")[id];

        if (storage.getData("selected-server")) {
          if (storage.getData("selected-server")[0] === id) return;
        }

        tableUsers.generationElements(data["subscribers"]);

        storage.setData("selected-server", [id, data]);
      }
    }

    // Добавление обработчика события клика для таблицы серверов

    tableServers.event("click", (e) => {
      eventHandlingTableServers(e);
    });

    // Добавление обработчика события нажатия клавиши enter для таблицы серверов

    tableServers.event("keydown", (e) => {
      if (e.code !== "Enter") return;

      eventHandlingTableServers(e);
    });

    // Генерация элементов таблицы серверов

    tableServers.generationElements(storage.getData("main"));

    // Инициализация поиска по таблице серверов

    searchOnTableServers.init();

    // Добавление функции скрытия для поиска по таблице серверов

    searchOnTableServers.setHide(hideElementTable);

    // Добавление функции показа для поиска по таблице серверов

    searchOnTableServers.setShow(showElementTable);

    // Добавление функции сравнения для поиска по таблице серверов

    searchOnTableServers.setComparison(tableElementsComparison);

    // Подписка на событие обновления данных выбранного сервера

    storage.observer("selected-server", () => {
      let [id, data] = storage.getData("selected-server");

      tableUsers.updateElements(data["subscribers"]);

      serverInfoChangeDesc(data);
    });

    // Инициализация таблицы пользователей

    tableUsers.init();

    // Функция обработки события для таблицы пользователей

    function eventHandlingTableUsers(e) {
      if (e.target.closest("[data-id]")) {
        let element = e.target.closest("[data-id]"),
          id = element.dataset.id,
          data = storage.getData("users")[id];

        sidebarUser.toggleState();
        storage.setData("selected-user", [id, data]);
      }
    }

    // Добавление обработчика события клика для таблицы пользователей

    tableUsers.event("click", (e) => {
      eventHandlingTableUsers(e);
    });

    // Добавление обработчика события нажатия клавиши enter для таблицы пользователей

    tableUsers.event("keydown", (e) => {
      if (e.code !== "Enter") return;

      eventHandlingTableUsers(e);
    });

    // Инициализация поиска по таблице пользователей

    searchOnTableUsers.init();

    // Добавление функции скрытия для поиска по таблице пользователей

    searchOnTableUsers.setHide(hideElementTable);

    // Добавление функции показа для поиска по таблице пользователей

    searchOnTableUsers.setShow(showElementTable);

    // Добавление функции сравнения для поиска по таблице пользователей

    searchOnTableUsers.setComparison(tableElementsComparison);

    // Подписка на событие обновления данных выбранного пользователя

    storage.observer("selected-user", () => {
      let [id, data] = storage.getData("selected-user");

      userInfoChangeFilds(data);
    });

    // Инициализация боковой панели

    sidebarUser.init();

    // "Обновление данных"

    storage.updateData(() => {
      setTimeout(() => {
        let users = [
          {
            id: 1,
            name: "Lean",
            surname: "Graham",
            email: "Sincere@april.biz",
            licenses: ["Russia_5", "USA_1", "Russia_1"],
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
            name: "Clem",
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
            licenses: ["Russia_3", "Russia_1"],
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
            geo: "57.99400324760205,60.73410604300735",
          },
          {
            name: "Russia_2",
            status: "minor problems",
            geo: "62.950599862435396,105.60227010550732",
          },
          {
            name: "Russia_3",
            status: "no problems",
            geo: "56.83580484034394,60.26993900221754",
          },
          {
            name: "Russia_4",
            status: "no problems",
            geo: "54.85845681734863,31.88126712721753",
          },
          {
            name: "Russia_5",
            status: "died",
            geo: "64.35993410519052,40.8501291937182",
          },
          {
            name: "USA_1",
            status: "no problems",
            geo: "41.16475244368966,-87.47662312206252",
          },
          {
            name: "USA_2",
            status: "minor problems",
            geo: "38.97045377788559,-94.85943562206252",
          },
          {
            name: "USA_3",
            status: "many problems",
            geo: "45.77029457326454,-108.57037312206252",
          },
          {
            name: "USA_4",
            status: "no problems",
            geo: "37.79441756319579,-122.1934199970625",
          },
          {
            name: "USA_5",
            status: "died",
            geo: "34.18861568042417,-118.0186153095625",
          },
          {
            name: "USA_6",
            status: "died",
            geo: "35.79441756319579,-122.1934199970625",
          },
        ];

        storage.setData("servers", servers);
        storage.setData("users", users);
      }, 5000);
    });

    // Карта

    ymaps.ready(init);

    function init() {
      // Инициализация карты

      let serversMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 2,
        controls: [],
      });

      // Менеджер объектов

      let objectManager = new ymaps.ObjectManager();

      // Коллекция геообъектов

      let collectionGeoobject = {
        type: "FeatureCollection",
        features: [],
      };

      // Основные данные

      let mainData = storage.getData("main");

      //  Функция создания нового геобъекта

      function createNewGeoobject(data, key) {
        let { name, subscribers, geo, status } = data;

        return {
          type: "Feature",
          id: key,
          geometry: {
            type: "Point",
            coordinates: geo,
          },
          options: {
            preset: "islands#circleDotIcon",
            fill: true,
            fillColor: getStatusColor(status),
            iconColor: getStatusColor(status),
          },
          properties: {
            hintContent: `
            ${name}
            `,
          },
        };
      }

      // Создание геообъектов

      for (let key in mainData) {
        collectionGeoobject.features.push(
          createNewGeoobject(mainData[key], key)
        );
      }

      // Добавление коллекции геобъектов в менеджер объектов

      objectManager.add(collectionGeoobject);

      // Добавление менеджера объектов на карту

      serversMap.geoObjects.add(objectManager);

      // Функция изменения состояния отметки на карте

      function changeStateGeoobject(data, id) {
        let { name, status } = data;

        objectManager.objects.setObjectOptions(id, {
          iconColor: getStatusColor(status),
        });

        objectManager.objects.setObjectProperties(id, {
          hintContent: `${name}`,
        });
      }

      // При изменении основных данных, изменяются геообъекты

      storage.observer("main", [
        () => {
          let data = storage.getData("main");

          objectManager.objects.getAll().forEach((geoobject) => {
            let newData = data[geoobject.id];

            if (!newData) {
              objectManager.remove(geoobject);

              return;
            }

            changeStateGeoobject(newData, geoobject.id);
          });

          for (let key in data) {
            if (!objectManager.getObjectState(key)) return;

            createNewGeoobject(data[key], key);
          }
        },
      ]);

      // При клике показывается подробная информация о сервере

      objectManager.events.add("click", function (e) {
        let id = e.get("objectId"),
          data = storage.getData("main")[id];

        if (storage.getData("selected-server")) {
          if (storage.getData("selected-server")[0] === id) return;
        }

        tableUsers.generationElements(data["subscribers"]);
        storage.setData("selected-server", [id, data]);
      });
    }
  } catch (error) {
    const errorModal = new Modal({
      selector: ".modal-error",
      selectorActive: "modal_active",
      closeBtn: ".modal-error .modal__close",
      apiAnimation: new FadeAnimation({
        display: "flex",
        duration: 400,
      }),
      apiBlockFocus: new BlockFocus({
        exceptionContainer: ".modal-error",
      }),
    });

    errorModal.init();

    errorModal.toggleState();
  }
}

app();
