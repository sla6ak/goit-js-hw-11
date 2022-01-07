import './css/styles.css';
import { feathcImg } from './js/fetch';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const render = document.querySelector('#render');
document.querySelector('#search-form').addEventListener('submit', onFetchForm);

function onFetchForm(e) {
  e.preventDefault();
  const send = document.querySelector('#inputimg').value;
  console.log(send);
  feathcImg(send).then(arrImg => {
    console.log(arrImg);
    render.innerHTML = htmlImg(arrImg.hits).join('');
    let gallerySet = new SimpleLightbox('.gallery__item', {
      captionPosition: 'bottom',
      captionDelay: 250,
    });
    gallerySet.on('show.simplelightbox', function () {
      console.log('Получаеться прослушивать клики даже ненужно, все уже есть под капотом');
    });
  });
}

function htmlImg(arrImg) {
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
