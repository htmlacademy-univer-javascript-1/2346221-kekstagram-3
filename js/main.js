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
  string = String(string);
  maxLength = parseInt(maxLength);
  return (string.length <= maxLength);
}

getRandomInt(1, 5);
checkLength('123', 5);
