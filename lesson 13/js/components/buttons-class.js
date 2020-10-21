let tasks = ['Приготовить завтрак', 'Приготовить обед', 'Приготовить ужин', 'Закончить таски', 'Поиграть в бильярд', 'Покормить кота'];

export default class Buttons {
  constructor(elem) {
    this.elem = elem;
    elem.onclick = this.onClick.bind(this); 
  }
  
  addToTheBegining() {
    let li = document.createElement('li');
    let item = tasks[Math.floor(Math.random() * tasks.length)];
    li.innerHTML = item;
    return ul.prepend(li);
  }

  addToTheEnd() {
    let li = document.createElement('li');
    let item = tasks[Math.floor(Math.random() * tasks.length)];
    li.innerHTML = item;
    return ul.append(li);
  }

  deleteSelected() {
    let count = 0;
    while (count < 5) {
      for (let key of ul.children) {
        if (key.classList == 'selected') {
          key.remove();
        }
      }
      count++;
    }
  }
  
  sorted() {
    let ulElements = [...ul.children];
    let sortedElements = ulElements.sort((a, b) => a.outerText - b.outerText);
    console.log(sortedElements)
    ul.innerHTML = '';
    return sortedElements.forEach(el => ul.append(el));
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  };
}