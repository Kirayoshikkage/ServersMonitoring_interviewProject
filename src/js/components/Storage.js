class Storage {
  constructor({ format, validate }) {
    this._format = format;
    this._validate = validate;
  }

  _observers = {};
  _data = new Proxy(
    {
      bind: this,
    },
    {
      set(target, prop, value, context) {
        let reflect = Reflect.set(target, prop, value, context),
          funcList = context.bind._observers[prop];

        if (funcList) {
          for (let func of funcList) {
            func();
          }
        }

        return reflect;
      },
    }
  );

  setData(key = null, data = null) {
    if (typeof key !== "string") throw new Error("Incorrect type key");

    if (!key) throw new Error("Key not transferred");

    if (!data) throw new Error("Data not transferred");

    this._data[key] = this._formatData(key, this._validateData(key, data));
  }

  getData(key = null) {
    if (typeof key !== "string") throw new Error("Incorrect type key");

    if (!key) throw new Error("Key not transferred");

    return this._data[key];
  }

  _formatData(key, data) {
    return this._format[key](data);
  }

  _validateData(key, data) {
    return this._validate[key](data);
  }

  observer(key = null, fn = null) {
    if (!this._data[key]) throw new Error("There is no data with this key");

    if (!Array.isArray(fn) && typeof fn !== "function")
      throw new Error("Incorrect type fn");

    if (typeof key !== "string") throw new Error("Incorrect type key");

    if (!key) throw new Error("Key not transferred");

    if (!fn) throw new Error("Fn not transferred");

    if (!this._observers[key]) {
      this._observers[key] = [];
    }

    if (Array.isArray(fn)) {
      this._observers[key].push(...fn);

      return;
    }

    this._observers[key].push(fn);
  }
}

function formatServers(arr) {
  return arr.reduce((acc, item) => {
    let key = item.name ? item.name : Date.now();

    item.connections = item.connections.reduce((acc, item) => {
      let id = item.id ? item.id : Date.now();

      acc[id] = item;

      return acc;
    }, {});

    acc[key] = item;

    return acc;
  }, {});
}

function validateServers(data) {
  if (!Object.keys(data).length) throw new Error("Data is empty");

  return data.reduce((acc, item) => {
    if (
      !Object.keys(item).length ||
      Object.prototype.toString.call(item) !== "[object Object]"
    )
      return acc;

    let { name, status, connections } = item;

    acc.push({
      name: typeof name === "string" && name !== "" ? name : "No name",
      status: typeof status === "string" && status !== "" ? status : "died",
      connections: Array.isArray(connections) ? connections : [],
    });

    return acc;
  }, []);
}

export { Storage, formatServers, validateServers };
