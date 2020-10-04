window.onload = init;

function init() {
  let addStudent = document.querySelector('#add-student');
  let updateList = document.querySelector('#update-list');

  let generalError = document.createElement('span');
  generalError.classList.add('message');

  let numberError = document.createElement('span');
  numberError.classList.add('message-num');

  addStudent.onclick = function(event) {
    event.preventDefault();

    let studentName = document.querySelector('input[name="student-name"]');
    let studentSurname = document.querySelector('input[name="student-surname"]');
    let studentAge = document.querySelector('input[name="student-age"]');
    let studentMarks = document.querySelectorAll('input[name="student-marks"]');
    let form = document.getElementById('form');
    let elementsForms = form.elements;

    if (!validateFormGeneral(elementsForms)) {
      generalError.classList.add('error');
      generalError.textContent = 'Correct all marked inputs!';
      form.append(generalError);
      return false;
    } else {
      generalError.classList.remove('error');
    }
    
    if (!validateFormByMark(elementsForms)) {
      numberError.classList.add('error-num');
      numberError.textContent = 'Enter marks from 1 to 10';
      form.append(numberError);
      return false;
    } else {
      numberError.classList.remove('error-num');
    }

    let name = studentName.value,
        surname = studentSurname.value,
        age = studentAge.value,
        marks = Array.from(studentMarks).map(item => +item.value);

    let createStudent = new Student({
      name,
      surname,
      age,
      marks,
    })

    teacher.addStudentToGroup(createStudent);

    studentName.value = '';
    studentSurname.value = '';
    studentAge.value = '';
    studentMarks.forEach(item => item.value = '');
  }

  updateList.onclick = function(event) {
    event.preventDefault();
    let list = document.querySelector('#list');
    let result = teacher.getListByAverageMark().join('');
    list.innerHTML = result;
  }
}