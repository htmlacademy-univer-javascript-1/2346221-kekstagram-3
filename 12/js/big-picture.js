import {onEscKeydownHandler, onAnotherAreaClickHandler} from './util.js';

let bigPictureEscKeydownHandler;
let anotherAreaClickHandler;
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureComments = bigPictureSection.querySelector('.comments-count');
const bigPictureCloseButton = bigPictureSection.querySelector('.big-picture__cancel');
const autorComment = bigPictureSection.querySelector('.social__caption');

function onPictureClick(evt) {
  const element = evt.target.closest('.picture');
  if (element) {
    const image = element.querySelector('.picture__img');
    const likes = element.querySelector('.picture__likes').textContent;
    const comments = element.querySelector('.picture__comments').textContent;

    bigPictureImg.src = image.src;
    bigPictureImg.style.transform = image.style.transform;
    bigPictureImg.classList = image.classList;
    bigPictureImg.style.filter = image.style.filter;

    bigPictureLikes.textContent = likes;
    bigPictureComments.textContent = comments;
    autorComment.textContent = image.alt;

    bigPictureSection.classList.remove('hidden');
    bigPictureCloseButton.addEventListener('click', closeBigPicture);

    bigPictureEscKeydownHandler = onEscKeydownHandler(document, closeBigPicture);
    anotherAreaClickHandler = onAnotherAreaClickHandler(document, '.big-picture', closeBigPicture);
  }
}

function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', bigPictureEscKeydownHandler);
  document.removeEventListener('click', anotherAreaClickHandler);
  bigPictureEscKeydownHandler = undefined;
  anotherAreaClickHandler = undefined;
}

export {onPictureClick};
