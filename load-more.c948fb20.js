function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},t={},i=n.parcelRequired7c6;function s(e){const n="http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg";return e.map((({webformatURL:e,largeImageURL:a,tags:t,likes:i,views:s,comments:r,downloads:o})=>`<a class="gallery_link" href="${a||n}"><div class="photo-card">\n      <img class='img-card'src="${e||n}" alt="${t||"No tags"}" loading="lazy" height= '200px'/>\n      <div class="info">\n        <p class="info-item">\n          <b>Likes: </b>${i||"-"}\n        </p>\n        <p class="info-item">\n          <b>Views: </b>${s||"-"}\n        </p>\n        <p class="info-item">\n          <b>Comments: </b>${r||"-"}\n        </p>\n        <p class="info-item">\n          <b>Downloads: </b>${o||"-"}\n        </p>\n      </div>\n    </div></a>`)).join("")}null==i&&((i=function(e){if(e in a)return a[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return a[e]=i,n.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,n){t[e]=n},n.parcelRequired7c6=i);var r=i("2shzp");async function o(e,n){const a=new URLSearchParams({key:"39154877-9df82b17a56e0efc5c16aca53",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:p});return await r.default.get(`https://pixabay.com/api/?${a}`)}var d=i("7Y9D8"),l=i("fZKcF");const c=document.querySelector(".search-form"),f=document.querySelector(".gallery"),h=document.querySelector(".load-more"),u=document.querySelector(".text"),p=40;let g=1,m="",y=new(e(l))(".gallery a"),w=!0;c.addEventListener("submit",(function(n){if(n.preventDefault(),f.innerHTML="",m=n.target.elements[0].value,g=1,""===m||" "===m)return f.innerHTML="",e(d).Notify.warning("Sorry, you must enter a value.");o(g,m).then((n=>{if(n.data.totalHits>=1){e(d).Notify.success(`Hooray! We found ${n.data.totalHits} images.`);const a=s(n.data.hits);f.insertAdjacentHTML("beforeend",a),y.refresh(),h.classList.replace("is-hidden","no-hidden"),n.data.totalHits<=p&&(h.classList.replace("no-hidden","is-hidden"),u.classList.replace("is-hidden","no-hidden"))}else e(d).Notify.warning("Sorry, there are no images matching your search query. Please try again.")})).catch((n=>e(d).Notify.warning("Sorry, there are no images matching your search query. Please try again."))),u.classList.replace("no-hidden","is-hidden")})),h.addEventListener("click",(function(){w&&(g+=1,h.classList.replace("is-hidden","no-hidden"),u.classList.replace("no-hidden","is-hidden"),o(g,m).then((e=>{if(e.data.hits.length){const n=s(e.data.hits);f.insertAdjacentHTML("beforeend",n),y.refresh(),e.data.hits.length<p&&u.classList.replace("is-hidden","no-hidden"),p>e.data.hits.length&&(w=!1,h.classList.replace("no-hidden","is-hidden"))}})))}));
//# sourceMappingURL=load-more.c948fb20.js.map
