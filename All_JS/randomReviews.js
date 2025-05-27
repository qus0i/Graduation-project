// Cache for book data to avoid repeated API calls
const bookDataCache = new Map();
let selectedComments = [];
let currentIndex = 0;
let isAnimating = false;
let nextCommentPreloaded = null;

// Function to fetch random comments from the server (PHP)
async function fetchComments() {
  try {
    const response = await fetch('../PHP/fetchRandomReviews.php');
    const comments = await response.json();
    
    if (comments.length === 0) {
      console.log("No comments available.");
      return;
    }

    selectedComments = comments.sort((a, b) => b.timestamp - a.timestamp);
    currentIndex = 0;
    
    // Display the first comment
    await displayComment(selectedComments[currentIndex]);
    
    // Preload the next comment
    if (selectedComments.length > 1) {
      preloadNextComment();
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

// Preload the next comment's data
async function preloadNextComment() {
  const nextIndex = (currentIndex + 1) % selectedComments.length;
  const nextComment = selectedComments[nextIndex];
  
  try {
    // Check cache first
    if (!bookDataCache.has(nextComment.bookId)) {
      const apiURL = `https://www.googleapis.com/books/v1/volumes/${nextComment.bookId}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      bookDataCache.set(nextComment.bookId, data);
    }
    
    // Also preload images
    if (nextComment.pfpUrl) {
      const pfpImg = new Image();
      pfpImg.src = nextComment.pfpUrl;
    }
    
    nextCommentPreloaded = nextComment;
  } catch (error) {
    console.error('Error preloading next comment:', error);
  }
}

// Function to display the selected comment with flip animation
async function displayComment(comment) {
  if (isAnimating) return;
  isAnimating = true;
  
  const cardInner = document.querySelector('.card-inner');
  
  // Start flip animation
  cardInner.classList.add('card-flip');
  
  // Wait for flip to complete halfway
  await new Promise(resolve => setTimeout(resolve, 200));
  
  try {
    // Check cache first
    let bookData = bookDataCache.get(comment.bookId);
    
    if (!bookData) {
      const apiURL = `https://www.googleapis.com/books/v1/volumes/${comment.bookId}`;
      const response = await fetch(apiURL);
      bookData = await response.json();
      bookDataCache.set(comment.bookId, bookData);
    }
    
    const book = bookData.volumeInfo;
    
    // Remove skeleton classes
    document.getElementById('bookImage').classList.remove('skeleton', 'skeleton-image');
    document.getElementById('pfp').classList.remove('skeleton', 'skeleton-pfp');
    document.getElementById('username').classList.remove('skeleton', 'skeleton-text');
    document.getElementById('timestamp').classList.remove('skeleton', 'skeleton-text');
    document.getElementById('reviewText').classList.remove('skeleton', 'skeleton-text');
    document.getElementById('bookTitle').classList.remove('skeleton', 'skeleton-text');
    document.getElementById('author').classList.remove('skeleton', 'skeleton-text');
    document.getElementById('genre').classList.remove('skeleton', 'skeleton-text');
    document.getElementById('bookRating').classList.remove('skeleton', 'skeleton-text');
    
    // Update DOM elements
    document.getElementById('reviewText').textContent = comment.comment;
    document.getElementById('username').textContent = comment.username;
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('author').textContent = book.authors ? book.authors.join(', ') : 'Unknown';
    document.getElementById('genre').textContent = book.categories ? book.categories.join(', ') : 'Unknown Genre';
    document.getElementById('bookRating').textContent = `${book.averageRating || 0}/5`;
    
    // Load images with fallback
    const bookImage = document.getElementById('bookImage');
    if (book.imageLinks?.thumbnail) {
      bookImage.src = book.imageLinks.thumbnail;
    } else {
      bookImage.src = 'https://via.placeholder.com/150x225?text=No+Cover';
    }
    
    const pfpImg = document.getElementById('pfp');
    if (comment.pfpUrl) {
      pfpImg.src = comment.pfpUrl;
    } else {
      pfpImg.src = 'https://via.placeholder.com/50x50?text=User';
    }
    
    // Format timestamp
    const date = new Date(comment.timestamp * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    document.getElementById('timestamp').textContent = date;
    
    // Update stars
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      star.style.color = i < comment.rating ? '#F9C172' : '#E7D6C4';
      starsContainer.appendChild(star);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Wait for flip animation to complete
    await new Promise(resolve => setTimeout(resolve, 200));
    cardInner.classList.remove('card-flip');
    isAnimating = false;
    
    // Preload the next comment
    preloadNextComment();
  }
 const bookLink = document.querySelector('.card-front-link');
  if (bookLink) {
    bookLink.href = `book-detail.html?bookId=${comment.bookId}`;
  }
  
}

// Initialize the reviews section
function initRandomReviews() {
  // Add event listeners
  document.getElementById('prevBtn')?.addEventListener('click', async () => {
    if (selectedComments.length === 0 || isAnimating) return;
    
    currentIndex = (currentIndex - 1 + selectedComments.length) % selectedComments.length;
    await displayComment(selectedComments[currentIndex]);
  });

  document.getElementById('nextBtn')?.addEventListener('click', async () => {
    if (selectedComments.length === 0 || isAnimating) return;
    
    // Check if we have a preloaded comment
    if (nextCommentPreloaded && nextCommentPreloaded.bookId === selectedComments[(currentIndex + 1) % selectedComments.length].bookId) {
      currentIndex = (currentIndex + 1) % selectedComments.length;
      await displayComment(nextCommentPreloaded);
      nextCommentPreloaded = null;
    } else {
      currentIndex = (currentIndex + 1) % selectedComments.length;
      await displayComment(selectedComments[currentIndex]);
    }
  });

  // Fetch comments when the page loads
  fetchComments();
}

// Call the initialization function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initRandomReviews);