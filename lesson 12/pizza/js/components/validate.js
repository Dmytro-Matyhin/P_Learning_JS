export let result = [];

export function validate(elements) {
  let valid = false;

  for (let elem of elements) {
    if (elem.checked) {
      if (!result.includes(elem.value)) {
        result.push(elem.value);
        valid = true;
      }
    }
     if (result.length < 3) {
      valid = false;
    }
  }
  return valid;
}