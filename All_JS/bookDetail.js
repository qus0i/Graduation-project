// bookDetail.js - Updated with Newest Sorting and Fade-In Animation

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
  
        const starRating = Array.from({ length: Math.round(rating) }, () => '★').join('');
  
        const bookDetailsContent = `
          <div class="container mt-3 mt-md-5">
            <div class="row">
              <div class="col-12 col-md-5 col-lg-4 mb-4 mb-md-0">
                <div class="text-center text-md-start">
                  <img src="${image}" class="img-fluid rounded shadow-lg" alt="Book cover" style="max-height: 70vh; max-width: 100%; object-fit: contain;">
                </div>
              </div>
              <div class="col-12 col-md-7 col-lg-8">
                <div class="ps-md-4">
                  <h1 class="display-5 display-md-3 mb-2 mb-md-3">${title}</h1>
                  <h2 class="h4 h3-md mb-2 mb-md-3">by ${authors}</h2>
                  <h3 class="h6 mb-3 mb-md-4"><strong>Genre:</strong> ${genre}</h3>
                  <div class="d-flex align-items-center mb-4">
                    <div class="star-rating me-2" aria-label="Rating: ${rating} out of 5 stars">
                      ${starRating}
                    </div>
                    <span class="fs-5">${rating.toFixed(1)}/5.0</span>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="row mt-4 mt-md-5">
              <div class="col-12">
                <h3 class="h4 mb-3 mb-md-4">Description</h3>
                <div class="description-box p-4 rounded-4">
                  <p class="fs-5 fs-md-6 lh-base m-0" style="text-align: justify;">${description}</p>
                </div>
              </div>
            </div>
  
            <h3 class="mt-4 mb-4">Leave a Review</h3>
            <div class="row mt-4 mt-md-5">
              <div class="col-12 rounded-4 mb-5">
                <div class="comment-card border-0 shadow-sm">
                  <div class="comment-card-body">
                    <form id="reviewForm">
                      <div class="mb-0">
                        <textarea id="reviewText" class="form-control comment-bg-1" rows="4" placeholder="Write your review..." required></textarea>
                      </div>
                      <div class="d-flex justify-content-end align-items-center gap-4 mt-2 flex-wrap">
                        <div id="reviewStars" class="d-flex gap-2 fs-2">
                          ${Array.from({ length: 5 }, (_, i) => `<span class="review-star fs-4" data-rating="${i + 1}">★</span>`).join('')}
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
  
            <h3 class="h4 mb-4">User Reviews</h3>
            <div id="userReviews" class="d-flex flex-column gap-4"></div>
          </div>
        `;
  
        document.getElementById('bookDetails').innerHTML = bookDetailsContent;
  
        setupReviewForm();
        fetchComments();
      })
      .catch(error => console.error('Error fetching book details:', error));
  
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
          const formData = new FormData();
          formData.append('username', 'Guest');
          formData.append('rating', selectedRating);
          formData.append('comment', reviewText);
  
          fetch('../All_HTML/comments.php', {
            method: 'POST',
            body: formData
          }).then(response => response.text())
            .then(data => {
              alert('Review submitted successfully!');
              form.reset();
              updateStars(0);
              fetchComments();
            }).catch(error => console.error('Error posting review:', error));
  
        } else {
          alert('Please enter a review and select a rating.');
        }
      });
    }
  
    function fetchComments() {
      fetch('comments.php')
        .then(response => response.json())
        .then(comments => {
          const userReviews = document.getElementById('userReviews');
          // Sort by newest first
          comments.sort((a, b) => b.timestamp - a.timestamp);
          userReviews.innerHTML = comments.slice(0, 4).map(c => generateUserReview(c.username, c.pfpUrl, c.rating, c.comment, c.timestamp)).join('');
  
          // Fade-in effect
          const cards = userReviews.querySelectorAll('.comment-card');
          cards.forEach((card, index) => {
            card.style.opacity = 0;
            setTimeout(() => {
              card.style.transition = "opacity 0.5s ease";
              card.style.opacity = 1;
            }, index * 200);
          });
        })
        .catch(error => console.error('Error fetching comments:', error));
    }
  
    function generateUserReview(username, pfpUrl, rating, comment, timestamp) {
      const stars = Array.from({ length: 5 }, (_, i) => 
        `<span class="review-star ${i < rating ? 'text-warning' : ''}">★</span>`
      ).join('');
  
      const date = new Date(timestamp * 1000);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString(undefined, options);
  
      return `
        <div class="comment-card p-4 rounded-4">
          <div class="d-flex align-items-center mb-3">
            <img src="${pfpUrl}" alt="${username}" class="rounded-circle me-3" style="width: 60px; height: 60px; object-fit: cover;">
            <div>
              <h5 class="mb-1" style="color: var(--color-primary-light);">${username}</h5>
              <div class="d-flex">${stars}</div>
              <div class="small text-muted">${formattedDate}</div>
            </div>
          </div>
          <p style="color: var(--color-primary-light);">${comment}</p>
        </div>
      `;
    }
  });
  