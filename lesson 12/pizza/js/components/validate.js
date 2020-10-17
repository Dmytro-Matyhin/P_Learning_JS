export default function validate(elements) {
  let valid = false;
  let count = 0;

  for (let elem of elements) {
    if (elem.checked) {
      valid = true;
      count++;
    }
     if (count < 3) {
      valid = false;
    }
  }
  return valid;
}