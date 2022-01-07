export function feathcImg(send, numberPages) {
  const key = '25142623-5ec88ba8c20545ff15079e1b4';
  const url = `https://pixabay.com/api/?key=25142623-5ec88ba8c20545ff15079e1b4&q=${send}&orientation=horizontal&safesearch=true&image_type=photo&page=${numberPages}&per_page=40`;
  return fetch(url).then(res => res.json());
}
