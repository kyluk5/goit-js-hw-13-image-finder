import search_form from '../templates/search-form.hbs';
import gallery from '../templates/gallery.hbs';
import image_card from '../templates/image_card.hbs';
import debounce from 'lodash.debounce';
import pixabayApi from './apiService';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
// =========================================================
document.body.insertAdjacentHTML('beforeend', search_form());
document.body.insertAdjacentHTML('beforeend', gallery());
// =========================================================
const galleruUl = document.querySelector('.gallery');
const input = document.querySelector('.image-input');
// =========================================================
input.addEventListener('input', debounce(inguiry, 500));
function inguiry(e) {
  e.preventDefault();
  if (e.target.value === '') {
    debounce((galleruUl.innerHTML = ''), 500);
  }
  pixabayApi(e.target.value)
    .then(data => {
      const object = data.hits.map(item => image_card(item)).join('');
      galleruUl.innerHTML = object;
    })
    .catch(
      error({
        closer: false,
        sticker: false,
        delay: 200,
        remove: true,
        destroy: true,
        text: 'Please enter a more specifically query!',
      }),
    );
}
