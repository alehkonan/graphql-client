export const API = process.env.REACT_APP_API;
export const POSTS_API = (userId) =>
  `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
