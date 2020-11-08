const url = 'https://jsonplaceholder.typicode.com/';
const posts = 'posts';
const comments = 'comments';

let form = document.querySelector('#form');
let input = document.querySelector('#id');
let buttonRequest = document.querySelector('#request');

buttonRequest.addEventListener('click', main);


function main(event) {
  event.preventDefault();

  let code = document.querySelector('#code');

  let id = input.value;

  fetch(`${url}${posts}/${id}`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data); 
    for (let key of Object.entries(data)) {
      let ulPost = document.createElement('ul');
      let liPost = document.createElement('li');
      liPost.innerHTML = key.join(': ');
      ulPost.append(liPost)
      form.append(ulPost)
    }
    return loadComments(comments)
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data)
    
    for (let key of data) {
      let ulComments = document.createElement('ul');
      for (let value of Object.entries(key)) {
        let liComments = document.createElement('li');
        liComments.innerHTML = value.join(': ')
        ulComments.append(liComments);
      }

      code.after(ulComments);
    }
  })
}


function loadComments(data) {
  let id = input.value;

  return new Promise((resolve) => {
    resolve(fetch(`${url}${posts}/${id}/${data}`));
  })
}