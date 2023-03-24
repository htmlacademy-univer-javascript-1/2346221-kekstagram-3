import {getRandomInt, checkLength} from './util.js';
import {generatePhotoInformationList} from './post-creating.js';

getRandomInt(1, 5);
checkLength('123', 5);

let pictureInformationList = generatePhotoInformationList();

generatePictures(pictureInformationList);
