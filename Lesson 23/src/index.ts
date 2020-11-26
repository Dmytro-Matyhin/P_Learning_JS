import requestPost from './request-post';
import requestCommentsByPostId from './request-comments';

export const url = 'https://jsonplaceholder.typicode.com/';
export const posts = 'posts';
const comments = 'comments';

let form = document.querySelector('#form');
let buttonRequest = document.querySelector('#request');

buttonRequest.addEventListener('click', main);

function main(event: Event) {
  event.preventDefault();
  let id = (<HTMLInputElement>document.querySelector('#id')).value;

  requestPost(id).then(request => {
    return request.json();
  })
  .then(data => {
    console.log(data)
    let postTitle = data.title;
    let postBody = data.body;
    let div = document.createElement('div');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    title.innerHTML = 'Title: ' + postTitle;
    description.innerHTML = '<b>Body:</b> ' + postBody;
    div.append(title);
    div.append(description);
    form.append(div);
    return requestCommentsByPostId(comments);
  })
  .then(request => {
    return request.json();
  })
  .then(data => {
    console.log(data)
    data.forEach((item: any) => {
      let commentName = item.name;
      let commentBody = item.body;
      let div = document.createElement('div');
      let commentTitle = document.createElement('p');
      let comment = document.createElement('p');
      commentTitle.innerHTML = '<b>Comment Title:</b> ' + commentName;
      comment.innerHTML = '<b>Comment Body:</b> ' + commentBody;
      div.append(commentTitle);
      div.append(comment);
      form.after(div);
    })
  })
}