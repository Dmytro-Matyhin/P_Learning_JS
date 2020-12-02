import {url} from './index';
import {posts} from './index';

export default async function requestCommentsByPostId(com: string): Promise<Response>  {
  let id: string = (<HTMLInputElement>document.querySelector('#id')).value;
  return await fetch(`${url}${posts}/${id}/${com}`);
}