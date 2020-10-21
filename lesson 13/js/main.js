import Buttons from './components/buttons-class.js';

let ul = document.querySelector('#ul');
let metaKeyClick = false;
let ctrlClick = false;

ul.addEventListener('mousedown', function(event) {
  event.preventDefault();
})

ul.addEventListener('click', (event) => {
  if (event.target == this) {
    return false;
  }

  if (event.target == event.currentTarget) {
    return;
  }

  if (event.metaKey || event.ctrlKey) {
    event.target.classList.toggle('selected');
    metaKeyClick = true;
    ctrlClick = true;
    return;
  }

  if (!event.target.classList.contains('selected')) {
    clearSelected(event.target);
  } 

  addSelected(event.target, metaKeyClick, ctrlClick);
  
  if (ctrlClick, metaKeyClick) {
    metaKeyClick = !metaKeyClick
    ctrlClick = !ctrlClick;
  }
});

function addSelected(target, metaKeyClick, ctrlClick) {
  if (metaKeyClick, ctrlClick) {
    clearSelected(target);
    target.classList.toggle('selected');
    return;
  }
  target.classList.toggle('selected');
}

function clearSelected() {
  for (let elem of ul.children) {
    elem.classList.remove('selected');
  }
}

let btn = document.querySelector('#btn');
const button = new Buttons(btn);