class Human {
  constructor({name, surname, age}) {
    this.name = name,
    this.surname = surname,
    this.age = age;
  }
  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  setFullName(fullName) {
    fullName = fullName.split(' ');
    this.name = fullName[0];
    this.surname = fullName[1];
  }
}

class Student extends Human {
  constructor({name, surname, age, marks}) {
    super({name, surname, age});
    this.marks = marks;
  }

  averageMark() {
    return this.marks.reduce((acc, curr) => (acc + curr)) / this.marks.length;
  }
  
  minMark() {
    return this.marks.sort((a, b) => b - a)[this.marks.length - 1];
  }

  maxMark() {
    return this.marks.sort((a, b) => a - b)[this.marks.length - 1];
  }

  getFullName() {
    return `${this.name} ${this.surname} - student`;
  }
}

class Teacher extends Human {
  constructor({name, surname, age, group}) {
    super({name, surname, age});
    this.group = group;
  }
  
  getListByAverageMark() {
    return this.group.sort((a, b) => b.averageMark() - a.averageMark()).map(item => {
      return  ` <li>  ${item.name}  ${item.surname}  - ${item.averageMark()} </li> `;
    })
  }

  getStudentByName(name) {
    return this.group.find(item => item.name === name);
  }

  removeStudentByName(name) {
    let tempName = this.getStudentByName(name);
    return this.group.splice(this.group.indexOf(tempName), 1);
  }

  updateStudentByName(student, name) {
  return this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1,  new Student(student));
  }

  addStudentToGroup(student) {
    return this.group.push(student);
  }
}

let teacher = new Teacher({
  name: 'Stan',
  surname: 'Cooper',
  age: 45,
  group: [],
});