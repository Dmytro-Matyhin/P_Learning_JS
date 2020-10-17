import Order from './components/order.js';
import validate from './components/validate.js';

window.onload = init;

function init() {
  let createOrder = document.querySelector('button[name="create-order"]');
  let checkBoxError = document.createElement('span');
  checkBoxError.classList.add('message');

  let modalPayment = document.querySelector('div[name="modal-payment"]');
  let confirmPayment = document.querySelector('button[name="confirm-payment"]');
  let cancelPayment = document.querySelector('button[name="cancel-payment"]');
  let alertMessage = document.querySelector('div[name="alert-message"]');

  let form = document.getElementById('form');
  let checkBox = form.elements.inlineCheckbox;
  let pizzaSize = form.elements.size;

  let coockedAlert = document.querySelector('div[name="coocked"]');
  let pickUpAlert = document.querySelector('div[name="pick-up"]');
  let deliveredAlert = document.querySelector('div[name="delivered"]');

  let formFeedback = document.querySelector('form[name="form-feedback"]');
  let buttonLike = document.querySelector('button[name="like"]');
  let buttonDislike = document.querySelector('button[name="dislike"]');
  let feedbackMessage = document.querySelector('div[name="feedback-message"]');

  let addTimeOutMessage = (params, nameClass, ms)  => setTimeout(() => params.classList.add(nameClass), ms);

  createOrder.onclick = function() {
    if (!validate(checkBox)) {
      checkBoxError.classList.add('error');
      checkBoxError.textContent = 'Допустимо минимум 3 ингредиента';
      form.append(checkBoxError);
      return false;
    } else {
      checkBoxError.classList.remove('error');
      modalPayment.classList.add('open');
    }
  }

  cancelPayment.onclick = function(event) {
    event.preventDefault();

    modalPayment.classList.remove('open')
    alertMessage.classList.add('show-message');
    form.after(alertMessage);
    form.reset();
    setTimeout(() => alertMessage.classList.remove('show-message'), 2500);
  }

  confirmPayment.onclick = function(event) {
    event.preventDefault();
    modalPayment.classList.remove('open');

    let size = pizzaSize.value;
    let ingredients = [];
    for (let elem of checkBox) {
      if (elem.checked) {
        ingredients.push(elem.value)
      }
    }

    Order.createOrder({
      size,
      ingredients,
      status: 'ordered',
      });

    form.style.display = 'none';
    coockedAlert.classList.add('coocking-progress');
    form.after(coockedAlert);

    addTimeOutMessage(pickUpAlert, 'ready', 2000);
    Order.changeOrderStatus('ordered', 'coocked');
    // console.log(Order.getOrderByStatus('coocked'));
    coockedAlert.after(pickUpAlert);

    addTimeOutMessage(deliveredAlert, 'shipped', 4000);
    Order.changeOrderStatus('coocked', 'delivered');
    // console.log(Order.getOrderByStatus('delivered'));
    pickUpAlert.after(deliveredAlert);

    addTimeOutMessage(formFeedback, 'show-feedback', 6000);
    deliveredAlert.after(formFeedback);

    // console.log(Order.getOrderBySize('middle'));
    // console.log(Order.getOrderBySize('large'));
  }

  buttonLike.onclick = function(event) {
    event.preventDefault();

    coockedAlert.classList.remove('coocking-progress');
    pickUpAlert.classList.remove('ready');
    deliveredAlert.classList.remove('shipped');
    formFeedback.classList.remove('show-feedback');

    feedbackMessage.classList.add('answer');
    form.after(feedbackMessage);

    setTimeout(() => {
      feedbackMessage.classList.remove('answer'),
      form.style.display = 'block';
      form.reset();
    }, 3000);
  }

  buttonDislike.onclick = function(event) {
    event.preventDefault();

    coockedAlert.classList.remove('coocking-progress');
    pickUpAlert.classList.remove('ready');
    deliveredAlert.classList.remove('shipped');
    formFeedback.classList.remove('show-feedback');

    feedbackMessage.classList.add('answer');
    form.after(feedbackMessage);

    setTimeout(() => {
      feedbackMessage.classList.remove('answer'),
      form.style.display = 'block';
      form.reset();
    }, 3000);
  }
}