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
  per_page: 15,
  page: currentPage,
};
const searchFormEl = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.loadMoreBtn');
const modalWindow = new SimpleLightbox('.gallery-card a');
let gallerycards = '';

const hideLoader = () => {
  if (!loaderEl.classList.contains('visually-hidden')) {
    loaderEl.classList.add('visually-hidden');
  }
};
const showLoader = () => {
  if (loaderEl.classList.contains('visually-hidden')) {
    loaderEl.classList.remove('visually-hidden');
  }
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
const smoothScroll = () => {
  const cardEl = document.querySelector('.gallery-card');
  const cardHeight = cardEl.getBoundingClientRect().height;
  const scrollDistance = cardHeight * 2;
  window.scrollBy({
    top: scrollDistance,
    left: 0,
    behavior: 'smooth',
  });
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
  showLoader();

  const data = await getData(searchPath, searchOptions);
  try {
    if (data.hits.length <= 0) {
      hideLoader();
      showErrMsg(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    gallerycards = data.hits
      .map(picInfo => createGalleryCardTemplate(picInfo))
      .join('');
    hideLoader();
    galleryEl.innerHTML = gallerycards;
    showLoadMore();
    smoothScroll();
    modalWindow.refresh();
  } catch (error) {
    showErrMsg(error.message);
  }
};
const onLoadMoreBtnClick = async event => {
  showLoader();
  searchOptions.page = ++currentPage;
  const data = await getData(searchPath, searchOptions);
  try {
    if (currentPage > Math.ceil(data.totalHits / searchOptions.per_page)) {
      hideLoader();
      hideLoadMore();
      showErrMsg(`We're sorry, but you've reached the end of search results.`);
      return;
    }
    gallerycards = data.hits
      .map(picInfo => createGalleryCardTemplate(picInfo))
      .join('');
    hideLoader();
    galleryEl.insertAdjacentHTML('beforeend', gallerycards);
    showLoadMore();
    smoothScroll();
    modalWindow.refresh();
  } catch (error) {
    showErrMsg(error.message);
  }
};
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
searchFormEl.addEventListener('submit', onSearchFormSubmit);
