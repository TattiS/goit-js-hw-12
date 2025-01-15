//функції для відображення елементів інтерфейсу
export function createGalleryCardTemplate(imgInfo) {
  return `<li class="gallery-card">
          <img src="${imgInfo}" alt="${imgInfo}" srcset="">
          <div class="card-content">
            <div class="stats"><span>Likes</span> ${imgInfo}</div>
            <div class="stats"><span>Views</span> ${imgInfo}</div>
            <div class="stats"><span>Comments</span> ${imgInfo}</div>
            <div class="stats"><span>Downloads</span>${imgInfo}</div>
          </div>
        </li>`;
}
