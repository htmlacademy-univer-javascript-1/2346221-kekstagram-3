import {onPictureClick} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureDisplay = document.querySelector('.pictures');

function drawPictures(informationList) {
  const pictureFragment = document.createDocumentFragment();

  for (const information of informationList) {
    const pictureElement = pictureTemplate.cloneNode(true);

    const pictureImage = pictureElement.querySelector('.picture__img');
    const pictureComments = pictureElement.querySelector('.picture__comments');
    const pictureLikes = pictureElement.querySelector('.picture__likes');

    pictureImage.src = information.url;
    pictureImage.alt = information.description;
    pictureComments.textContent = information.comments;
    pictureLikes.textContent = information.likes;

    pictureFragment.append(pictureElement);
  }
  pictureDisplay.append(pictureFragment);
  pictureDisplay.addEventListener('click', onPictureClick);
}

function addPicture(information) {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureComments = pictureElement.querySelector('.picture__comments');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  pictureComments.textContent = 0;
  pictureLikes.textContent = 0;

  pictureImage.src = information.src;
  pictureImage.alt = information.description + ' ' + information.hashtags;
  pictureImage.style.transform = information.scale;
  pictureImage.classList.add(information.class);
  pictureImage.style.filter = information.filter;
  pictureDisplay.append(pictureElement);
}

export {drawPictures, addPicture};
