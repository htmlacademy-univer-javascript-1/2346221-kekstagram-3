import {generatePhotoInformationList, generatePictures} from './picture-creating.js';
import {openEditor} from './editor.js';

const uploadButton = document.querySelector('#upload-file');
uploadButton.addEventListener('change', openEditor);

const pictureInformationList = generatePhotoInformationList();
generatePictures(pictureInformationList);
