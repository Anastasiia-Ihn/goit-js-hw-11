import axios from "axios";
import Notiflix from 'notiflix';

const axios = require('axios');
const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const BASE_URL = 'https://pixabay.com/api/'

searchForm.addEventListener('submit', handlerClickOnForm)

function handlerClickOnForm(evt, currentPage) {
    evt.preventDefault();
    gallery.innerHTML='';
    const valueInput = evt.target.elements[0].value;

    async function findCards() {

   const params = new URLSearchParams({
    key: '39154877-9df82b17a56e0efc5c16aca53',
    q: valueInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 40,
      });

        // const resp = axios.get(`${BASE_URL}?${params}`)
        await axios.get(`${BASE_URL}?${params}`).then((resp)=> {
            gallery.insertAdjacentHTML('beforeend',creatMarkupInList(resp.data.hits ))
        }

        ).catch((_)=> Notiflix.Notify.warning('"Sorry, there are no images matching your search query. Please try again."'))


              }
findCards()

}

function creatMarkupInList(arr){
  return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>  `<div class="photo-card">
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
    </div>`).join('')
    }

    // gallery.innerHTML =




