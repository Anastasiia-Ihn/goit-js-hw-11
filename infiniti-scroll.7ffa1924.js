function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=r.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){n[e]=r},r.parcelRequired7c6=a);var o=a("g4lwF"),i=a("623hn"),s=a("7Y9D8"),c=a("fZKcF");const u=document.querySelector(".search-form"),l=document.querySelector(".gallery"),d=document.querySelector(".js-guard");let f=1,h="",y=new(e(c))(".gallery a");const g=new IntersectionObserver((function(r){r.forEach((r=>{console.log(r),r.isIntersecting&&(f+=1,(0,i.fetchCards)(f,h).then((r=>{const t=(0,o.createMarkupInList)(r.data.hits);l.insertAdjacentHTML("beforeend",t),y.refresh(),r.data.totalHits<=l.children.length&&(e(s).Notify.info("We're sorry, but you've reached the end of search results."),g.unobserve(d))})).catch((r=>e(s).Notify.warning("Sorry, there are no images matching your search query. Please try again."))))}))}),{rootMargin:"500px"});u.addEventListener("submit",(function(r){if(r.preventDefault(),l.innerHTML="",h=r.target.elements[0].value,f=1,""===h||" "===h)return l.innerHTML="",e(s).Notify.warning("Sorry, you must enter a value.");(0,i.fetchCards)(f,h).then((r=>{if(r.data.totalHits>=1){e(s).Notify.success(`Hooray! We found ${r.data.totalHits} images.`);const t=(0,o.createMarkupInList)(r.data.hits);l.insertAdjacentHTML("beforeend",t),y.refresh(),g.observe(d)}})).catch((r=>e(s).Notify.warning("Sorry, there are no images matching your search query. Please try again.")))}));
//# sourceMappingURL=infiniti-scroll.7ffa1924.js.map