import {url} from './index';
import {posts} from './index';

export default function requestCommentsByPostId(com: string) {
  let id = (<HTMLInputElement>document.querySelector('#id')).value;
  return fetch(`${url}${posts}/${id}/${com}`);
}