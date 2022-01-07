export function feathcImg(send) {
  const key = '25142623-5ec88ba8c20545ff15079e1b4';
  const url = `https://pixabay.com/api/?key=25142623-5ec88ba8c20545ff15079e1b4&q=${send}`;
  return fetch(url).then(res => res.json());
}
