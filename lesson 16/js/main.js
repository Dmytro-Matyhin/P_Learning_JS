document.addEventListener('DOMContentLoaded', init);

let form = document.querySelector('#form');

let email = form.elements.email;
let name = form.elements.name;
let password = form.elements.pass;
let repeatPassword = form.elements.repass;
let button = document.querySelector('input[name="button"]');

let spanEmail = document.createElement('span');
let spanPassword = document.createElement('span');

let validEmail = false;
let validPassword = false;
let validLength = false;

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  
  let userData = {
    email: email.value,
    name: name.value,
    password: password.value,
  }; 
  
  form.reset();
  validEmail = false;
  validPassword = false;
  validLength = false;
  console.log(userData);
}

function init() {
  form.oninput = function(event) {
    if (!event.target.value.length) {
      event.target.classList.add('error');
      validLength = false;
    } else {
      event.target.classList.remove('error');
      validLength = true;
    } 
  
    email.oninput = function() {
      if (!emailIsValid(email.value)) {
        email.classList.add('error');
        spanEmail.classList.add('error-email-visible');
        spanEmail.textContent = 'Неправильный формат email';
        email.after(spanEmail);
        validEmail = false;
      } else {
        email.classList.remove('error');
        spanEmail.classList.remove('error-email-visible');
        spanEmail.textContent = '';
        validEmail = true;
      }
    }
  
    repeatPassword.oninput = function() {
      if (repeatPassword.value !== password.value) {
        repeatPassword.classList.add('error');
        spanPassword.classList.add('error-pass-visible');
        spanPassword.textContent = 'Пароли не совпадают';
        repeatPassword.after(spanPassword);
        validPassword = false;
      } else {
        repeatPassword.classList.remove('error');
        spanPassword.remove();
        spanPassword.textContent = '';
        validPassword = true;
      }
    }

    if (validLength && validEmail && validPassword) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }
  emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}