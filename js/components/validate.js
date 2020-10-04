function validateFormGeneral(elements) {
  let valid = true;
  let validTypes = ['text', 'number'];

  for (let elem of elements) {
    if (validTypes.includes(elem.type)) {
      if (!elem.value.length) {
        valid = false;
        elem.classList.add('error');
        elem.classList.remove('success');
      } else {
        elem.classList.add('success');
        elem.classList.remove('error');
      }
    }
  }
  return valid;
}

function validateFormByMark(elements) {
  let valid = true;
  let validTypes = ['number'];

   for (let elem of elements) {
    if (validTypes.includes(elem.type)) {
      if (elem.value < 1 || elem.value > 10) {
        valid = false;
        elem.classList.add('error-num');
        elem.classList.remove('success');
      } else {
        elem.classList.add('success');
        elem.classList.remove('error-num');
      }
    }
  }  
  return valid;
}
