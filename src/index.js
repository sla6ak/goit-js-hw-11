import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import { SendImg } from './js/classOOP';
// import simpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { htmlImg } from './js/htmlRender';

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
    } catch {
      Notiflix.Notify.error();
      `Error fetch`;
    }

    addImg(arrImg);

    more.addEventListener('click', onMoreClick);
    async function onMoreClick() {
      console.log(sendImg.numberPages);
      sendImg.nextPages();
      console.log(sendImg.numberPages);
      let arrImg = await sendImg.fetchImg(sendImg.metodSend, sendImg.numberPages);
      render.insertAdjacentHTML('beforeend', htmlImg(arrImg.hits).join(''));
    }
  }
  //   // clientMessage(send, sendImg.numberPages);
}

function addImg(arrImg) {
  render.insertAdjacentHTML('beforeend', htmlImg(arrImg.hits).join(''));
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
