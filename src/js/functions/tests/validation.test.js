import { validateServers, validateUsers } from "../validate";

let user = [
    {
      id: 1,
      name: "",
      email: "",
      licenses: ["Russia_1", "Russia_5", "USA_1"],
    },
  ],
  server = [
    {
      name: "",
      status: "",
    },
  ];

describe("Тестирование функций валидации", () => {
  describe("Тестирование функции валидации серверов", () => {
    it("Переданные данные валидны", () => {
      expect(validateServers(server).length).toBe(0);
    });

    it("В переданных данных нет значений", () => {
      expect(validateServers([{}])).toEqual([]);
    });

    it("Переданы пустые данные", () => {
      expect(() => validateServers([])).toThrow();
    });

    it("Данные не переданы", () => {
      expect(() => validateServers()).toThrow();
    });

    it("Передан не массив", () => {
      expect(() => validateServers({})).toThrow();
    });
  });

  describe("Тестирование функции валидации пользователей", () => {
    it("Переданные данные валидны", () => {
      expect(validateUsers(user).length).not.toBe(0);
    });

    it("В переданных данных нет значений", () => {
      expect(validateUsers([{}])).toEqual([]);
    });

    it("В переданных данных нет поля лицензий", () => {
      expect(validateUsers([{}])).toEqual([]);
    });

    it("Переданы пустые данные", () => {
      expect(() => validateUsers([])).toThrow();
    });

    it("Данные не переданы", () => {
      expect(() => validateUsers()).toThrow();
    });

    it("Передан не массив", () => {
      expect(() => validateUsers({})).toThrow();
    });
  });
});
