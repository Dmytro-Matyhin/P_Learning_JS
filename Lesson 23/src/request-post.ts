import {url} from './index';
import {posts} from './index';

export default async function requestPost(id: string): Promise<Response> {
  return await fetch(`${url}${posts}/${id}`);
}
