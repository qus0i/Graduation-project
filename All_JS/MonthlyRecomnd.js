document.addEventListener('DOMContentLoaded', function () {
  // Fetch data from Google Books API
  const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40';

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      let carouselContent = '';
      const cardsPerSlide = window.innerWidth < 768 ? (window.innerWidth < 576 ? 1 : 2) : 4;
      
      books.forEach((book, index) => {
        const title = book.volumeInfo.title.length > 30 ? 
          book.volumeInfo.title.substring(0, 30) + '...' : book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? 
          (book.volumeInfo.authors.join(', ').length > 30 ? 
           book.volumeInfo.authors.join(', ').substring(0, 30) + '...' : 
           book.volumeInfo.authors.join(', ')) : 'Unknown';
        const rating = book.volumeInfo.averageRating || 0;
        const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
          
let starRating = '';
for (let i = 1; i <= 5; i++) {
  starRating += `<span
    class="star ${i <= rating ? 'filled' : ''}"
    data-rating="${rating.toFixed(1)}"
  >★</span>`;
}
        if (index % cardsPerSlide === 0) {
          carouselContent += `<div class="carousel-item ${index === 0 ? 'active' : ''}"><div class="row justify-content-center mx-0">`;
        }

        carouselContent += `
          <div class="col-md-3 col-sm-6 px-1">
            <a href="book-detail.html?bookId=${book.id}" class="card-link">
              <div class="card">
                <img src="${image}" class="card-img-top" loading="lazy" alt="${title}">
                <div class="card-body">
                  <h5 class="card-title card-link">${title}</h5>
                  <p class="card-text card-link author">${authors}</p>
                  <div class="stars" data-rating="${rating}">${starRating}</div>
                </div>               
              </div>           
            </a>            
          </div>
        `;

        if ((index + 1) % cardsPerSlide === 0 || index === books.length - 1) {
          carouselContent += '</div></div>';
        }
      });

      document.getElementById('carouselContent').innerHTML = carouselContent;
    })
    .catch(error => console.error('Error fetching data:', error));
});