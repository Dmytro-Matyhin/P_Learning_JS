class StoreService {
  store = [];
  constructor(initialStore = []) {
    this.store = initialStore;
  }

  setItem(order) {
    this.store.push(order);
  } 

  getItem(key, value) {
    return this.store.find(order => order[key] === value);
  }
}