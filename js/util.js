function getRandomInt(min, max) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
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

function viewPosts(arg) {
  return arg;
}

export {getRandomInt, checkLength, viewPosts};
