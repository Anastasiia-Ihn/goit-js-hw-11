import {createMarkupInList} from '../createMarkup'
// import axios from "axios";
import {fetchCards} from './fetchAPI-LMore'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import '../../css/style.css'

const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')

const perPage = 40;
let currPage = 1;
export {perPage}
let valueInput = '';
let lightbox = new SimpleLightbox('.gallery a');
// Оголосіть змінну, яка вказує, чи є ще елементи для завантаження.
let moreElementsAvailable = true;

loadMore.classList.add('is-hidden')

// слухач подій на запит по слову
searchForm.addEventListener('submit', handlerClickOnForm);


function handlerClickOnForm(evt) {
    evt.preventDefault();//відміна перезагру сторінки
    gallery.innerHTML=''; // зачистка при новому пошуку
  valueInput = evt.target.elements[0].value; // те що ввів клієнт
   currPage = 1; // При новому пошуку повертаємося на першу сторінку
   
    if ((valueInput === '') || (valueInput === ' ')) {
    
    gallery.innerHTML = '';
    loadMore.classList.add('is-hidden')
    return Notiflix.Notify.warning(`Sorry, you must enter a value.`);
  }
  
  fetchData()    //  запит на API
}


function fetchData() {
  fetchCards(currPage, valueInput).then((dataResp) => {

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

         if (dataResp.data.hits.length) {
         const markup = createMarkupInList(dataResp.data.hits);
         gallery.insertAdjacentHTML('beforeend', markup);
         lightbox.refresh();
            
         if (perPage > dataResp.data.hits.length) {
           moreElementsAvailable = false;
           loadMore.classList.add('is-hidden');
           Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
         }

       }
   
     })
   }
}
