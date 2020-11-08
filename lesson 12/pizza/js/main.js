import Order from './components/order.js';
import validate from './components/validate.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  let createOrder = document.querySelector('button[name="create-order"]');
  let checkBoxError = document.createElement('span');
  addClass(checkBoxError, 'message');

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
      addClass(checkBoxError, 'error');
      checkBoxError.textContent = 'Допустимо минимум 3 ингредиента';
      form.append(checkBoxError);
      return false;
    } else {
      removeClass(checkBoxError, 'error');
      addClass(modalPayment, 'open');

      function payment() {
        return new Promise((resolve, reject) => {
          let myModal = document.querySelector('div[name="myModal"]');
          myModal.addEventListener('click', paymentStatus, {once: true});
    
          function paymentStatus(event) {
            if (event.target == confirmPayment) {
              resolve(confirmPayment);
            } else {
              reject(cancelPayment);
            }
          }
        })
      }
      payment().then(() => {
        removeClass(modalPayment, 'open');
        let size = pizzaSize.value;
        let ingredients = [];
        
        for (let elem of checkBox) {
          if (elem.checked) {
            ingredients.push(elem.value);
          }
        }
    
        Order.createOrder({
          size,
          ingredients,
          status: 'ordered',
        });
    
        form.style.display = 'none';
        addClass(coockedAlert, 'coocking-progress');
        addElemInDOM(form, coockedAlert);
        return delay(2000);
      })
      .then(() => {
        addClass(pickUpAlert, 'ready');
        changeStatus('ordered', 'coocked');
        addElemInDOM(coockedAlert, pickUpAlert);
        return delay(2000);
      })
      .then(() => {
        addClass(deliveredAlert, 'shipped');
        changeStatus('coocked', 'delivered');
        addElemInDOM(pickUpAlert, deliveredAlert);
        return delay(2000);
      })
      .then(() => {
        addClass(formFeedback, 'show-feedback');
        addElemInDOM(deliveredAlert, formFeedback);
      })
      .catch(function cancel() {
        removeClass(modalPayment, 'open');
        addClass(alertMessage, 'show-message');
        addElemInDOM(form, alertMessage);
        form.reset();
        setTimeout(() => removeClass(alertMessage, 'show-message'), 2500);
      })
    }
  }

  formFeedback.addEventListener('click', clickButtonFeedback);

  function clickButtonFeedback(event) {
    event.preventDefault();

    removeClass(coockedAlert, 'coocking-progress');
    removeClass(pickUpAlert, 'ready');
    removeClass(deliveredAlert, 'shipped');
    removeClass(formFeedback, 'show-feedback');

    addClass(feedbackMessage, 'answer');
    addElemInDOM(form, feedbackMessage);
    setTimeout(() => {
      removeClass(feedbackMessage, 'answer');
      form.style.display = 'block';
      form.reset();
    }, 3000);
  }
}

// ADDITIONAL FUNCTIONS

const addClass = (target, nameClass) => target.classList.add(nameClass);
const removeClass = (target, nameClass) => target.classList.remove(nameClass);
const changeStatus = (current, target) => Order.changeOrderStatus(current, target);
const addElemInDOM = (current, target) => current.after(target);

let delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
}