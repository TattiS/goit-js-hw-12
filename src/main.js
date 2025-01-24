import SimpleLightbox from 'simplelightbox';
import { getData } from './js/pixabay-api.js';
import { createGalleryCardTemplate } from './js/render-functions.js';
import { showErrMsg } from './js/render-functions.js';

const searchPath = 'https://pixabay.com/api/';
let currentPage = 1;
const searchOptions = {
  key: '48221112-8c56db48dd0c7c6f6f060339d',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
  page: currentPage,
};
const searchFormEl = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.loadMoreBtn');
const modalWindow = new SimpleLightbox('.gallery-card a');
let gallerycards = '';

const toggleLoader = () => {
  loaderEl.classList.toggle('visually-hidden');
};
const hideLoadMore = () => {
  if (!loadMoreBtnEl.classList.contains('visually-hidden')) {
    loadMoreBtnEl.classList.add('visually-hidden');
  }
};
const showLoadMore = () => {
  if (loadMoreBtnEl.classList.contains('visually-hidden')) {
    loadMoreBtnEl.classList.remove('visually-hidden');
  }
};

const onSearchFormSubmit = async event => {
  event.preventDefault();
  gallerycards = '';
  galleryEl.innerHTML = '';
  currentPage = 1;
  hideLoadMore();

  const searchStr = event.currentTarget.elements.searchStr.value.trim();

  if (!searchStr) {
    showErrMsg('Enter a string to start a new search, please.');
    return;
  }
  searchOptions.q = searchStr;
  searchFormEl.reset();
  toggleLoader();
  // getData(searchPath, searchOptions)
  //   .then(data => {
  //     if (data.hits.length <= 0) {
  //       toggleLoader();
  //       showErrMsg(
  //         'Sorry, there are no images matching your search query. Please try again!'
  //       );
  //       return;
  //     }
  const data = await getData(searchPath, searchOptions);
  try {
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
    showLoadMore();
    modalWindow.refresh();
  } catch (error) {
    showErrMsg(error.message);
  }
};
const onLoadMoreBtnClick = async event => {
  toggleLoader();
  searchOptions.page = ++currentPage;
  const data = await getData(searchPath, searchOptions);
  try {
    if (data.hits.length === 0) {
      hideLoadMore();
      return;
    }
    gallerycards = data.hits
      .map(picInfo => createGalleryCardTemplate(picInfo))
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', gallerycards);
    showLoadMore();
    modalWindow.refresh();
  } catch (error) {
    showErrMsg(error.message);
  }
};
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
searchFormEl.addEventListener('submit', onSearchFormSubmit);
