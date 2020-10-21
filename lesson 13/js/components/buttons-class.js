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
    let selectedListItem = document.querySelectorAll('.selected');
    selectedListItem.forEach(el => el.remove());
  }
  
  sorted() {
    let selectedListItem = document.querySelectorAll('.selected');
    selectedListItem = [...selectedListItem];
    let sortedElements = selectedListItem.sort((a, b) => a.textContent > b.textContent ? 1 : -1);
    return sortedElements.forEach(el => ul.append(el));  
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  };
}