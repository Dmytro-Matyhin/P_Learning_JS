import StoreService from './store-service.js';

let order = new StoreService();

export default class Order {

  constructor({size, ingredients, status}) {
    this.size = size,
    this.ingredients = ingredients,
    this.status = status;
  }

  static getOrderBySize(size) {
    let findedOrder = order.getItem('size', size);
    return findedOrder;
  }

  static getOrderByStatus(status) {
    let findedOrder = order.getItem('status', status);
    return findedOrder;
  } 
   
  static createOrder(data) {
    order.setItem(new Order(data));
  }

  static changeOrderStatus(prevStatus, currStatus) {
    let findedOrder = order.getItem('status', prevStatus);
    findedOrder.status = currStatus;
    return findedOrder;
  }
}