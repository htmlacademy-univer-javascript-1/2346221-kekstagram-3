import { MAX_COUNT_OF_USERS, DESCRIPTION_LIST } from './data.js';
import { getRandomInt } from './util.js';

let numberOfLastPost = 0;

function getRandomDescription() {
  return DESCRIPTION_LIST[getRandomInt(0, DESCRIPTION_LIST.length - 1)];
}

function createPost() {
  numberOfLastPost++;
  return {
    id: numberOfLastPost,
    url: `photos/${numberOfLastPost}.jpg`,
    description: getRandomDescription(),
    likes: getRandomInt(15, 200),
    comments: getRandomInt(0, 200)
  };
}

function generatePosts() {
  return Array.from({length: MAX_COUNT_OF_USERS}, createPost);
}

export {generatePosts};
