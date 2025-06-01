class LocalStorage {
  static save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  static get(key) {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
}

export default LocalStorage;
