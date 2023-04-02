import {MAX_COUNT_OF_USERS, DESCRIPTION_LIST} from './data.js';
import {getRandomInt, isEscapeKey, setPictureScale} from './util.js';
import './form-validator.js';

let lastPictureNumber = 0;

function changeEffect(evt) {
  const selectedEffect = evt.target.value;
  const prewiew = document.querySelector('.img-upload__preview img');

  prewiew.className = '';
  prewiew.classList.add(`effects__preview--${selectedEffect}`);
}

function openEditor() {
  const body = document.querySelector('body');
  const editor = document.querySelector('.img-upload__overlay');
  const uploadedImage =  document.querySelector('#upload-file').files[0];
  const prewiew = editor.querySelector('.img-upload__preview img');
  const scaleSmallerButton = editor.querySelector('.scale__control--smaller');
  const scaleBiggerButton = editor.querySelector('.scale__control--bigger');
  const fileReader = new FileReader();

  const effects = editor.querySelector('.effects__list');
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
  const body = document.querySelector('body');
  const form = document.querySelector('#upload-select-image');
  const editor = form.querySelector('.img-upload__overlay');
  const scaleSmallerButton = editor.querySelector('.scale__control--smaller');
  const scaleBiggerButton = editor.querySelector('.scale__control--bigger');
  const prewiew = editor.querySelector('.img-upload__preview img');
  const effects = editor.querySelector('.effects__list');

  effects.removeEventListener('change', changeEffect);

  body.classList.remove('modal-open');
  form.reset();
  editor.classList.add('hidden');

  setPictureScale(100);
  prewiew.className = '';

  scaleSmallerButton.removeEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.removeEventListener('click', onControlBiggerButtonClick);
  document.removeEventListener('keydown', onEditorEscKeydown);
}

const onEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditor();
  }
};

const onControlSmallerButtonClick = () => {
  const valueField = document.querySelector('.scale__control--value');

  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1)) - 25;

  if (percent >= 25) {
    setPictureScale(percent);
    valueField.value = percent + '%';
  } else {
    valueField.value = '25%';
  }
}

const onControlBiggerButtonClick = () => {
  const valueField = document.querySelector('.scale__control--value');
  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1)) + 25;

  if (percent <= 100) {
    setPictureScale(percent);
    valueField.value = percent + '%';
  } else {
    valueField.value = '100%';
  }
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

const uploadButton = document.querySelector('#upload-file');
uploadButton.addEventListener('change', openEditor);
const closeEditorButton = document.querySelector('#upload-cancel');
closeEditorButton.addEventListener('click', closeEditor);

export {generatePhotoInformationList, generatePictures};
