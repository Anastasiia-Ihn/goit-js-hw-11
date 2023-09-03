
import axios from "axios";
// import {fetchCards} from './fetchAPI'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/style.css'

const BASE_URL = 'https://pixabay.com/api/'

const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')

let currPage = 1;
let valueInput = '';
let lightbox = new SimpleLightbox('.gallery a');

loadMore.classList.add('is-hidden')

// слухач подій на запит по слову
searchForm.addEventListener('submit', handlerClickOnForm);

//ств запиту на api
async function fetchCards(currPage = '1', valueInput) {
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
   .then((resp) => resp)
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
};

function handlerClickOnForm(evt) {
    evt.preventDefault();//відміна перезагру сторінки
    // gallery.innerHTML=''; // зачистка при новому пошуку
  valueInput = evt.target.elements[0].value; // те що ввів клієнт
 
  // fetchCards(currPage, valueInput); //  запит на API
   fetchCards(currPage, valueInput).then((dataResp) => {
    console.log(currPage);
    if (dataResp.data.totalHits >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${dataResp.data.totalHits} images.`);
      
      gallery.insertAdjacentHTML('beforeend', creatMarkupInList(dataResp.data.hits));

       loadMore.classList.remove('is-hidden')
        lightbox.refresh();
  
    } else {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
    }
  })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
}



let page = 1;

loadMore.addEventListener("click", handlerLoadMore);

function handlerLoadMore() {
  page += 1;
  fetchCards(page, valueInput).then((dataResp) => {
    console.log(dataResp.data.hits.length);
    console.log(dataResp.data.totalHits);
    gallery.insertAdjacentHTML('beforeend', creatMarkupInList(dataResp.data.hits));
    // lightbox.refresh();
    
     // знімаємо  клас is-hidden коли якась к-сть ел є на сторінкі до макс
   if (dataResp.data.hits.length) {
        loadMore.classList.remove('is-hidden')
      }
      else { loadMore.classList.add('is-hidden') }
  })
    
}


const defaults={
URL: 'http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg'
}
function creatMarkupInList(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<a class="gallery_link" href="${largeImageURL || defaults.URL}"><div class="photo-card">
      <img class='img-card'src="${webformatURL || defaults.URL}" alt="${tags}" loading="lazy" height= '200px'/>
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
}





