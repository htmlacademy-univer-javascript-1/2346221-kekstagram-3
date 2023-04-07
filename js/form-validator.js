import {checkLegitLength, isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {addPicture} from './picture-creating.js';

const body = document.querySelector('body');
const form = body.querySelector('#upload-select-image');
const submitButton = form.querySelector('#upload-submit');
const prewiew = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessAnotherAreaClick = (evt) => {
  if (evt.target == document.querySelector('.success')) {
    closeSuccessMessage();
  }
};

function closeSuccessMessage() {
  body.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('click', onSuccessAnotherAreaClick);
}

function showSuccessMessage() {
  const successMessage = body.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessAnotherAreaClick);
  body.append(successMessage);
  successMessage.style.zIndex = '9999';
}

const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorAnotherAreaClick = (evt) => {
  if ((evt.target == document.querySelector('.error'))) {
    closeErrorMessage();
  }
};

function closeErrorMessage() {
  body.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('click', onErrorAnotherAreaClick);
}

function showErrorMessage() {
  const errorMessage = body.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.textContent = 'Закрыть';

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorAnotherAreaClick);
  body.append(errorMessage);
  errorMessage.style.zIndex = '9999';
}

function validateCommentLength(value) {
  return checkLegitLength(value.length, 20, 140);
}

function validateHashTags(value) {
  if (value.length === 0) { return true; }
  const hashTags = value.split(' ');

  const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  for (let i = 0; i < hashTags.length; i++) {
    if (!regex.test(hashTags[i])) {
      return false;
    }
  }

  for (let i = 0; i < hashTags.length - 1; i++) {
    for (let j = i + 1; j < hashTags.length; j++) {
      if (hashTags[i].substring(1).toLowerCase() === hashTags[j].substring(1).toLowerCase()) {
        return false;
      }
    }
  }

  return true;
}

pristine.addValidator(
  form.querySelector('.text__description'),
  validateCommentLength,
  'От 20 до 140 символов'
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashTags,
  'Неверный формат ХэшТегов'
);

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Загружаю...';
};

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function getInformation(formData) {
  return {
    description: formData.get("description"),
    hashtags: formData.get("hashtags"),
    src: prewiew.src,
    scale: prewiew.style.transform,
    class: prewiew.classList[0],
    filter: prewiew.style.filter
  }
}


function submitForm(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const info = new FormData(evt.target);
      sendData(
        () => {
          addPicture(getInformation(info));
          onSuccess();
          showSuccessMessage();
          unblockSubmitButton();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        info,
      );
    }
  });
};

export {pristine, submitForm, showErrorMessage};
