import SimpleLightbox from 'simplelightbox';
import { getData } from './js/pixabay-api.js';
import { createGalleryCardTemplate } from './js/render-functions.js';
import { showErrMsg } from './js/render-functions.js';

const searchPath = 'https://pixabay.com/api/';
const searchOptions = {
  key: '48221112-8c56db48dd0c7c6f6f060339d',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
const searchFormEl = document.querySelector('.search-form');
const searchStrInput = document.querySelector('#searchStrInput');
const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const modalWindow = new SimpleLightbox('.gallery-card a');
let gallerycards = '';

const toggleLoader = () => {
  loaderEl.classList.toggle('visually-hidden');
};

const onSearchFormSubmit = event => {
  event.preventDefault();
  gallerycards = '';
  galleryEl.innerHTML = '';
  const searchStr = event.currentTarget.elements.searchStr.value.trim();

  if (!searchStr) {
    showErrMsg('Enter a string to start a new search, please.');
    return;
  }
  searchOptions.q = searchStr;
  searchFormEl.reset();
  toggleLoader();
  getData(searchPath, searchOptions)
    .then(data => {
      if (data.hits.length <= 0) {
        toggleLoader();
        showErrMsg(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }
      gallerycards = data.hits
        .map(picInfo => createGalleryCardTemplate(picInfo))
        .join('');
      toggleLoader();
      galleryEl.innerHTML = gallerycards;
      modalWindow.refresh();
    })
    .catch(error => showErrMsg(error));
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
