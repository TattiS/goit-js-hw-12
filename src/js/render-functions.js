import iziToast from 'izitoast';
export function createGalleryCardTemplate(imgInfo) {
  return `<li class="gallery-card">
  <a href="${imgInfo.largeImageURL}">
          <img src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" srcset="">
          <div class="card-content">
            <div class="stats"><span>Likes</span> ${imgInfo.likes}</div>
            <div class="stats"><span>Views</span> ${imgInfo.views}</div>
            <div class="stats"><span>Comments</span> ${imgInfo.comments}</div>
            <div class="stats"><span>Downloads</span>${imgInfo.downloads}</div>
          </div>
          </a>
        </li>`;
}

export function showErrMsg(msg) {
  iziToast.error({
    message: `${msg}`,
    messageColor: '#FAFAFB',
    messageSize: '16px',
    messageLineHeight: '24px',
    maxWidth: '432px',
    position: 'topRight',
    backgroundColor: '#EF4040',
    color: '#FAFAFB',
    iconUrl:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><g clip-path='url(%23clip0_602_210)'><path d='M6.81 0.219C6.95056 0.0787966 7.14097 4.21785e-05 7.3395 0L16.6605 0C16.859 4.21785e-05 17.0494 0.0787966 17.19 0.219L23.781 6.81C23.9212 6.95056 24 7.14097 24 7.3395V16.6605C24 16.859 23.9212 17.0494 23.781 17.19L17.19 23.781C17.0494 23.9212 16.859 24 16.6605 24H7.3395C7.14097 24 6.95056 23.9212 6.81 23.781L0.219 17.19C0.0787966 17.0494 4.21785e-05 16.859 0 16.6605L0 7.3395C4.21785e-05 7.14097 0.0787966 6.95056 0.219 6.81L6.81 0.219ZM7.65 1.5L1.5 7.65V16.35L7.65 22.5H16.35L22.5 16.35V7.65L16.35 1.5H7.65Z' fill='%23FAFAFB'/><path d='M6.969 6.969C7.03867 6.89916 7.12143 6.84374 7.21255 6.80593C7.30366 6.76812 7.40135 6.74866 7.5 6.74866C7.59865 6.74866 7.69633 6.76812 7.78745 6.80593C7.87857 6.84374 7.96133 6.89916 8.031 6.969L12 10.9395L15.969 6.969C16.0387 6.89927 16.1215 6.84395 16.2126 6.80622C16.3037 6.76848 16.4014 6.74905 16.5 6.74905C16.5986 6.74905 16.6963 6.76848 16.7874 6.80622C16.8785 6.84395 16.9613 6.89927 17.031 6.969C17.1007 7.03873 17.156 7.12152 17.1938 7.21263C17.2315 7.30374 17.2509 7.40139 17.2509 7.5C17.2509 7.59862 17.2315 7.69627 17.1938 7.78738C17.156 7.87849 17.1007 7.96127 17.031 8.031L13.0605 12L17.031 15.969C17.1007 16.0387 17.156 16.1215 17.1938 16.2126C17.2315 16.3037 17.2509 16.4014 17.2509 16.5C17.2509 16.5986 17.2315 16.6963 17.1938 16.7874C17.156 16.8785 17.1007 16.9613 17.031 17.031C16.9613 17.1007 16.8785 17.156 16.7874 17.1938C16.6963 17.2315 16.5986 17.2509 16.5 17.2509C16.4014 17.2509 16.3037 17.2315 16.2126 17.1938C16.1215 17.156 16.0387 17.1007 15.969 17.031L12 13.0605L8.031 17.031C7.96127 17.1007 7.87848 17.156 7.78737 17.1938C7.69626 17.2315 7.59861 17.2509 7.5 17.2509C7.40138 17.2509 7.30373 17.2315 7.21262 17.1938C7.12151 17.156 7.03873 17.1007 6.969 17.031C6.89927 16.9613 6.84395 16.8785 6.80621 16.7874C6.76847 16.6963 6.74905 16.5986 6.74905 16.5C6.74905 16.4014 6.76847 16.3037 6.80621 16.2126C6.84395 16.1215 6.89927 16.0387 6.969 15.969L10.9395 12L6.969 8.031Z' fill='%23FAFAFB'/></g><defs><clipPath id='clip0_602_210'><rect width='24' height='24' fill='white'/></clipPath></defs></svg>",
  });
}

export const hideElement = element => {
  if (!element.classList.contains('visually-hidden')) {
    element.classList.add('visually-hidden');
  }
};
export const showElement = element => {
  if (element.classList.contains('visually-hidden')) {
    element.classList.remove('visually-hidden');
  }
};
export const smoothScroll = element => {
  const elementHeight = element.getBoundingClientRect().height;
  const scrollDistance = elementHeight * 2;
  window.scrollBy({
    top: scrollDistance,
    left: 0,
    behavior: 'smooth',
  });
};
