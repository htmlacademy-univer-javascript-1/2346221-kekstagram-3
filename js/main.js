import {drawPictures} from './picture-creating.js';
import {loadPictures} from './api.js';
import {submitForm, showErrorMessage} from './form-validator.js';
import {closeEditor} from './editor.js';

loadPictures(
(picuturesInfo) => {
  drawPictures(picuturesInfo);
},
() => {
  showErrorMessage();
}
);

submitForm(closeEditor);
