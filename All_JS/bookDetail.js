// bookDetail.js - Updated

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
        const genre = book.categories ? book.categories.join(', ') : 'Unknown Genre';
  
        // Generate star rating
        const starRating = Array.from({ length: Math.round(rating) }, () => '★').join('');
  
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
                  <h1 class="display-5 display-md-3 mb-2 mb-md-3 ">${title}</h1>
                  <h2 class="h4 h3-md mb-2 mb-md-3">by ${authors}</h2>
                  <h3 class="h6 mb-3 mb-md-4"><strong>Genre:</strong> ${genre}</h3>
                  <div class="d-flex align-items-center mb-4">
                    <div class="star-rating me-2" aria-label="Rating: ${rating} out of 5 stars">
                      ${starRating}
                    </div>
                    <span class="fs-5">★
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
              <div class="description-box p-4 rounded-4">
  <p class="fs-5 fs-md-6 lh-base m-0" style="text-align: justify;">
    ${description}
  </p>
</div>
              </div>
            </div>
            <!-- Comment Section -->
               <h3 class="mt-4 mb-4">Leave a Review</h3>
            <div class="row mt-4 mt-md-5">
              <div class="col-12  rounded-4 mb-5">
                <div class="comment-card  border-0 shadow-sm pt-5 pb-0">
                  <div class="comment-card-body">
                 
                    <!-- Comment Form -->
                    <form id="reviewForm">
<div class="mb-0">
  <textarea id="reviewText" class="form-control comment-bg-1" rows="4" placeholder="Write your review..." required></textarea>
</div>

                      <!-- Rating Stars -->
                      <div class="mb-3">
                            <!-- Rating Stars + Submit Button -->
<div class="d-flex justify-content-end align-items-center gap-4 mt-2 flex-wrap pb-2">

  <div id="reviewStars" class="d-flex gap-2 fs-2 ">
        ${Array.from({ length: 5 }, (_, i) => `
        <span class="review-star fs-4" data-rating="${i + 1}">★</span>
        `).join('')}
  </div>
    <button type="submit" class="btn p-1 d-flex align-items-center justify-content-center" style="height: 3.5rem; width: 3.5rem;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F9C172" width="28" height="28">
      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
    </svg>
  </button>
</div>

                    </form>
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        `;
  
        document.getElementById('bookDetails').innerHTML = bookDetailsContent;
  
        // Add functionality after content is injected
        setupReviewForm();
      })
      .catch(error => console.error('Error fetching book details:', error));
  
    // Setup star functionality and form submit
    function setupReviewForm() {
      let selectedRating = 0;
  
      const stars = document.querySelectorAll('.review-star');
      const form = document.getElementById('reviewForm');
  
      stars.forEach(star => {
        star.addEventListener('click', function () {
          selectedRating = parseInt(this.getAttribute('data-rating'));
          updateStars(selectedRating);
        });
      });
  
      function updateStars(rating) {
        stars.forEach(star => {
          if (parseInt(star.getAttribute('data-rating')) <= rating) {
            star.classList.add('text-warning');
          } else {
            star.classList.remove('text-warning');
          }
        });
      }
  
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const reviewText = document.getElementById('reviewText').value.trim();
        if (reviewText && selectedRating > 0) {
          alert(`Review Submitted!\nRating: ${selectedRating} Stars\nComment: ${reviewText}`);
          form.reset();
          updateStars(0);
        } else {
          alert('Please enter a review and select a rating.');
        }
      });
    }
  });
  