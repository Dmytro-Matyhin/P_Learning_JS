import Order from './components/order.js';
import validate from './components/validate.js';

document.addEventListener('DOMContentLoaded', init);

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
  let feedbackMessage = document.querySelector('div[name="feedback-message"]');

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

  function payment() {
    return new Promise((resolve, reject) => {
      let myModal = document.querySelector('div[name="myModal"]');
      myModal.addEventListener('click', paymentStatus);
      
      function paymentStatus(event) {
        event.preventDefault();
        if (event.target == confirmPayment) {
          resolve(confirmPayment);
        } else {
          reject(cancelPayment);
        }
      }
    })
  }
  payment().then(() => {
    confirmPayment.onclick = function() {
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
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    });
  })
  .then(() => {
    pickUpAlert.classList.add('ready');
    Order.changeOrderStatus('ordered', 'coocked');
    coockedAlert.after(pickUpAlert);

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    })
  })
  .then(() => {
    deliveredAlert.classList.add('shipped');
    Order.changeOrderStatus('coocked', 'delivered');
    pickUpAlert.after(deliveredAlert);

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    })
  })
  .then(() => {
    formFeedback.classList.add('show-feedback');
    deliveredAlert.after(formFeedback);
  })
  .catch(function cancel() {
    cancelPayment.onclick = function() {
      modalPayment.classList.remove('open');
      alertMessage.classList.add('show-message');
      form.after(alertMessage);
      form.reset();
      setTimeout(() => alertMessage.classList.remove('show-message'), 2500);
    }
  })

  formFeedback.addEventListener('click', clickButtonFeedback);

  function clickButtonFeedback(event) {
    event.preventDefault();
    coockedAlert.classList.remove('coocking-progress');
    pickUpAlert.classList.remove('ready');
    deliveredAlert.classList.remove('shipped');
    formFeedback.classList.remove('show-feedback');

    feedbackMessage.classList.add('answer');
    form.after(feedbackMessage);
    setTimeout(() => {
      feedbackMessage.classList.remove('answer');
      form.style.display = 'block';
      form.reset();
    }, 3000);
  }
}