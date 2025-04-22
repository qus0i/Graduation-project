document.addEventListener('DOMContentLoaded', function () {
  // Fetch data from Google Books API
  const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40';

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      let carouselContent = '';
      books.forEach((book, index) => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
        const rating = book.volumeInfo.averageRating || 0; // Rating value
        const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

        // Create the star rating (5 stars max)
        /*let starRating = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starRating += '<span class="star filled">★</span>';
            } else {
                starRating += '<span class="star">★</span>';
            }
        }*/
            let starRating = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    starRating += `<span class="star filled" data-rating="${i}">★</span>`;
                } else {
                    starRating += `<span class="star" data-rating="${i}">★</span>`;
                }
            }
        // Create a new carousel item for every 4 cards
        if (index % 4 === 0) {
          carouselContent += `<div class="carousel-item ${index === 0 ? 'active' : ''}"><div class="row justify-content-center">`;
        }

        carouselContent += `
          <div class="col-md-3">
            <a href="book-detail.html?bookId=${book.id}" class="card-link">
              <div class="card" style="height:400px;">
                <img src="${image}" class="card-img-top" alt="Book Image">
                <div class="card-body">
                  <h5 class="card-title card-link">${title}</h5>
                  <p class="card-text card-link">${authors}</p>
                  <div class="stars" data-rating="${rating}">${starRating}
          </div>
                  
                </div>
              </div>
            </a>
          </div>
        `;
/*// Add data-rating to the parent .stars container
carouselContent += `
  <div class="col-md-3">
    <a href="book-detail.html?bookId=${book.id}" class="card-link">
      <div class="card" style="height:400px;">
        <img src="${image}" class="card-img-top" alt="Book Image">
        <div class="card-body">
          <h5 class="card-title card-link">${title}</h5>
          <p class="card-text card-link">${authors}</p>
        <div class="card-footer">
          <div class="stars" data-rating="${rating}">
            ${starRating}
          </div>
        </div>
      </div>
    </a>
  </div>
`; */
        // Close the row after every 4 cards
        if ((index + 1) % 4 === 0 || index === books.length - 1) {
          carouselContent += '</div></div>';
        }
      });

      // Insert generated content into the carousel inner
      document.getElementById('carouselContent').innerHTML = carouselContent;
    })
    .catch(error => console.error('Error fetching data:', error));
});
