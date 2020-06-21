import search_form from '../templates/search-form.hbs';
import gallery from '../templates/gallery.hbs';
import image_card from '../templates/image_card.hbs';
import loadMore from '../templates/loadMore.hbs';
import debounce from 'lodash.debounce';
import pixabayApi from './apiService';
import scrollDown from './scrollDown';
// =========================================================
document.body.insertAdjacentHTML('beforeend', search_form());
document.body.insertAdjacentHTML('beforeend', gallery());
document.body.insertAdjacentHTML('beforeend', loadMore());
// =========================================================
const galleruUl = document.querySelector('.gallery');
const input = document.querySelector('.image-input');
const more = document.querySelector('.load_more');
// =========================================================
input.addEventListener('input', debounce(inguiry, 500));
more.addEventListener('click', load_more);
more.addEventListener('click', debounce(scrollDown, 500));
// ==============================counter==================================
let Counter = function () {
  let i = 1;
  return function () {
    return (i += 1);
  };
};

let counter = Counter();
// =======================reguest_information=============================
function inguiry(e) {
  e.preventDefault();
  counter = Counter();
  galleruUl.innerHTML = '';
  if (e.target.value === '') {
    document.querySelector('.load_more').classList.add('hidden');
    return;
  }
  pixabayApi(input.value)
    .then(data => {
      const object = data.hits.map(item => image_card(item)).join('');
      galleruUl.insertAdjacentHTML('beforeend', object);
      if (data.total > 0) {
        document.querySelector('.load_more').classList.remove('hidden');
      }
      if (data.total === 0) {
        document.querySelector('.load_more').classList.add('hidden');
      }
    })
    .catch(err => console.warn(err));
}
// ========================more_informatin=================================
function load_more() {
  pixabayApi(input.value, [counter()]).then(data => {
    let load = data.hits.map(item => image_card(item)).join('');
    galleruUl.insertAdjacentHTML('beforeend', load);
    if (data.total > 0) {
      document.querySelector('.load_more').classList.remove('hidden');
    }
    if (data.total === 0) {
      document.querySelector('.load_more').classList.add('hidden');
    }
  });
}
