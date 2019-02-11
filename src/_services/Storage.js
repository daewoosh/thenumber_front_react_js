class LocalStorageAlternative {
    constructor() {
      this.structureLocalStorage = {};
    }
  
    setItem(key, value) {
      this.structureLocalStorage[key] = value;
    }
  
    getItem(key) {
      if (this.structureLocalStorage[key] !== undefined) {
        return this.structureLocalStorage[key];
      }
      return null;
    }
  
    removeItem(key) {
      this.structureLocalStorage[key] = undefined;
    }
  
    clear() {
      this.structureLocalStorage = {};
    }
  }
  
  function getStorage() {
    let storageImpl;
    try {
      localStorage.setItem('storage', '');
      localStorage.removeItem('storage');
      storageImpl = localStorage;
    } catch (err) {
      window.console.warn('Using LocalStorageAlternative');
      storageImpl = new LocalStorageAlternative();
    }
    return storageImpl;
  }
  
  export default getStorage();
  