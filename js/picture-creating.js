import {onPictureClick} from './big-picture.js';
import {EFFECTS} from './data.js';

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

  const effect = EFFECTS[information.effect];
  pictureImage.src = information.url;
  pictureImage.alt = information.description + ' ' + information.hashtags;
  const scaleValue = parseInt(information.scale.slice(0, -1), 10);
  pictureImage.style.transform = `scale(${scaleValue/100})`
  pictureImage.classList.add(`effects__preview--${information.effect}`);
  if (information.effect !== 'none') {
    pictureImage.style.filter = `${effect.filter}(${information['effect-level']}${effect.size})`;
  }
  pictureDisplay.append(pictureElement);
}

export {drawPictures, addPicture};
