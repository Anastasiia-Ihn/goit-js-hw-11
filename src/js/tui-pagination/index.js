
import axios from "axios";
import Notiflix from 'notiflix';
import { pagination } from './pagination';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import '../../css/style.css'

const BASE_URL = 'https://pixabay.com/api/'
const currPage = pagination.getCurrentPage();
const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const tuiPagination = document.querySelector('.tui-pagination')
let valueInput = '';
let lightbox = new SimpleLightbox('.gallery a');

tuiPagination.classList.add('is-hidden')// ховаємо пагінацію

// слухач подій на запит по слову
searchForm.addEventListener('submit', handlerClickOnForm);

function handlerClickOnForm(evt) {
    evt.preventDefault();//відміна перезагруж сторінки
    gallery.innerHTML=''; // зачистка при новому пошуку
  valueInput = evt.target.elements[0].value; // те що ввів клієнт

  if ((valueInput === '') || (valueInput === ' ')) {
    
    gallery.innerHTML = '';
    tuiPagination.classList.add('is-hidden')
    return Notiflix.Notify.warning(`Sorry, you must enter a value.`);
  }
  renderFirstPage(currPage, valueInput); //  запит на API
  lightbox.refresh();
}

//ств запиту на api
async function fetchCards(currPage, valueInput) {
   const params = new URLSearchParams({
    key: '39154877-9df82b17a56e0efc5c16aca53',
    q: valueInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currPage,
    per_page: 40,
      });
 return await axios.get(`${BASE_URL}?${params}`)
    .then((resp) => { return resp })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
};

//ств запиту на основі ф-ї fetchCards
function renderFirstPage(currPage, valueInput) {
  
  fetchCards(currPage, valueInput).then((data) => {
    if (data.data.totalHits >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
    tuiPagination.classList.remove('is-hidden')// вкл пагінацію
    } else {
tuiPagination.classList.add('is-hidden')// вкл пагінацію
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
    }
    creatMarkupInList(data.data.hits);// відмальовка списку даних з запиту
    pagination.reset(data.data.totalHits); // підключення пагінації(к-сть сторінок)
  }).catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
}

// запит на api(ств інших строрінок)
function renderEvt(currPage, valueInput) {
  fetchCards(currPage, valueInput).then((data) => creatMarkupInList(data.data.hits))
  .catch ((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
}

function creatMarkupInList(arr) {
  const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<a class="gallery_link" href="${largeImageURL}"><div class="photo-card">
      <img class='img-card'src="${webformatURL}" alt="${tags}" loading="lazy" height= '200px'/>
      <div class="info">
        <p class="info-item">
          <b>Likes: </b>${likes || '-'}
        </p>
        <p class="info-item">
          <b>Views: </b>${views || '-'}
        </p>
        <p class="info-item">
          <b>Comments: </b>${comments || '-'}
        </p>
        <p class="info-item">
          <b>Downloads: </b>${downloads || '-'}
        </p>
      </div>
    </div></a>`
  ).join('');
  gallery.innerHTML = markup;
  lightbox.refresh();
}
//активізація пагінації наступних стрінок
pagination.on('afterMove', (event) => {
    const currentPage = event.page;
    renderEvt(currentPage, valueInput)
});