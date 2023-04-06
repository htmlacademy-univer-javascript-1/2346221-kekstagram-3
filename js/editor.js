import {isEscapeKey, setPictureScale} from './util.js';
import {pristine} from './form-validator.js';
import {changeEffectToSelected, setEffect, createSlider, destroySlider} from './effects-setting.js';
import {onControlBiggerButtonClick, onControlSmallerButtonClick} from './picture-scale.js';

const body = document.querySelector('body');
const form = body.querySelector('#upload-select-image');
const editor = form.querySelector('.img-upload__overlay');
const scaleSmallerButton = editor.querySelector('.scale__control--smaller');
const scaleBiggerButton = editor.querySelector('.scale__control--bigger');
const prewiew = editor.querySelector('.img-upload__preview img');
const effects = editor.querySelector('.effects__list');
const closeEditorButton = editor.querySelector('#upload-cancel');

const onEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditor();
  }
};

function openEditor() {
  const uploadedImage =  document.querySelector('#upload-file').files[0];
  const fileReader = new FileReader();
  createSlider();

  body.classList.add('modal-open');
  editor.classList.remove('hidden');

  fileReader.onloadend = function() {
    prewiew.src = fileReader.result;
  };
  fileReader.readAsDataURL(uploadedImage);

  document.addEventListener('keydown', onEditorEscKeydown);
  effects.addEventListener('change', changeEffectToSelected);
  scaleSmallerButton.addEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onControlBiggerButtonClick);
  closeEditorButton.addEventListener('click', closeEditor);
}

function closeEditor() {
  destroySlider();
  setEffect('none');
  setPictureScale(100);

  body.classList.remove('modal-open');
  editor.classList.add('hidden');
  prewiew.className = '';

  document.removeEventListener('keydown', onEditorEscKeydown);
  effects.removeEventListener('change', changeEffectToSelected);
  scaleSmallerButton.removeEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.removeEventListener('click', onControlBiggerButtonClick);
  closeEditorButton.removeEventListener('click', closeEditor);
  form.reset();
  pristine.reset();
}

export {openEditor, closeEditor};
