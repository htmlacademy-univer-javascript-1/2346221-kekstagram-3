const form = document.querySelector('#upload-select-image');
const pristine = new Pristine(form);

function validateComment(value) {
  return value.length >= 20 && value.length <= 140;
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
  validateComment,
  'От 20 до 140 символов'
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashTags,
  'Неверный формат ХэшТегов'
);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    console.log('Отправлять нельзя');
  }
});
