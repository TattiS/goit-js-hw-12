import SimpleLightbox from 'simplelightbox';
import { getData } from './js/pixabay-api.js';
import { getDataByPage } from './js/pixabay-api.js';
import { getPerPage } from './js/pixabay-api.js';
import { createGalleryCardTemplate } from './js/render-functions.js';
import { showErrMsg } from './js/render-functions.js';
import { hideElement } from './js/render-functions.js';
import { showElement } from './js/render-functions.js';
import { smoothScroll } from './js/render-functions.js';

const searchFormEl = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.loadMoreBtn');
const modalWindow = new SimpleLightbox('.gallery-card a');
let cardEl = null;
let gallerycards = '';
let currentPage = 1;

const onSearchFormSubmit = async event => {
  event.preventDefault();
  gallerycards = '';
  galleryEl.innerHTML = '';
  currentPage = 1;
  hideElement(loadMoreBtnEl);

  const searchStr = event.currentTarget.elements.searchStr.value.trim();
  if (!searchStr) {
    showErrMsg('Enter a string to start a new search, please.');
    return;
  }
  searchFormEl.reset();
  showElement(loaderEl);

  const data = await getData(searchStr);
  try {
    if (data.hits.length <= 0) {
      hideElement(loaderEl);
      showErrMsg(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    gallerycards = data.hits
      .map(picInfo => createGalleryCardTemplate(picInfo))
      .join('');
    hideElement(loaderEl);
    galleryEl.innerHTML = gallerycards;
    currentPage <= data.totalHits / getPerPage()
      ? showElement(loadMoreBtnEl)
      : (hideElement(loadMoreBtnEl),
        showErrMsg(
          `We're sorry, but you've reached the end of search results.`
        ));
    cardEl = document.querySelector('.gallery-card');
    smoothScroll(cardEl);
    modalWindow.refresh();
  } catch (error) {
    showErrMsg(error.message);
  }
};
const onLoadMoreBtnClick = async event => {
  showElement(loaderEl);
  const data = await getDataByPage(++currentPage);
  try {
    gallerycards = data.hits
      .map(picInfo => createGalleryCardTemplate(picInfo))
      .join('');
    hideElement(loaderEl);
    galleryEl.insertAdjacentHTML('beforeend', gallerycards);
    currentPage >= Math.ceil(data.totalHits / getPerPage())
      ? (hideElement(loadMoreBtnEl),
        showErrMsg(
          `We're sorry, but you've reached the end of search results.`
        ))
      : showElement(loadMoreBtnEl);
    cardEl = document.querySelector('.gallery-card');
    smoothScroll(cardEl);
    modalWindow.refresh();
  } catch (error) {
    showErrMsg(error.message);
  }
};
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
searchFormEl.addEventListener('submit', onSearchFormSubmit);
