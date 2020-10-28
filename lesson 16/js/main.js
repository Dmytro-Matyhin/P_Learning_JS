let form = document.querySelector('#form');

let email = form.elements.email;
let name = form.elements.name;
let password = form.elements.pass;
let repeatPassword = form.elements.repass;
let button = document.querySelector('input[name="button"]');
button.setAttribute('disabled', 'disabled');

let spanEmail = document.createElement('span');
let spanPassword = document.createElement('span');



function validateInputLength() {
  form.oninput = function(event) {
    if (!event.target.value.length) {
      event.target.classList.add('error');
      event.preventDefault();
    } else {
      event.target.classList.remove('error');
    } 
  }
}

function validateEmail() {
  email.onblur = function() {
    if (!emailIsValid(email.value)) {
      email.classList.add('error');
      spanEmail.classList.add('error-email-visible');
      spanEmail.textContent = 'Неправильный формат email';
      email.after(spanEmail);
    }
  }

  email.onfocus = function() {
    if (email.classList.contains('error')) {
      email.classList.remove('error');
    }

    if (spanEmail.classList.contains('error-email-visible')) {
      spanEmail.classList.remove('error-email-visible');
      spanEmail.classList.add('error-email');
    }
  }
}

function validatePassword() {
  repeatPassword.oninput = function() {
    if (repeatPassword.value !== password.value) {
      repeatPassword.classList.add('error');
      console.log(repeatPassword)
      spanPassword.classList.add('error-pass-visible');
      spanPassword.textContent = 'Пароли не совпадают';
      repeatPassword.after(spanPassword);
    } 
    else {
      repeatPassword.classList.remove('error');
      spanPassword.remove();
    }
  }
}

emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);