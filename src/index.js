import './css/styles.css';
import axios from 'axios';
import { clientMessage } from './js/messageNotify';

const render = document.querySelector('#render');
const more = document.querySelector('.load-more');
document.querySelector('#search-form').addEventListener('submit', onFetchForm);
let numberPages = 1;

function onFetchForm(e) {
  e.preventDefault();
  const send = document.querySelector('#inputimg').value;
  console.log(send);
  numberPages = 1;
  more.addEventListener('click', onMoreClick);
  clientMessage(send, numberPages);
}
function onMoreClick() {
  numberPages += 1;
  clientMessage(send, numberPages);
}
