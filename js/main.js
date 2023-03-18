import {getRandomInt, checkLength, viewPosts} from './util.js';
import {generatePosts} from './post-creating.js';

getRandomInt(1, 5);
checkLength('123', 5);
const posts = generatePosts();
viewPosts(posts);
