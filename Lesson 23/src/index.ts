import requestPost from './request-post';
import requestCommentsByPostId from './request-comments';
import {PostInterface} from './post-interface';
import {CommentInterface} from './comment-interface' ;

export const url: string = 'https://jsonplaceholder.typicode.com/';
export const posts: string = 'posts';
const comments: string = 'comments';

let form: HTMLFormElement = document.querySelector('#form');
let buttonRequest: HTMLButtonElement  = document.querySelector('#request');

buttonRequest.addEventListener('click', main);

function main(event: Event): void {
  event.preventDefault();
  let id: string = (<HTMLInputElement>document.querySelector('#id')).value;

  requestPost(id).then(request => {
    return request.json();
  })
  .then(data => {
    console.log(data)
    let postData: PostInterface = {
      title: data.title,
      body:  data.body,
      userId: data.userId,
      id: data.id,
    }
    let div: HTMLDivElement = document.createElement('div');
    let title: HTMLHeadingElement = document.createElement('h3');
    let description: HTMLParagraphElement = document.createElement('p');
    title.innerHTML = 'Title: ' + postData.title;
    description.innerHTML = '<b>Body:</b> ' + postData.body;
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
      let commentData: CommentInterface = {
        title: item.name,
        body: item.body,
      }
      let div: HTMLDivElement = document.createElement('div');
      let commentTitle: HTMLParagraphElement = document.createElement('p');
      let comment: HTMLParagraphElement = document.createElement('p');
      commentTitle.innerHTML = '<b>Comment Title:</b> ' + commentData.title;
      comment.innerHTML = '<b>Comment Body:</b> ' + commentData.body;
      div.append(commentTitle);
      div.append(comment);
      form.after(div);
    })
  })
}