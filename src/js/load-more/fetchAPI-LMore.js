import axios from "axios";
import { perPage } from './load_more';

const BASE_URL = 'https://pixabay.com/api/';

//ств запиту на api
export async function fetchCards(page, valueInput) {

   const params = new URLSearchParams({
    key: '39154877-9df82b17a56e0efc5c16aca53',
    q: valueInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
      });
 
  const resp = await axios.get(`${BASE_URL}?${params}`);
  return resp
  //  .then((resp) => resp)
  //   .catch((_) => Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'))
};





