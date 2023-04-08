import {onEscKeydownHandler, onAnotherAreaClickHandler} from './util.js';

const body = document.querySelector('body');
const successMessageTemplate = body.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('.error');
let messageEscKeydownHandler;
let anotherAreaClickHandler;

function showSuccessMessage() {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessMessage);
  messageEscKeydownHandler = onEscKeydownHandler(document, closeSuccessMessage);
  anotherAreaClickHandler = onAnotherAreaClickHandler(document, '.success', closeSuccessMessage);
  body.append(successMessage);
  successMessage.style.zIndex = '9999';
}

function showErrorMessage() {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.textContent = 'Закрыть';

  errorButton.addEventListener('click', closeErrorMessage);
  messageEscKeydownHandler = onEscKeydownHandler(document, closeErrorMessage);
  anotherAreaClickHandler = onAnotherAreaClickHandler(document, '.error', closeErrorMessage);
  body.append(errorMessage);
  errorMessage.style.zIndex = '9999';
}

function closeSuccessMessage() {
  const successButton = body.querySelector('.success__button');

  successButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('click', anotherAreaClickHandler);
  document.removeEventListener('keydown', messageEscKeydownHandler);
  anotherAreaClickHandler = undefined;
  messageEscKeydownHandler = undefined;

  body.querySelector('.success').remove();
}

function closeErrorMessage() {
  const errorButton = body.querySelector('.error__button');

  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('click', anotherAreaClickHandler);
  document.removeEventListener('keydown', messageEscKeydownHandler);
  messageEscKeydownHandler = undefined;
  anotherAreaClickHandler = undefined;

  body.querySelector('.error').remove();
}

export {showErrorMessage, showSuccessMessage};
