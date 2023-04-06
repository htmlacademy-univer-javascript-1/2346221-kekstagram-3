import {isEscapeKey} from './util.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureComments = bigPictureSection.querySelector('.comments-count');
const bigPictureCloseButton = bigPictureSection.querySelector('.big-picture__cancel');
const autorComment = bigPictureSection.querySelector('.social__caption');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function onPictureClick(evt) {
  const element = evt.target.closest('.picture');
  if (element) {
    const image = element.querySelector('.picture__img');
    const likes = element.querySelector('.picture__likes').textContent;
    const comments = element.querySelector('.picture__comments').textContent;

    bigPictureImg.src = image.src;
    bigPictureLikes.textContent = likes;
    bigPictureComments.textContent = comments;
    autorComment.textContent = image.alt;

    bigPictureSection.classList.remove('hidden');
    bigPictureCloseButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscKeydown);
  }
}

function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  bigPictureCloseButton.removeEventListener('click', onBigPictureEscKeydown);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

export {onPictureClick};
