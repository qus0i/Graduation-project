document.addEventListener('DOMContentLoaded', function () {
  const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40';

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      let recommendationContent = '';
      const cardsPerSlide = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 4;

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
          starRating += `<span class="star ${i <= rating ? 'filled' : ''}" data-rating="${rating.toFixed(1)}">★</span>`;
        }

        if (index % cardsPerSlide === 0) {
          recommendationContent += `<div class="carousel-item ${index === 0 ? 'active' : ''}"><div class="row justify-content-center mx-0">`;
        }

        recommendationContent += `
          <div class="col-lg-3 col-md-6 col-sm-12 px-1">
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
          recommendationContent += '</div></div>';
        }
      });

      document.getElementById('recommendationContent').innerHTML = recommendationContent;

      // Adjust buttons for mobile and tablet
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;

      const prevButton = document.querySelector(".carousel-control-prev");
      const nextButton = document.querySelector(".carousel-control-next");

      if (isMobile || isTablet) {
        prevButton.classList.add("d-none");
        nextButton.classList.add("d-none");
        document.querySelector(".mobile-nav-buttons").classList.remove("d-none");
      } else {
        prevButton.classList.remove("d-none");
        nextButton.classList.remove("d-none");
        document.querySelector(".mobile-nav-buttons").classList.add("d-none");
      }
    })
    .catch(error => console.error('Error fetching data:', error));
});
