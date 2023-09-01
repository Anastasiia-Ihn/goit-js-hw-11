import axios from "axios";
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')
const backdropEl = document.querySelector('.backdrop')
const modalEl = document.querySelector('.modal')
let valueInput = '';

const BASE_URL = 'https://pixabay.com/api/'



async function fetchCards(currPage='1',valueInput) {

   const params = new URLSearchParams({
    key: '39154877-9df82b17a56e0efc5c16aca53',
    q: valueInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currPage,
    per_page: 40,
      });

        // const resp = axios.get(`${BASE_URL}?${params}`)
  return await axios.get(`${BASE_URL}?${params}`)
    .then((resp) => { return resp })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
};
renderFirstPage(currPage,valueInput)

function renderFirstPage(currPage, valueInput) {
 
  fetchCards(currPage, valueInput).then((data) => {
    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
    creatMarkupInList(data.data.hits);
    pagination.reset(data.data.totalHits);
  }).catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
  
}

function renderEvt(currPage, valueInput) {
 
  fetchCards(currPage, valueInput).then((data) => creatMarkupInList(data.data.hits))
  .catch ((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
  
}

function creatMarkupInList(arr){
  const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
      <img class='img-card'src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b>${likes || '-'}
        </p>
        <p class="info-item">
          <b>Views:</b>${views || '-'}
        </p>
        <p class="info-item">
          <b>Comments:</b>${comments || '-'}
        </p>
        <p class="info-item">
          <b>Downloads:</b>${downloads || '-'}
        </p>
      </div>
    </div>`).join('')}





searchForm.addEventListener('submit', handlerClickOnForm)

 function handlerClickOnForm(evt) {
    evt.preventDefault();
    // gallery.innerHTML='';
  valueInput = evt.target.elements[0].value;
    
// fetchCards(currentPage,valueInput)
  renderFirstPage(currPage, valueInput);
}