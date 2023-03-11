/*
Module 2 Task 1
*/

function getRandomInt(min, max) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  if (min > max) {
    const SWAP = max;
    max = min;
    min = SWAP;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkLength(string, maxLength) {
  return string.length <= maxLength;
}

getRandomInt(1, 5);
checkLength('123', 5);

/*
Module 4 Task 1
*/

const MAX_COUNT_OF_USERS = 25;
const DESCRIPTION_LIST = ['Милые котята', 'Собачки', 'Новости', 'Веселое видео', 'Новая игра', 'Мем'];
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

const posts = Array.from({length: MAX_COUNT_OF_USERS}, createPost);

console.log(posts);
