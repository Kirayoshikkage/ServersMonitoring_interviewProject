class Storage {
  constructor(funcFormat) {
    this._funcFormat = funcFormat;
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

  setData(key = null, value = null) {
    if (typeof key !== "string") throw new Error("Incorrect type key");

    if (!key) throw new Error("Key not transferred");

    if (!value) throw new Error("Value not transferred");

    this._data[key] = value;
  }

  getData(key = null) {
    if (typeof key !== "string") throw new Error("Incorrect type key");

    if (!key) throw new Error("Key not transferred");

    return this._data[key];
  }

  formatData(arr) {
    return this._funcFormat(arr);
  }

  observer(key = null, fn = null) {
    if (!this._data[key]) throw new Error("There is no data with this key");

    if (typeof fn !== "function" || Array.isArray(fn))
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

function formatDataKeyValue(arr) {
  return arr.reduce((acc, item) => {
    let key = item.name ? item.name : Date.now();

    acc[key] = item;

    return acc;
  }, {});
}

export { Storage, formatDataKeyValue };
