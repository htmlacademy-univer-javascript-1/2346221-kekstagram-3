import {EFFECTS} from './data.js';
import {setPictureEffect} from './util.js';

const prewiew = document.querySelector('.img-upload__preview img');
const sliderBlock = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderBlock.querySelector('.effect-level__slider');
const sliderValue = sliderBlock.querySelector('.effect-level__value');
let selectedEffect = 'none';

function createSlider() {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    sliderValue.value = value;
    const effect = EFFECTS[selectedEffect];
    setPictureEffect(effect, value);
  });

  sliderBlock.classList.add('hidden');
}

function changeSliderEffect() {
  const effect = EFFECTS[selectedEffect];
  if (effect.name === 'none') {
    setPictureEffect(effect);
    sliderValue.value = 0;
    sliderBlock.classList.add('hidden');
  } else {
    sliderBlock.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.min,
        max: effect.max
      },
      start: effect.max,
      step: effect.step
    });
  }
}

function destroySlider() {
  sliderElement.noUiSlider.destroy();
}

function changeEffectToSelected(evt) {
  selectedEffect = evt.target.value;
  setEffect(selectedEffect);
}

function setEffect(effect) {
  selectedEffect = effect;
  prewiew.className = '';
  prewiew.classList.add(`effects__preview--${selectedEffect}`);
  changeSliderEffect();
}

export {changeEffectToSelected, setEffect, createSlider, destroySlider};
