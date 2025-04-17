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
          const rating = book.volumeInfo.averageRating || 'No Rating';
          const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
  
          // Create a new carousel item for every 4 cards
          if (index % 4 === 0) {
            carouselContent += `<div class="carousel-item ${index === 0 ? 'active' : ''}"><div class="row justify-content-center">`;
          }
  
          carouselContent += `  
            <div class="col-md-3">
              <div class="card" style="height:400px ;">
                <img src="${image}" class="card-img-top" alt="Book Image">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${authors}</p>
                  <p class="card-text">Rating: ${rating}</p>
                </div>
              </div>
            </div>
          `;
  
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
  