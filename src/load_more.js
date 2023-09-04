import {createMarkupInList} from './createMarkup'
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

const perPage = 40;
let currPage = 1;
let valueInput = '';
let lightbox = new SimpleLightbox('.gallery a');
// Оголосіть змінну, яка вказує, чи є ще елементи для завантаження.
let moreElementsAvailable = true;

loadMore.classList.add('is-hidden')

// слухач подій на запит по слову
searchForm.addEventListener('submit', handlerClickOnForm);

//ств запиту на api
async function fetchCards(page, valueInput) {
   const params = new URLSearchParams({
    key: '39154877-9df82b17a56e0efc5c16aca53',
    q: valueInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
      });
 return await axios.get(`${BASE_URL}?${params}`)
   .then((resp) => resp)
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
};

function handlerClickOnForm(evt) {
    evt.preventDefault();//відміна перезагру сторінки
    gallery.innerHTML=''; // зачистка при новому пошуку
  valueInput = evt.target.elements[0].value; // те що ввів клієнт
   currPage = 1; // При новому пошуку повертаємося на першу сторінку
   fetchData()    //  запит на API
}


function fetchData() {
  fetchCards(currPage, valueInput).then((dataResp) => {
    console.log(currPage);
    if (dataResp.data.totalHits >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${dataResp.data.totalHits} images.`);
       const markup = createMarkupInList(dataResp.data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();

      loadMore.classList.remove('is-hidden')

      if (dataResp.data.totalHits <= perPage) {
        loadMore.classList.add('is-hidden')
      }
      } else {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
    }
  })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
}

loadMore.addEventListener("click", handlerLoadMore);

 function handlerLoadMore() {
   if (moreElementsAvailable) {
     currPage += 1;
     fetchCards(currPage, valueInput).then((dataResp) => {

       console.log(currPage);
       console.log(dataResp);//нові елементи ? але приходять повторно перші 40
       console.log(dataResp.data.hits.length);//довжина нових елементів
       if (dataResp.data.hits.length) {
         const markup = createMarkupInList(dataResp.data.hits);
         gallery.insertAdjacentHTML('beforeend', markup);
         lightbox.refresh();
            
         if (perPage > dataResp.data.hits.length) {
           moreElementsAvailable = false;
           loadMore.classList.add('is-hidden')
         }

       }
   
     })
   }
}


// const defaults={
// URL: 'http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg'
// }
// function createMarkupInList(arr) {
//   return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
//     `<a class="gallery_link" href="${largeImageURL || defaults.URL}"><div class="photo-card">
//       <img class='img-card'src="${webformatURL || defaults.URL}" alt="${tags || 'No tags'}" loading="lazy" height= '200px'/>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes: </b>${likes || '-'}
//         </p>
//         <p class="info-item">
//           <b>Views: </b>${views || '-'}
//         </p>
//         <p class="info-item">
//           <b>Comments: </b>${comments || '-'}
//         </p>
//         <p class="info-item">
//           <b>Downloads: </b>${downloads || '-'}
//         </p>
//       </div>
//     </div></a>`
//   ).join('');
// }


