let order = new StoreService();

class Order {

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
   
  static getListOfOrders(data) {
    order.setItem(new Order(data));
  }
}