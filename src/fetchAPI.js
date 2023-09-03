import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'
//ств запиту на api
export async function fetchCards(currPage = '1', valueInput = '') {
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