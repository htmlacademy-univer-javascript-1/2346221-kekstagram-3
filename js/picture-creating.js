import {MAX_COUNT_OF_USERS, DESCRIPTION_LIST} from './data.js';
import {getRandomInt, isEscapeKey, setPictureScale} from './util.js';
import {pristine} from './form-validator.js';

let lastPictureNumber = 0;
const body = document.querySelector('body');
const form = body.querySelector('#upload-select-image');
const editor = form.querySelector('.img-upload__overlay');
const scaleSmallerButton = editor.querySelector('.scale__control--smaller');
const scaleBiggerButton = editor.querySelector('.scale__control--bigger');
const prewiew = editor.querySelector('.img-upload__preview img');
const effects = editor.querySelector('.effects__list');
const valueField = editor.querySelector('.scale__control--value');
const uploadButton = body.querySelector('#upload-file');
const closeEditorButton = editor.querySelector('#upload-cancel');

function changeEffect(evt) {
  const selectedEffect = evt.target.value;
  prewiew.className = '';
  prewiew.classList.add(`effects__preview--${selectedEffect}`);
}

const onEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditor();
  }
};

const onControlSmallerButtonClick = () => {
  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1), 10) - 25;

  if (percent >= 25) {
    setPictureScale(percent);
    valueField.value = `${percent}%`;
  } else {
    valueField.value = '25%';
  }
};

const onControlBiggerButtonClick = () => {
  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1), 10) + 25;

  if (percent <= 100) {
    setPictureScale(percent);
    valueField.value = `${percent}%`;
  } else {
    valueField.value = '100%';
  }
};

function openEditor() {
  const uploadedImage =  document.querySelector('#upload-file').files[0];
  const fileReader = new FileReader();

  effects.addEventListener('change', changeEffect);

  body.classList.add('modal-open');
  editor.classList.remove('hidden');

  fileReader.onloadend = function() {
    prewiew.src = fileReader.result;
  };
  fileReader.readAsDataURL(uploadedImage);

  document.addEventListener('keydown', onEditorEscKeydown);
  scaleSmallerButton.addEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onControlBiggerButtonClick);
}

function closeEditor() {
  effects.removeEventListener('change', changeEffect);

  body.classList.remove('modal-open');
  form.reset();
  editor.classList.add('hidden');

  setPictureScale(100);
  prewiew.className = '';

  scaleSmallerButton.removeEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.removeEventListener('click', onControlBiggerButtonClick);
  document.removeEventListener('keydown', onEditorEscKeydown);
  pristine.reset();
}

function generatePictures(informationList) {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();
  const pictureDisplay = document.querySelector('.pictures');

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
}

function createPictureInformation() {
  lastPictureNumber++;
  return {
    id: lastPictureNumber,
    url: `photos/${lastPictureNumber}.jpg`,
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

uploadButton.addEventListener('change', openEditor);
closeEditorButton.addEventListener('click', closeEditor);

export {generatePhotoInformationList, generatePictures};
