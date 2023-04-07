function checkLegitLength(string, minLength, maxLength) {
  return string >= minLength && string <= maxLength;
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function onEscKeydownHandler(element, onKeydownFunction) {
  function eventHandler(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onKeydownFunction();
    }
  }
  element.addEventListener('keydown', eventHandler);

  return eventHandler;
}

function onAnotherAreaClickHandler(element, selector, onClickFunction) {
  function eventHandler(evt) {
    if (evt.target === document.querySelector(selector)) {
      onClickFunction();
    }
  }
  element.addEventListener('click', eventHandler);

  return eventHandler;
}

function addPrewiewInformation(information) {
  const prewiew = document.querySelector('.img-upload__preview img');
  information.src = prewiew.src;
  information.scale = prewiew.style.transform;
  information.class = prewiew.classList[0];
  information.filter = prewiew.style.filter;
}

function convertDataToInformation(formData) {
  const information = {
    description: formData.get('description'),
    hashtags: formData.get('hashtags')
  };
  addPrewiewInformation(information);
  return information;
}

export {checkLegitLength, convertDataToInformation, onEscKeydownHandler, onAnotherAreaClickHandler};
