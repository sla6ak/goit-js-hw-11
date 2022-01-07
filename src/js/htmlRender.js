export function htmlImg(arrImg) {
  return arrImg.map(img => {
    console.log(arrImg);
    return `<div class="photo-card">
                <a class="gallery__item" href="${img.largeImageURL}">
                  <img class="gallery__image" src="${img.webformatURL}" loading="lazy title ="" alt="" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${img.likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${img.views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${img.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${img.downloads}
                    </p>
                </div>
            </div>`;
  });
}
