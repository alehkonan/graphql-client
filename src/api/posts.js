import { POSTS_API } from './constants';

export const postsKey = 'posts';

export const getPosts = async () => {
  const response = await fetch(POSTS_API(1));
  if (!response.ok) throw new Error('can`t load posts');
  const posts = await response.json();
  return posts;
};
