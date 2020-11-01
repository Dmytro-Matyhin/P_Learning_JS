document.addEventListener('DOMContentLoaded', init);

let form = document.querySelector('#form');

let email = form.elements.email;
let name = form.elements.name;
let password = form.elements.pass;
let button = document.querySelector('button[name="button"]');
let checkPassword = document.querySelector('#check-password');

let spanEmail = document.createElement('span');
let spanPassword = document.createElement('span');
let spanLength = document.createElement('span');

let {validEmail, validLength, validPassword} = false;

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
  button.setAttribute('disabled', 'disabled');
  console.log(userData);
}

function init(event) {
  form.oninput = function() {
    validateInputLength(event.target);
    validateEmail();
    validatePassword();
  }
}

function validBtn() {
  if (validLength && validEmail && validPassword) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'disabled')
  }
}

function validateInputLength() {
  form.oninput = function(event) {
    if (!event.target.value.length) {
      event.target.classList.add('error');
      spanLength.classList.add('error-length-visible');
      spanLength.textContent = 'Поле должно быть заполнено';
      event.target.after(spanLength);
      validLength = false;
    } else {
      event.target.classList.remove('error');
      spanLength.classList.remove('error-length-visible');
      spanLength.textContent = '';
      validLength = true;
    } 
    validBtn();
  }
}
  
function validateEmail() {
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
    validBtn();
  }
}

function validatePassword() {
  checkPassword.oninput = function(event) { 
    let password = checkPassword.children.password;
    let repeatPassword = checkPassword.children.repassword;
   
    if (password.value.length && repeatPassword.value.length) {
      if (password.value !== repeatPassword.value || repeatPassword.value !== password.value) {
        event.target.classList.add('error');
        spanPassword.classList.add('error-pass-visible');
        spanPassword.textContent = 'Пароли не совпадают';
        event.target.after(spanPassword);
        validPassword = false;
      } else {
        event.target.classList.remove('error');
        spanPassword.remove();
        spanPassword.textContent = '';
        validPassword = true;
      }
    }
    validBtn();
  }
}

emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);