export class LocalStorageManager {

  constructor() {
    if (LocalStorageManager._instance) {
      return LocalStorageManager._instance;
    }
    LocalStorageManager._instance = this;
    this.LOCAL_STORAGE_KEY = "myChecklist";
  }

  _setMapToLocalStorage(map) {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(Array.from(map.entries()))
    );
  }

  _getMapFromLocalStorage() {
    let jsonObject = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
    let map = jsonObject != null ? new Map(jsonObject) : new Map();

    return map;
  }

  addOrUpdateItem(id, item) {
    let map = this._getMapFromLocalStorage();
    map.set(id, item);
    this._setMapToLocalStorage(map);
  }

  removeItem(id) {
    let map = this._getMapFromLocalStorage();
    map.delete(id);
    this._setMapToLocalStorage(map);
  }

  getItems() {
    return this._getMapFromLocalStorage();
  }

  canUseLocalStorage() {
    return typeof Storage !== "undefined";
  }
}
