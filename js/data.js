const MAX_COUNT_OF_USERS = 25;
const DESCRIPTION_LIST = ['Милые котята', 'Собачки', 'Новости', 'Веселое видео', 'Новая игра', 'Мем'];
const EFFECTS = {
  none: {
    name: 'none',
    size: ''
  },
  chrome: {
    name: 'chrome',
    step: 0.1,
    filter: 'filter: grayscale',
    min: 0,
    max: 1,
    size: ''
  },
  sepia: {
    name: 'sepia',
    step: 0.1,
    filter: 'filter: sepia',
    min: 0,
    max: 1,
    size: ''
  },
  marvin: {
    name: 'marvin',
    step: 1,
    filter: 'filter: invert',
    min: 0,
    max: 100,
    size: '%'
  },
  phobos: {
    name: 'phobos',
    step: 0.1,
    filter: 'filter: blur',
    min: 0,
    max: 3,
    size: 'px'
  },
  heat: {
    name: 'heat',
    step: 0.1,
    filter: 'filter: brightness',
    min: 1,
    max: 3,
    size: ''
  }
};

export {MAX_COUNT_OF_USERS, DESCRIPTION_LIST, EFFECTS};
