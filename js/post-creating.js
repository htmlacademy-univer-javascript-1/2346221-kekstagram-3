import {MAX_COUNT_OF_USERS, DESCRIPTION_LIST} from './data.js';
import {getRandomInt} from './util.js';

function generatePictures(informationList) {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();
  const pictureDisplay = document.querySelector('.pictures');

  for (let information of informationList) {
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
}

function createPictureInformation() {
  lastPostNumber++;
  return {
    id: lastPostNumber,
    url: `photos/${lastPostNumber}.jpg`,
    description: getRandomDescription(),
    likes: getRandomInt(15, 200),
    comments: getRandomInt(0, 200)
  };
}

function getRandomDescription() {
  return DESCRIPTION_LIST[getRandomInt(0, DESCRIPTION_LIST.length - 1)];
}

function generatePhotoInformationList() {
  return Array.from({length: MAX_COUNT_OF_USERS}, createPictureInformation);
}

let lastPostNumber = 0;

export {generatePhotoInformationList, generatePictures};
