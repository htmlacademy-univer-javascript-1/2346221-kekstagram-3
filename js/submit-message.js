import {isEscapeKey} from "./util.js";

const body = document.querySelector('body');

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

export {showErrorMessage, showSuccessMessage};
