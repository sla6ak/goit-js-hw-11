import './css/styles.css';
import axios from 'axios';
// import Notiflix from 'notiflix';
import { SendImg } from './js/classOOP';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { htmlImg } from './js/htmlRender';
import Notiflix from 'notiflix';

const render = document.querySelector('#render');
const more = document.querySelector('.load-more');
document.querySelector('#search-form').addEventListener('submit', onFetchForm);
let arrImg = [];

const sendImg = new SendImg();

async function onFetchForm(e) {
  e.preventDefault();
  let valueInput = document.querySelector('#inputimg').value;
  if (valueInput === '') {
    remove(render);
  } else {
    remove(render);
    sendImg.startPages();
    sendImg.metodSend = valueInput;
    try {
      arrImg = await sendImg.fetchImg(sendImg.metodSend, sendImg.numberPages);
      addImg(arrImg);
      if (arrImg.totalHits === 0) {
        Notiflix.Notify.warning(`Hooray! We found ${arrImg.totalHits} images.`);
      } else {
        Notiflix.Notify.success(`Hooray! We found ${arrImg.totalHits} images.`);
      }
    } catch {
      Notiflix.Notify.error('Error catch');
    }

    more.addEventListener('click', onMoreClick);
    async function onMoreClick() {
      sendImg.nextPages();
      try {
        arrImg = await sendImg.fetchImg(sendImg.metodSend, sendImg.numberPages);
        addImg(arrImg);
        if (arrImg.totalHits === 0) {
          Notiflix.Notify.warning(`Hooray! We found ${arrImg.totalHits} images.`);
        } else {
          Notiflix.Notify.success(`Hooray! We found ${arrImg.totalHits} images.`);
        }
      } catch {
        Notiflix.Notify.error('Error catch');
      }
    }
  }
  //   // clientMessage(send, sendImg.numberPages);
}

function addImg(arrImg) {
  render.insertAdjacentHTML('beforeend', htmlImg(arrImg.hits).join(''));
  let gallerySet = new SimpleLightbox('.gallery a', {
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  gallerySet.on('show.simplelightbox', function () {});
}
function remove(Element) {
  Element.innerHTML = '';
}
// **************************************************

// function clientMessage() {
//   sendImg
//     .fethcImg(this.send, this.numberPages)
//     .then(arrImg => {
//       if (arrImg.hits.length === 0) {
//         Notiflix.Notify.warning(`Hooray! We found ${0} images.`);
//         return;
//       }
//       console.log(arrImg);
//       Notiflix.Notify.success(`Hooray! We found ${arrImg.totalHits} images.`);
//       render.innerHTML = htmlImg(arrImg.hits).join('');
//       let gallerySet = new simpleLightbox('.gallery__item', {
//         captionPosition: 'bottom',
//         captionDelay: 250,
//       });
//       gallerySet.on('show.simplelightbox', function () {
//         console.log(numberPages);
//       });
//     })
//     .catch(error => {
//       Notiflix.Notify.error("We're sorry, but you've reached the end of search results.");
//     });
// }
