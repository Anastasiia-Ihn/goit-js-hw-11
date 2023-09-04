
export function createMarkupInList(arr) {
    const defaults={
URL: 'http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg'
    }
    
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<a class="gallery_link" href="${largeImageURL || defaults.URL}"><div class="photo-card">
      <img class='img-card'src="${webformatURL || defaults.URL}" alt="${tags || 'No tags'}" loading="lazy" height= '200px'/>
      <div class="info">
        <p class="info-item">
          <b>Likes: </b>${likes || '-'}
        </p>
        <p class="info-item">
          <b>Views: </b>${views || '-'}
        </p>
        <p class="info-item">
          <b>Comments: </b>${comments || '-'}
        </p>
        <p class="info-item">
          <b>Downloads: </b>${downloads || '-'}
        </p>
      </div>
    </div></a>`
  ).join('');
}