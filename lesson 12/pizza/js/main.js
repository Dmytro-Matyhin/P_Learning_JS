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
    checkBox.forEach(item => item.checked = false);
    result = [];
    setTimeout(() => alertMessage.classList.remove('show-message'), 2500);
  }

  confirmPayment.onclick = function(event) {
    event.preventDefault();
    modalPayment.classList.remove('open');

    let size = pizzaSize.value;

  Order.createOrder({
    size,
    ingredients: result,
    status: 'ordered',
    });

    form.style.display = 'none';
    coockedAlert.classList.add('coocking-progress');
    form.after(coockedAlert);

    setTimeout(() => pickUpAlert.classList.add('ready'), 2000); 
    Order.changeOrderStatus('ordered', 'coocked');
    // console.log(Order.getOrderByStatus('coocked'));
    coockedAlert.after(pickUpAlert);

    setTimeout(() => deliveredAlert.classList.add('shipped'), 4000);
    Order.changeOrderStatus('coocked', 'delivered');
    // console.log(Order.getOrderByStatus('delivered'));
    pickUpAlert.after(deliveredAlert);

    setTimeout(() => formFeedback.classList.add('show-feedback'), 6000);
    deliveredAlert.after(formFeedback);

    // console.log(Order.getOrderBySize('middle'));
    // console.log(Order.getOrderBySize('large'));
    // console.log(order);
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
      checkBox.forEach(item => item.checked = false);
      result = [];
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
      checkBox.forEach(item => item.checked = false);
      result = [];
    }, 3000);
  }
}