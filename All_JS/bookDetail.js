document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('bookId');

  const apiURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

  fetch(apiURL)
      .then(response => response.json())
      .then(data => {
          const book = data.volumeInfo;
          const title = book.title;
          const authors = book.authors ? book.authors.join(', ') : 'Unknown';
          const description = book.description || 'No description available';
          const image = book.imageLinks ? 
              book.imageLinks.thumbnail.replace('http://', 'https://').replace('zoom=1', 'zoom=3') : 
              'https://via.placeholder.com/400x600';
          const rating = book.averageRating || 0;
          
          // Generate star rating
          const starRating = Array.from({length: 5}, (_, i) => {
              return i < Math.floor(rating) ? '★' : '☆';
          }).join('');

          const bookDetailsContent = `
              <div class="container mt-3 mt-md-5">
                  <div class="row">
                      <!-- Image Column -->
                      <div class="col-12 col-md-5 col-lg-4 mb-4 mb-md-0">
                          <div class="text-center text-md-start">
                              <img src="${image}" 
                                  class="img-fluid rounded shadow-lg" 
                                  alt="Book cover"
                                  style="max-height: 70vh; max-width: 100%; object-fit: contain;">
                          </div>
                      </div>
                      
                      <!-- Details Column -->
                      <div class="col-12 col-md-7 col-lg-8">
                          <div class="ps-md-4">
                              <h1 class="display-5 display-md-3 mb-2 mb-md-3">${title}</h1>
                              <h2 class="h4 h3-md mb-3 mb-md-4">by ${authors}</h2>
                              <div class="d-flex align-items-center mb-4">
                                  <div class="star-rating me-1" aria-label="Rating: ${rating} out of 5 stars">
                                      ${starRating}
                                  </div>
                                  <span class="fs-1">
                                      ${rating.toFixed(1)}/5.0
                                  </span>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <!-- Description Section -->
                  <div class="row mt-4 mt-md-5">
                      <div class="col-12">
                          <h3 class="h4 mb-3 mb-md-4">Description</h3>
                          <p class="fs-5 fs-md-6 lh-base" style="max-width: 1200px; text-align: justify;">
                              ${description}
                          </p>
                      </div>
                  </div>

                  <!-- Comment Section -->
                  <div class="row mt-4 mt-md-5">
                      <div class="col-12">
                          <div class="comment-card border-0 shadow-sm">
                              <div class="comment-card-body">
                                  <h4 class="mb-4">Leave a Review</h4>                         
                                  <!-- Comment Form -->
                                  <form id="reviewForm">
                                      <div class="mb-3">
                                          <textarea class="form-control" 
                                                  rows="4" 
                                                  placeholder="Write your review..."
                                                  required></textarea>
                                      </div>
                                      <!-- Rating Stars -->
                                      <div class="mb-3">
                                          <p class="mb-2">Your Rating:</p>
                                          <div class="d-flex gap-1" id="reviewStars">
                                              ${Array.from({length: 5}, (_, i) => `
                                                  <span class="review-star fs-4" data-rating="${i + 1}">★</span>
                                              `).join('')}
                                          </div>
                                      </div>
                                      <!-- Updated Button with Margins -->
                                      <button type="submit" class="btn btn-primary float-end mt-3 me-3">
                                          Post Review
                                      </button>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          `;

          document.getElementById('bookDetails').innerHTML = bookDetailsContent;
      })
      .catch(error => console.error('Error fetching book details:', error));
});