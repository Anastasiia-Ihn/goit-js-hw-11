function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=n.parcelRequired7c6;function o(e){const n="http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg";return e.map((({webformatURL:e,largeImageURL:t,tags:a,likes:r,views:o,comments:i,downloads:s})=>`<a class="gallery_link" href="${t||n}"><div class="photo-card">\n      <img class='img-card'src="${e||n}" alt="${a||"No tags"}" loading="lazy" height= '200px'/>\n      <div class="info">\n        <p class="info-item">\n          <b>Likes: </b>${r||"-"}\n        </p>\n        <p class="info-item">\n          <b>Views: </b>${o||"-"}\n        </p>\n        <p class="info-item">\n          <b>Comments: </b>${i||"-"}\n        </p>\n        <p class="info-item">\n          <b>Downloads: </b>${s||"-"}\n        </p>\n      </div>\n    </div></a>`)).join("")}null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){a[e]=n},n.parcelRequired7c6=r);var i=r("2shzp");async function s(e,n){const t=new URLSearchParams({key:"39154877-9df82b17a56e0efc5c16aca53",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:g});return await i.default.get(`https://pixabay.com/api/?${t}`)}var c=r("7Y9D8"),l=r("fZKcF");const d=document.querySelector(".search-form"),f=document.querySelector(".gallery"),u=document.querySelector(".js-guard"),g=40;let h=1,p="",m=new(e(l))(".gallery a");const y=new IntersectionObserver((function(n){n.forEach((n=>{n.isIntersecting&&(h+=1,s(h,p).then((n=>{const t=o(n.data.hits);f.insertAdjacentHTML("beforeend",t),m.refresh(),n.data.totalHits<=f.children.length&&(e(c).Notify.info("We're sorry, but you've reached the end of search results."),y.unobserve(u))})).catch((n=>e(c).Notify.warning("Sorry, there are no images matching your search query. Please try again."))))}))}),{rootMargin:"800px"});d.addEventListener("submit",(function(n){if(n.preventDefault(),f.innerHTML="",p=n.target.elements[0].value,h=1,""===p||" "===p)return f.innerHTML="",e(c).Notify.warning("Sorry, you must enter a value.");s(h,p).then((n=>{if(n.data.totalHits>=1){e(c).Notify.success(`Hooray! We found ${n.data.totalHits} images.`);const t=o(n.data.hits);f.insertAdjacentHTML("beforeend",t),m.refresh(),y.observe(u)}})).catch((n=>e(c).Notify.warning("Sorry, there are no images matching your search query. Please try again.")))}));
//# sourceMappingURL=infiniti-scroll.2c574d86.js.map
