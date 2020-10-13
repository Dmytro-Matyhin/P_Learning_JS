export default class StoreService {
  store = [];
  constructor(initialStore = []) {
    this.store = initialStore;
  }

  setItem(value) {
    this.store.push(value);
  } 

  getItem(key, value) {
    return this.store.find(order => order[key] === value);
  }
}