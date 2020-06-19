import search_form from '../templates/search-form.hbs';
import gallery from '../templates/gallery.hbs';
import image_card from '../templates/image_card.hbs';
import loadMore from '../templates/loadMore.hbs';
import debounce from 'lodash.debounce';
import pixabayApi from './apiService';
// =========================================================
document.body.insertAdjacentHTML('beforeend', search_form());
document.body.insertAdjacentHTML('beforeend', gallery());
document.body.insertAdjacentHTML('beforeend', loadMore());
// =========================================================
const galleruUl = document.querySelector('.gallery');
const input = document.querySelector('.image-input');
// =========================================================
input.addEventListener('input', debounce(inguiry, 500));
// =========================================================
function inguiry(e) {
  e.preventDefault();
  galleruUl.innerHTML = '';
  if (e.target.value === '') {
    document.querySelector('.load_more').classList.add('hidden');
    return;
  }
  pixabayApi([e.target.value], [])
    .then(data => {
      const object = data.hits.map(item => image_card(item)).join('');
      galleruUl.insertAdjacentHTML('beforeend', object);
      if (data.total > 0) {
        document.querySelector('.load_more').classList.remove('hidden');
      }
    })
    .catch(err => console.warn(err));
}
