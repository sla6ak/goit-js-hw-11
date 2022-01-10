import './css/styles.css';
// import axios from 'axios';
import { SendImg } from './js/classOOP';
import { addImg } from './js/htmlRender';
import Notiflix from 'notiflix';
import { scroll } from './js/scroll';
import { remove } from './js/htmlRemove';

const render = document.querySelector('#render');
const more = document.querySelector('.load-more');
document.querySelector('#search-form').addEventListener('submit', onFetchForm);
let arrImg = [];

const sendImg = new SendImg();

async function onFetchForm(e) {
  e.preventDefault();
  more.classList.remove('opasity');
  let valueInput = document.querySelector('#inputimg').value;
  if (valueInput === '') {
    remove(render);
  } else {
    remove(render);
    sendImg.startPages();
    sendImg.metodSend = valueInput;
    try {
      arrImg = await sendImg.fetchImg(sendImg.metodSend, sendImg.numberPages);
      console.log(arrImg);
      addImg(arrImg);
      if (arrImg.totalHits === 0) {
        Notiflix.Notify.warning(`Hooray! We found ${arrImg.totalHits} images.`);
      } else {
        Notiflix.Notify.success(`Hooray! We found ${arrImg.totalHits} images.`);
      }
    } catch {
      Notiflix.Notify.error('Error catch');
    }
    if (arrImg.totalHits > sendImg.pages) {
      // кнопка показать больше появляеться только в том случае если изображений в массиве больше чем предусмотренно за один рендер галереи
      more.classList.add('opasity');
      // мы слушаем кнопку только после того как она появляеться
      more.addEventListener('click', onMoreClick);
      async function onMoreClick() {
        sendImg.nextPages();
        try {
          arrImg = await sendImg.fetchImg(sendImg.metodSend, sendImg.numberPages);
          addImg(arrImg);
          scroll();

          if (arrImg.totalHits / sendImg.pages > sendImg.numberPages) {
            Notiflix.Notify.success(`Hooray! We found more ${sendImg.pages} images.`);
          } else {
            Notiflix.Notify.success(
              `Hooray! We found more ${
                arrImg.totalHits - sendImg.pages * sendImg.numberPages
              } images.`,
            );
          }
        } catch {
          Notiflix.Notify.error('Error catch');
        }
      }
    }
  }
  //   // clientMessage(send, sendImg.numberPages);
}

// **************************************************
