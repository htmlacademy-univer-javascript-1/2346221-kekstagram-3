import {getRandomInt, checkLength} from './util.js';
import {generatePhotoInformationList, generatePictures} from './post-creating.js';

getRandomInt(1, 5);
checkLength('123', 5);

const pictureInformationList = generatePhotoInformationList();

generatePictures(pictureInformationList);
