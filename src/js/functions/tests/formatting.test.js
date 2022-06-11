import {
  formattingUsers,
  formattingServers,
  formattingMain,
} from "../formatting";

let user = [
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      licenses: ["Russia_1", "Russia_5", "USA_1"],
    },
  ],
  server = [
    {
      name: "Russia_1",
      status: "no problems",
    },
  ],
  serverForMain = {
    Russia_1: {
      name: "Russia_1",
      status: "no problems",
      subscribers: {},
    },
  },
  userForMain = {
    1: {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      licenses: ["Russia_1"],
    },
  };

describe("Тестирование функций форматирования", () => {
  describe("Тестирование функции форматирования пользователей", () => {
    it("Переданы валидные данные", () => {
      expect(formattingUsers(user)).toEqual({
        1: {
          id: 1,
          name: "Leanne Graham",
          email: "Sincere@april.biz",
          licenses: ["Russia_1", "Russia_5", "USA_1"],
        },
      });
    });

    it("Переданы пустые данные", () => {
      expect(() => formattingUsers([])).toThrow();
    });

    it("Данные не переданы", () => {
      expect(() => formattingUsers()).toThrow();
    });

    it("Передан не массив", () => {
      expect(() => formattingUsers({})).toThrow();
    });
  });

  describe("Тестирование функции форматирования cерверов", () => {
    it("Переданы валидные данные", () => {
      expect(formattingServers(server)).toEqual({
        Russia_1: {
          name: "Russia_1",
          status: "no problems",
          subscribers: {},
        },
      });
    });

    it("Переданы пустые данные", () => {
      expect(() => formattingServers([])).toThrow();
    });

    it("Данные не переданы", () => {
      expect(() => formattingServers()).toThrow();
    });

    it("Передан не массив", () => {
      expect(() => formattingServers({})).toThrow();
    });
  });

  describe("Тестирование функции форматирования основных данных", () => {
    it("Переданы валидные данные", () => {
      expect(formattingMain(serverForMain, userForMain)).toEqual({
        Russia_1: {
          name: "Russia_1",
          status: "no problems",
          subscribers: {
            1: {
              email: "Sincere@april.biz",
              id: 1,
              licenses: ["Russia_1"],
              name: "Leanne Graham",
            },
          },
        },
      });
    });

    it("Переданы пустые данные", () => {
      expect(() => formattingMain({}, {})).toThrow();
    });

    it("Данные не переданы", () => {
      expect(() => formattingMain()).toThrow();
    });

    it("Передан не объект", () => {
      expect(() => formattingMain([], [])).toThrow();
    });
  });
});
