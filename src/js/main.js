import { getData } from './pixabay-api.js';
import { createGalleryCardTemplate } from './render-functions.js';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

const onSearchFormSubmit = event => {};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
