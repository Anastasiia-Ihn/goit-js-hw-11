!function(){function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=r.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){n[e]=r},r.parcelRequired7c6=a);var o=a("9XBOy"),i=a("4rJx5"),u=a("6JpON"),s=a("5IjG7"),c=document.querySelector(".search-form"),f=document.querySelector(".gallery"),l=document.querySelector(".js-guard"),d=1,y="",h=new(e(s))(".gallery a"),g=new IntersectionObserver((function(r){r.forEach((function(r){console.log(r),r.isIntersecting&&(d+=1,(0,i.fetchCards)(d,y).then((function(r){var t=(0,o.createMarkupInList)(r.data.hits);f.insertAdjacentHTML("beforeend",t),h.refresh(),r.data.totalHits<=f.children.length&&(e(u).Notify.info("We're sorry, but you've reached the end of search results."),g.unobserve(l))})).catch((function(r){return e(u).Notify.warning("Sorry, there are no images matching your search query. Please try again.")})))}))}),{rootMargin:"500px"});c.addEventListener("submit",(function(r){if(r.preventDefault(),f.innerHTML="",y=r.target.elements[0].value,d=1,""===y||" "===y)return f.innerHTML="",e(u).Notify.warning("Sorry, you must enter a value.");(0,i.fetchCards)(d,y).then((function(r){if(r.data.totalHits>=1){e(u).Notify.success("Hooray! We found ".concat(r.data.totalHits," images."));var t=(0,o.createMarkupInList)(r.data.hits);f.insertAdjacentHTML("beforeend",t),h.refresh(),g.observe(l)}})).catch((function(r){return e(u).Notify.warning("Sorry, there are no images matching your search query. Please try again.")}))}))}();
//# sourceMappingURL=infiniti-scroll.ea2fe2e4.js.map
