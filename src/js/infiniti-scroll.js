import {createMarkupInList} from './createMarkup'
// import axios from "axios";
import fetchCards from './load-more/fetchAPI-LMore'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import '../css/style.css'

const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const guardEl = document.querySelector('.js-guard');

const perPage = 40;
let currPage = 1;
export {perPage}
let valueInput = '';
let lightbox = new SimpleLightbox('.gallery a');

const options = {
  rootMargin: "500px",
};
const observer = new IntersectionObserver(handlerLoadMore, options);

// слухач подій на запит по слову
searchForm.addEventListener('submit', handlerClickOnForm);

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

function fetchData() {
  fetchCards(currPage, valueInput).then((dataResp) => {

    if (dataResp.data.totalHits >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${dataResp.data.totalHits} images.`);
       const markup = createMarkupInList(dataResp.data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
        observer.observe(guardEl);
    }
  })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
}

function handlerLoadMore(entries) {
    entries.forEach((entry) => { 
        console.log(entry);
        if (entry.isIntersecting) {
            currPage += 1;
          
            fetchCards(currPage, valueInput).then((dataResp) => {

       const markup = createMarkupInList(dataResp.data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();

                if (dataResp.data.totalHits <= gallery.children.length) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
            observer.unobserve(guardEl);
                };
  })
    .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))

        }
    })
}