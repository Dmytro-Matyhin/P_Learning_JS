import {url} from './index';
import {posts} from './index';

export default function requestPost(id: string) {
  return fetch(`${url}${posts}/${id}`);
}
