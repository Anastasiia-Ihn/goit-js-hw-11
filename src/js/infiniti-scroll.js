import {createMarkupInList} from './createMarkup'
// import axios from "axios";
import {fetchCardsAll} from './fetchAPI-infinitiScroll'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import '../css/style.css'

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const guardEl = document.querySelector('.js-guard');
const textEl = document.querySelector('.text');


const perPage = 40;
let currPage = 1;
export {perPage}
let valueInput = '';
let lightbox = new SimpleLightbox('.gallery a');

const options = {
  rootMargin: "800px",
};
const observer = new IntersectionObserver(handlerLoadMore, options);

// слухач подій на запит по слову
searchForm.addEventListener('submit', handlerClickOnForm);

function fetchData() {
  fetchCardsAll(currPage, valueInput).then((dataResp) => {

    if (dataResp.data.totalHits >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${dataResp.data.totalHits} images.`);
       const markup = createMarkupInList(dataResp.data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
        observer.observe(guardEl);
    } else {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
    }
  })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
}
function handlerClickOnForm(evt) {
    evt.preventDefault();//відміна перезагру сторінки
    gallery.innerHTML=''; // зачистка при новому пошуку
  valueInput = evt.target.elements[0].value; // те що ввів клієнт
   currPage = 1; // При новому пошуку повертаємося на першу сторінку
   
    if ((valueInput === '') || (valueInput === ' ')) {
    gallery.innerHTML = '';
    return Notiflix.Notify.warning(`Sorry, you must enter a value.`);
  }
    fetchData()    //  запит на API
}



function handlerLoadMore(entries) {
    entries.forEach((entry) => { 
        if (entry.isIntersecting) {
            currPage += 1;
               textEl.classList.replace('no-hidden', 'is-hidden');

            fetchCardsAll(currPage, valueInput).then((dataResp) => {

       const markup = createMarkupInList(dataResp.data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();

              if (dataResp.data.totalHits === gallery.children.length) {
                          textEl.classList.replace('is-hidden', 'no-hidden');

            observer.unobserve(guardEl);
                };
  })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))

        }
    })
}