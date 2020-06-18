import search_form from '../templates/search-form.hbs';
import gallery from '../templates/gallery.hbs';
import debounce from 'lodash.debounce';
import pixabayApi from './apiService';
import image_card from '../templates/image_card.hbs';
// =========================================================
document.body.insertAdjacentHTML('beforeend', search_form());
document.body.insertAdjacentHTML('beforeend', gallery());
// =========================================================
const galleruUl = document.querySelector('.gallery');
// =========================================================
const input = document.querySelector('.image-input');
input.addEventListener('input', debounce(inguiry, 500));
function inguiry(e) {
  galleruUl.innerHTML = '';
  pixabayApi(e.target.value)
    .then(data => {
      const object = data.hits.map(item => image_card(item)).join('');
      galleruUl.innerHTML = object;
    })
    .catch(err => console.warn(err));
}
