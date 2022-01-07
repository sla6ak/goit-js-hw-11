import Notiflix from 'notiflix';
import { feathcImg } from './fetch';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { htmlImg } from './htmlRender';

export function clientMessage(send, numberPages) {
  feathcImg(send, numberPages)
    .then(arrImg => {
      if (arrImg.hits.length === 0) {
        Notiflix.Notify.warning(`Hooray! We found ${0} images.`);
        return;
      }
      console.log(arrImg);
      Notiflix.Notify.success(`Hooray! We found ${arrImg.totalHits} images.`);
      render.innerHTML = htmlImg(arrImg.hits).join('');
      let gallerySet = new simpleLightbox('.gallery__item', {
        captionPosition: 'bottom',
        captionDelay: 250,
      });
      gallerySet.on('show.simplelightbox', function () {
        console.log(numberPages);
      });
    })
    .catch(error => {
      Notiflix.Notify.error("We're sorry, but you've reached the end of search results.");
    });
}
