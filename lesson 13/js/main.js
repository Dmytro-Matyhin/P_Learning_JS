import Buttons from './components/buttons-class.js';

let ul = document.querySelector('#ul');

ul.addEventListener('mousedown', function(event) {
  event.preventDefault();
})

ul.addEventListener('click', function(event) {
  if (event.target == this) {
    return false;
  }
  
  if (!event.metaKey && !event.ctrlKey) {
    clearSelected(this.children);
  }
  addSelected(event.target);
})

function clearSelected(elems) {
  for (let elem of elems) {
      elem.classList.remove('selected');
  }
}

function addSelected(target) {
  target.classList.toggle('selected');
}

let btn = document.querySelector('#btn');
const button = new Buttons(btn);