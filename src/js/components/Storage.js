class Storage {
  _observers = {};
  _formattingList = {};
  _validationList = {};
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

  setData(key, data) {
    let validationData = this._validation(key, data),
      formattingData = this._formatting(key, validationData);

    this._data[key] = formattingData;
  }

  getData(key) {
    return this._data[key];
  }

  setFormatting(key, fn) {
    this._formattingList[key] = fn;
  }

  setValidation(key, fn) {
    this._validationList[key] = fn;
  }

  _validation(key, data) {
    if (this._validationList[key]) {
      return this._validationList[key](data);
    }

    return data;
  }

  _formatting(key, data) {
    if (this._formattingList[key]) {
      return this._formattingList[key](data);
    }

    return data;
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

  updateData(cb) {
    cb();
  }
}

export { Storage };
