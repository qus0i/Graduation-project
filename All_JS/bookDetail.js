let bookId = '';
let book = null;
let image = '';

document.addEventListener('DOMContentLoaded', function () {

  
   
  function setupToggleButtons() {
     const toggleButtons = [
    {
      id: 'library-toggle-button',
      defaultIcon: 'library-icon-default',
      activeIcon: 'library-icon-active'
    },
    {
      id: 'openCover-toggle-button',
      defaultIcon: 'openCover-icon-default',
      activeIcon: 'openCover-icon-active'
    },
    {
      id: 'closedCover-toggle-button',
      defaultIcon: 'closedCover-icon-default',
      activeIcon: 'closedCover-icon-active'
    },
    {
      id: 'dustyShelves-toggle-button',
      defaultIcon: 'dustyShelves-icon-default',
      activeIcon: 'dustyShelves-icon-active'
    }
  ];

    
  toggleButtons.forEach(buttonConfig => {
    const button = document.getElementById(buttonConfig.id);
    if (button) {
      button.addEventListener('click', function() {
        const isActive = this.classList.toggle('active');
        
        // Update tooltip
        const newTooltip = isActive ? 
          this.getAttribute('data-tooltip-active') : 
          this.getAttribute('data-tooltip-inactive');
        this.setAttribute('data-tooltip', newTooltip);
        
        // Toggle SVG icons
        document.getElementById(buttonConfig.defaultIcon).classList.toggle('hidden', isActive);
        document.getElementById(buttonConfig.activeIcon).classList.toggle('hidden', !isActive);
      });
    }
  });
}

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('bookId');
  const apiURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  let currentPage = 1;
  const reviewsPerPage = 4;
  let totalComments = 0;
  let commentsData = [];
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      fetch('/Graduation-project/ALL_JS/users_rating.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ bookId: bookId })
})
.then(response => response.json())
.then(data => {
  const ratingEl = document.getElementById('community-rating');
  if (ratingEl && data.book_rating != null) {
    ratingEl.textContent = `${Number(data.book_rating).toFixed(1)}/5.0`;
  } else {
    ratingEl.textContent = 'No rating';
  }
})
.catch(err => {
  console.error('Error loading user rating:', err);
});

      const book = data.volumeInfo;
      const title = book.title;
      const authors = book.authors ? book.authors.join(', ') : 'Unknown';
      const publishedDate = book.publishedDate;
      const publisher=book.publisher ;
      const language=book.language ;
      const previewLink = book.previewLink || 'No preview link available';
      const description = book.description || 'No description available';
      const image = book.imageLinks ?
        book.imageLinks.thumbnail.replace('http://', 'https://').replace('zoom=1', 'zoom=3') :
        'https://via.placeholder.com/400x600';
      const rating = book.averageRating != null ? book.averageRating : 0;
      const genre = book.categories ? book.categories.join(', ') : 'Unknown Genre';
      const bookDetailsContent = `
        <div class="container mt-3 mt-md-5">
          <div class="row">
<div class="col-12 col-md-5 col-lg-4 mb-4 mb-md-0">
  <div class="text-center text-md-start">
    <div style="position: relative; display: inline-block;">
      <img src="${image}" class="img-fluid rounded shadow-lg" alt="Book cover" style=" max-width: 100%; object-fit: contain;">
 <!--this is the favourite button link it with data base-->

 <!-- qusai try to linke favourite button with data base  -->
<button id="favorite-button" class="heart-button">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
</button>

</div>
  </div>
</div>
            <div class="col-12 col-md-7 col-lg-8">
        <div class="ps-md-4 d-flex flex-column  " style="height: 100%;">
                <h1 class="display-5 display-md-3 mb-2 mb-md-3 mt-4 text-md-start">${title}</h1>
                <h2 class="h4 h3-md mb-2 mb-md-3"><strong>By</strong> ${authors} (Author)</h2>
                <h3 class="h6 mb-3 mb-md-4 text"><strong class="title">Published Date:</strong> ${publishedDate}</h3>
                <h3 class="h6 mb-3 mb-md-4 text"><strong class="title">published By:</strong> ${publisher}</h3>                
                <h3 class="h6 mb-3 mb-md-4 text"><strong class="title">Genre:</strong> ${genre}</h3>
                <h3 class="h6 text"><strong class="title">language:</strong>${language}</h3>
                <a href="${previewLink}" target="_blank" class="title" role="button" aria-label="Preview Book" style="width:25%"  data-tooltipr="Read the book">
                <svg fill="currentColor" width="75px" height="75px" viewBox="0 0 1.313 1.313" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M0.615 1.082c-0.042 -0.049 -0.112 -0.102 -0.179 -0.135a0.581 0.581 0 0 0 -0.207 -0.059 0.563 0.563 0 0 1 -0.027 -0.003c0 0 0 -0.151 0.001 -0.336l0.001 -0.336 0.013 0.001a0.596 0.596 0 0 1 0.243 0.083 0.6 0.6 0 0 1 0.161 0.15l0.01 0.014v0.319c0 0.175 -0.001 0.319 -0.002 0.319a0.122 0.122 0 0 1 -0.016 -0.017zm0.068 -0.303V0.459l0.019 -0.026c0.024 -0.033 0.074 -0.082 0.106 -0.106a0.565 0.565 0 0 1 0.289 -0.113l0.014 -0.001v0.672l-0.016 0.002c-0.151 0.014 -0.281 0.076 -0.384 0.183l-0.029 0.03zm0.093 0.298a0.538 0.538 0 0 1 0.216 -0.122c0.041 -0.012 0.095 -0.02 0.13 -0.02 0.019 0 0.029 -0.004 0.035 -0.013 0.004 -0.007 0.004 -0.01 0.005 -0.283V0.365l0.008 0.002c0.005 0.001 0.017 0.005 0.029 0.008L1.219 0.381v0.344c0 0.189 -0.001 0.344 -0.002 0.344s-0.015 -0.003 -0.03 -0.006a0.675 0.675 0 0 0 -0.18 -0.017 0.684 0.684 0 0 0 -0.22 0.04l-0.029 0.01 0.018 -0.017zm-0.251 0.005a0.788 0.788 0 0 0 -0.117 -0.03 0.656 0.656 0 0 0 -0.138 -0.008 0.619 0.619 0 0 0 -0.14 0.016c-0.013 0.003 -0.027 0.006 -0.03 0.007L0.094 1.069V0.379l0.026 -0.007 0.028 -0.008c0.002 -0.001 0.003 0.055 0.003 0.275 0 0.301 -0.001 0.284 0.012 0.292 0.004 0.003 0.014 0.004 0.04 0.006a0.534 0.534 0 0 1 0.287 0.101c0.018 0.013 0.06 0.049 0.062 0.053 0.002 0.003 0.001 0.002 -0.026 -0.007z"/></svg>
                Preview Book
                 </a>

                <div class="3">
                  <div class="star-rating pb-2 me-1" style="width:23.5%" data-tooltipr="Book Rating" >
                    ★<span class="fs-1">${Number(rating).toFixed(1)}/5.0</span>
                  </div>
<div class="d-flex align-items-center justify-content-start" style="height: 100px;width:25.5%;"  data-tooltipr="Community Rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#f9c172" viewBox="0 0 50 50">
              <path d="m46.758 15.738 -2.952 -0.87 -1.74 -2.54a2.344 2.344 0 0 0 -3.868 0l-1.74 2.54c-0.592 0.222 -3.25 0.818 -3.688 1.258l-0.006 -0.246 3.086 -4.012a2.34 2.34 0 0 0 -1.194 -3.676L29.8 6.76l-2.862 -4.176a2.346 2.346 0 0 0 -3.866 0L20.21 6.76l-4.856 1.432a2.34 2.34 0 0 0 -1.196 3.676L17.244 15.88l-0.006 0.246c-0.422 -0.434 -3.114 -1.04 -3.688 -1.258l-1.74 -2.54a2.34 2.34 0 0 0 -3.868 0l-1.74 2.54 -2.954 0.87a2.34 2.34 0 0 0 -1.196 3.678l1.878 2.442 -0.084 3.078a2.34 2.34 0 0 0 0.966 1.962 2.36 2.36 0 0 0 2.162 0.312l2.902 -1.03 2.38 0.846c-3.02 2.214 -2.674 7.15 0.62 8.952 -4.788 2.772 -2.766 10.122 2.752 10.118 1.028 -0.022 1.024 -1.542 0 -1.562 -5.266 -0.236 -5.138 -7.664 0.196 -7.812h6.836a0.782 0.782 0 1 0 0 -1.562H15.83c-5.394 -0.006 -5.464 -7.64 0 -7.812h19.336v0.782H16.548c-4.234 0.126 -4.338 6.07 -0.132 6.25h6.25c1.024 -0.018 1.028 -1.544 0 -1.562H16.416c-2.13 -0.094 -2.036 -3.096 0.132 -3.126h17.836v3.126h-0.782c-1.028 0.018 -1.028 1.544 0 1.562h1.562v0.782h-1.562a0.782 0.782 0 1 0 0 1.562h1.562v0.782h-1.562c-1.028 0.018 -1.028 1.544 0 1.562h0.782v3.126h-7.812c-1.024 0.018 -1.026 1.544 0 1.562h8.594v0.782h-8.594c-1.022 0.016 -1.028 1.544 0 1.562h8.594a1.56 1.56 0 0 0 1.562 -1.562v-0.782a1.56 1.56 0 0 0 -0.782 -1.346v-3.56a1.56 1.56 0 0 0 0.782 -1.35c-0.006 -0.466 0.062 -1.168 -0.216 -1.562 0.282 -0.396 0.212 -1.098 0.216 -1.562a1.56 1.56 0 0 0 -0.782 -1.346v-3.56a1.56 1.56 0 0 0 0.782 -1.346v-0.782l-0.002 -0.026c0.306 0.022 3.062 -1.042 3.412 -1.146l2.902 1.032a2.34 2.34 0 0 0 2.162 -0.312 2.36 2.36 0 0 0 0.966 -1.962l-0.084 -3.078 1.878 -2.442c1.008 -1.236 0.348 -3.27 -1.196 -3.678zM15.394 10.912c-0.338 -0.412 -0.118 -1.092 0.398 -1.226l5.124 -1.51a0.8 0.8 0 0 0 0.424 -0.306l3.02 -4.404c0.294 -0.432 0.994 -0.432 1.286 0l3.02 4.404a0.8 0.8 0 0 0 0.424 0.306l5.124 1.51c0.514 0.136 0.738 0.814 0.398 1.226l-3.256 4.232a0.8 0.8 0 0 0 -0.162 0.498l0.146 5.338c0.03 0.532 -0.548 0.952 -1.042 0.758l-5.032 -1.788a0.8 0.8 0 0 0 -0.524 0l-5.03 1.788c-0.494 0.196 -1.074 -0.226 -1.042 -0.758l0.146 -5.338a0.8 0.8 0 0 0 -0.162 -0.498zm-1.052 14.064c0.03 0.532 -0.548 0.952 -1.042 0.758l-3.164 -1.126a0.8 0.8 0 0 0 -0.524 0l-3.164 1.126c-0.494 0.194 -1.076 -0.226 -1.042 -0.758l0.092 -3.356a0.8 0.8 0 0 0 -0.162 -0.498l-2.048 -2.66c-0.338 -0.412 -0.118 -1.092 0.398 -1.228l3.22 -0.948a0.8 0.8 0 0 0 0.424 -0.306l1.896 -2.77c0.286 -0.448 1.002 -0.45 1.288 0l1.898 2.77a0.8 0.8 0 0 0 0.424 0.306l3.22 0.948c0.514 0.136 0.736 0.814 0.398 1.226l-2.048 2.66a0.8 0.8 0 0 0 -0.162 0.498l0.092 3.358zm1.48 0.806 -0.07 0.004c0.302 -0.558 0.036 -3.29 0.068 -3.93l1.306 -1.698 -0.022 0.78c-0.09 1.594 1.638 2.852 3.13 2.274l4.77 -1.696 4.77 1.696c1.484 0.578 3.218 -0.68 3.13 -2.274l-0.022 -0.782 1.306 1.698c0.03 0.652 -0.234 3.354 0.066 3.926H15.824zm30.89 -7.32 -2.046 2.66a0.8 0.8 0 0 0 -0.162 0.498l0.092 3.356c0.03 0.532 -0.548 0.954 -1.042 0.758l-3.164 -1.126a0.8 0.8 0 0 0 -0.524 0l-3.164 1.126c-0.496 0.194 -1.074 -0.226 -1.042 -0.758l0.092 -3.354a0.8 0.8 0 0 0 -0.162 -0.498l-2.046 -2.66c-0.338 -0.412 -0.118 -1.092 0.398 -1.226l3.218 -0.948a0.8 0.8 0 0 0 0.424 -0.306l1.898 -2.77a0.8 0.8 0 0 1 1.288 0l1.896 2.77a0.8 0.8 0 0 0 0.424 0.306l3.222 0.948c0.516 0.136 0.736 0.814 0.398 1.226z"/><path d="M16.542 39.062h6.116a0.782 0.782 0 1 0 0 -1.562H16.542c-3.728 0.036 -4.52 5.2 -0.914 6.116 0.854 0.014 1.082 -1.238 0.26 -1.518 -1.704 -0.632 -1.172 -3.048 0.654 -3.036"/><path d="M17.97 40.626a0.78 0.78 0 0 0 -0.782 0.782v6.25c-0.018 0.562 0.634 0.964 1.13 0.698l2.776 -1.388 2.774 1.388c0.496 0.266 1.15 -0.138 1.132 -0.7v-6.25a0.78 0.78 0 0 0 -0.782 -0.782zm5.47 5.766c-0.244 -0.088 -2.11 -1.146 -2.344 -1.08 -0.228 -0.068 -2.11 0.996 -2.344 1.08v-4.206h4.688z"/><path d="m25.352 38.978 2.774 -1.388 2.776 1.388c0.494 0.266 1.148 -0.136 1.13 -0.698v-6.25a0.78 0.78 0 0 0 -0.782 -0.782H25a0.78 0.78 0 0 0 -0.782 0.782v6.25c-0.014 0.562 0.634 0.964 1.132 0.698m0.432 -6.166h4.688v4.206c-0.244 -0.088 -2.11 -1.144 -2.344 -1.08 -0.226 -0.068 -2.11 0.996 -2.344 1.08z"/></svg>               
             <span id="community-rating"class="fs-1">?/5.0</span>
                  </div>
                  </div>                  
<div class="mt-auto d-flex flex-column align-items-end">
               <!--testing-->
    <form  class="mt-auto p-2"  action="/your-action-url" method="POST">
  <button type="button" class="library-icon-wrapper mr-2" id="library-toggle-button" name="libraryButton" value="submit"  data-tooltip-inactive="Add to My Library"
  data-tooltip-active="Remove from My Library"
  data-tooltip="Add to My Library">
    <!-- Inactive Icon -->
    <svg id="library-icon-default" class="library-icon" fill="currentColor" height="800px" width="800px" version="1.1"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g transform="translate(1 1)">
          <g>
            <g>
        <path d="M186.736 400.064H75.792c-14.512 0 -25.6 -11.088 -25.6 -25.6s11.088 -25.6 25.6 -25.6h196.272c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528H75.792c-23.888 0 -42.672 18.768 -42.672 42.672s18.768 42.672 42.672 42.672h110.928c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
        <path d="M306.192 400.064h-76.8c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h76.8c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
        <path d="M84.336 365.936c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.544 8.528 8.544h51.2c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528z"/>
        <path d="M348.864 255.008H186.736c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h162.128c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
        <path d="M306.192 92.864h-102.384c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h102.4c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
        <path d="M425.664 169.664H186.736c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h238.928c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
        <path d="M502.464 434.192h-11.68a128 128 0 0 1 -7.376 -17.072h2c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528h-6.736a128 128 0 0 1 -2.368 -17.056h9.936c4.272 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528h-9.936a128 128 0 0 1 2.352 -17.072h6.736c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528h-2a128 128 0 0 1 7.376 -17.072h11.68c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528h-8.528v-76.8c0 -5.12 -3.408 -8.528 -8.528 -8.528H468.32v-76.8c0 -5.12 -3.408 -8.528 -8.528 -8.528h-8.528V67.264c0 -5.12 -3.408 -8.528 -8.528 -8.528H24.608c-5.12 0 -8.528 3.408 -8.528 8.528v68.272c0 5.12 3.408 8.528 8.528 8.528h17.072v68.272H7.536c-5.12 0 -8.528 3.408 -8.528 8.528v85.328c0 5.12 3.408 8.528 8.528 8.528h19.808a76.48 76.48 0 0 0 -28.352 59.744 76.48 76.48 0 0 0 76.8 76.8h426.672c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528m-25.6 -136.528h-34.128v-68.272h34.128zm-68.272 0v-68.272h17.072v68.272zm-273.072 0v-68.272h256v68.272zm-51.2 -68.272h34.128v68.272H84.336zm25.6 -85.328h17.088v68.272H109.936zm42.672 -17.072V75.792h196.272v51.216zm281.6 85.328H144.064V144.064h307.2v68.272zm0 -85.328h-34.128V75.792h34.128zm-51.184 -51.216v51.216h-17.072V75.792zm-247.472 0v51.216H101.408V75.792zm-102.4 0h51.2v51.216h-51.2zm25.6 68.272h34.128v68.272H58.736zm-42.672 85.344h51.2v68.272h-51.2zm409.6 204.8H75.792c-33.28 0 -59.728 -26.448 -59.728 -59.728s26.464 -59.744 59.728 -59.744h395.952a144 144 0 0 0 -6.448 17.072h-159.104c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h155.008a144 144 0 0 0 -2 17.072h-32.688l-0.432 0.016 -0.432 -0.016H178.192c-5.12 0 -8.528 3.408 -8.528 8.528s3.424 8.544 8.528 8.544h247.472l0.432 -0.016 0.432 0.016h32.688q0.496 8.576 2 17.072h-112.352c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h116.432a144 144 0 0 0 6.448 17.072z"/>
              <!-- (Paths truncated here for brevity – your original content stays intact) -->
            </g>
          </g>
        </g>
    </svg>
    <!-- Active Icon -->
    <svg id="library-icon-active" class="library-icon hidden" fill="black" height="800px" width="800px" version="1.1"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
     <g transform="translate(1 1)">
       <path style="fill:#f9c172;" d="M441.027,374.467c0-24.747,6.827-47.787,18.773-68.267h-256H101.4
           c-37.547,0-68.267,30.72-68.267,68.267s30.72,68.267,68.267,68.267h102.4h256C447.853,422.253,441.027,399.213,441.027,374.467"/>
       <path style="fill:#E7D6C4;" d="M33.133,374.467c0-37.547,30.72-68.267,68.267-68.267H75.8c-37.547,0-68.267,30.72-68.267,68.267
           s30.72,68.267,68.267,68.267h25.6C63.853,442.733,33.133,412.013,33.133,374.467"/>
       <path style="fill:#c17b36;" d="M485.4,306.2h-25.6c-11.947,20.48-18.773,43.52-18.773,68.267c0,24.747,6.827,47.787,18.773,68.267
           h25.6c-11.947-20.48-18.773-43.52-18.773-68.267C466.627,349.72,473.453,326.68,485.4,306.2"/>
       <polygon style="fill:#f9c172;" points="7.533,306.2 485.4,306.2 485.4,220.867 7.533,220.867 	"/>
       <polygon style="fill:#E7D6C4;" points="7.533,306.2 33.133,306.2 33.133,220.867 7.533,220.867 	"/>
       <g>
           <polygon style="fill:#f9c172;" points="50.2,220.867 459.8,220.867 459.8,135.533 50.2,135.533 		"/>
           <polygon style="fill:#f9c172;" points="24.6,135.533 442.733,135.533 442.733,67.267 24.6,67.267 		"/>
       </g>
       <g>
           <polygon style="fill:#E7D6C4;" points="24.6,135.533 50.2,135.533 50.2,67.267 24.6,67.267 		"/>
           <polygon style="fill:#E7D6C4;" points="50.2,220.867 75.8,220.867 75.8,135.533 50.2,135.533 		"/>
       </g>
       <g>
           <polygon style="fill:#c17b36;" points="459.8,306.2 485.4,306.2 485.4,220.867 459.8,220.867 		"/>
           <polygon style="fill:#c17b36;" points="417.133,135.533 442.733,135.533 442.733,67.267 417.133,67.267 		"/>
           <polygon style="fill:#c17b36;" points="434.2,220.867 459.8,220.867 459.8,135.533 434.2,135.533 		"/>
       </g>
       <g>
           <polygon style="fill:#c17b36;" points="75.8,306.2 127,306.2 127,220.867 75.8,220.867 		"/>
           <polygon style="fill:#c17b36;" points="400.067,306.2 434.2,306.2 434.2,220.867 400.067,220.867 		"/>
           <polygon style="fill:#c17b36;" points="92.867,135.533 144.067,135.533 144.067,67.267 92.867,67.267 		"/>
           <polygon style="fill:#c17b36;" points="357.4,135.533 391.533,135.533 391.533,67.267 357.4,67.267 		"/>
           <polygon style="fill:#c17b36;" points="101.4,220.867 135.533,220.867 135.533,135.533 101.4,135.533 		"/>
       </g>
       <path d="M485.4,451.267H75.8c-42.667,0-76.8-34.133-76.8-76.8s34.133-76.8,76.8-76.8h409.6c3.413,0,5.973,1.707,7.68,4.267
           c1.707,2.56,1.707,5.973,0,8.533c-11.093,19.627-17.067,41.813-17.067,64c0,22.187,5.973,44.373,17.067,64
           c1.707,2.56,1.707,5.973,0,8.533C491.373,449.56,488.813,451.267,485.4,451.267z M75.8,314.733
           c-33.28,0-59.733,26.453-59.733,59.733S42.52,434.2,75.8,434.2h395.947c-8.533-18.773-12.8-39.253-12.8-59.733
           s4.267-40.96,12.8-59.733H75.8z"/>
       <path d="M425.667,383H178.2c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h247.467
           c5.12,0,8.533,3.413,8.533,8.533C434.2,379.587,430.787,383,425.667,383z"/>
       <path d="M186.733,417.133H75.8c-23.893,0-42.667-18.773-42.667-42.667c0-23.893,18.773-42.667,42.667-42.667h196.267
           c5.12,0,8.533,3.413,8.533,8.533s-3.413,8.533-8.533,8.533H75.8c-14.507,0-25.6,11.093-25.6,25.6c0,14.507,11.093,25.6,25.6,25.6
           h110.933c5.12,0,8.533,3.413,8.533,8.533C195.267,413.72,191.853,417.133,186.733,417.133z"/>
       <path d="M485.4,348.867H306.2c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h179.2
           c5.12,0,8.533,3.413,8.533,8.533S490.52,348.867,485.4,348.867z"/>
       <path d="M306.2,417.133h-76.8c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h76.8
           c5.12,0,8.533,3.413,8.533,8.533C314.733,413.72,311.32,417.133,306.2,417.133z"/>
       <path d="M485.4,417.133H348.867c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533H485.4
           c5.12,0,8.533,3.413,8.533,8.533C493.933,413.72,490.52,417.133,485.4,417.133z"/>
       <path d="M135.533,383h-51.2c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h51.2c5.12,0,8.533,3.413,8.533,8.533
           C144.067,379.587,140.653,383,135.533,383z"/>
       <path d="M485.4,314.733H7.533C2.413,314.733-1,311.32-1,306.2v-85.333c0-5.12,3.413-8.533,8.533-8.533H485.4
           c5.12,0,8.533,3.413,8.533,8.533V306.2C493.933,311.32,490.52,314.733,485.4,314.733z M16.067,297.667h460.8V229.4h-460.8V297.667z
           "/>
       <path d="M127,314.733H75.8c-5.12,0-8.533-3.413-8.533-8.533v-85.333c0-5.12,3.413-8.533,8.533-8.533H127
           c5.12,0,8.533,3.413,8.533,8.533V306.2C135.533,311.32,132.12,314.733,127,314.733z M84.333,297.667h34.133V229.4H84.333V297.667z"
           />
       <path d="M348.867,272.067H186.733c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h162.133
           c5.12,0,8.533,3.413,8.533,8.533C357.4,268.653,353.987,272.067,348.867,272.067z"/>
       <path d="M434.2,314.733h-34.133c-5.12,0-8.533-3.413-8.533-8.533v-85.333c0-5.12,3.413-8.533,8.533-8.533H434.2
           c5.12,0,8.533,3.413,8.533,8.533V306.2C442.733,311.32,439.32,314.733,434.2,314.733z M408.6,297.667h17.067V229.4H408.6V297.667z"
           />
       <path d="M442.733,144.067H24.6c-5.12,0-8.533-3.413-8.533-8.533V67.267c0-5.12,3.413-8.533,8.533-8.533h418.133
           c5.12,0,8.533,3.413,8.533,8.533v68.267C451.267,140.653,447.853,144.067,442.733,144.067z M33.133,127H434.2V75.8H33.133V127z"/>
       <path d="M144.067,144.067h-51.2c-5.12,0-8.533-3.413-8.533-8.533V67.267c0-5.12,3.413-8.533,8.533-8.533h51.2
           c5.12,0,8.533,3.413,8.533,8.533v68.267C152.6,140.653,149.187,144.067,144.067,144.067z M101.4,127h34.133V75.8H101.4V127z"/>
       <path d="M306.2,109.933H203.8c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h102.4
           c5.12,0,8.533,3.413,8.533,8.533C314.733,106.52,311.32,109.933,306.2,109.933z"/>
       <path d="M391.533,144.067H357.4c-5.12,0-8.533-3.413-8.533-8.533V67.267c0-5.12,3.413-8.533,8.533-8.533h34.133
           c5.12,0,8.533,3.413,8.533,8.533v68.267C400.067,140.653,396.653,144.067,391.533,144.067z M365.933,127H383V75.8h-17.067V127z"/>
       <path d="M459.8,229.4H50.2c-5.12,0-8.533-3.413-8.533-8.533v-85.333c0-5.12,3.413-8.533,8.533-8.533h409.6
           c5.12,0,8.533,3.413,8.533,8.533v85.333C468.333,225.987,464.92,229.4,459.8,229.4z M58.733,212.333h392.533v-68.267H58.733
           V212.333z"/>
       <path d="M135.533,229.4H101.4c-5.12,0-8.533-3.413-8.533-8.533v-85.333c0-5.12,3.413-8.533,8.533-8.533h34.133
           c5.12,0,8.533,3.413,8.533,8.533v85.333C144.067,225.987,140.653,229.4,135.533,229.4z M109.933,212.333H127v-68.267h-17.067
           V212.333z"/>
       <path d="M425.667,186.733H186.733c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h238.933
           c5.12,0,8.533,3.413,8.533,8.533C434.2,183.32,430.787,186.733,425.667,186.733z"/>
       <path d="M502.467,314.733h-76.8c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h76.8c5.12,0,8.533,3.413,8.533,8.533
           S507.587,314.733,502.467,314.733z"/>
       <path d="M502.467,451.267h-76.8c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h76.8
           c5.12,0,8.533,3.413,8.533,8.533C511,447.853,507.587,451.267,502.467,451.267z"/>
       <path d="M486.253,383H426.52c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h59.733
           c5.12,0,8.533,3.413,8.533,8.533C494.787,379.587,490.52,383,486.253,383z"/>
   </g>
    </svg>
  </button>
  <!--opencover-->

  <button type="button" class="openCover-icon-wrapper mr-2" id="openCover-toggle-button"  data-tooltip-inactive="Add to My Open Cover List"
  data-tooltip-active="Remove from My Open Cover List"
  data-tooltip="Add to My Open Cover List">
  <!-- Default Icon -->
  <svg id="openCover-icon-default" class="openCover-icon" ...>
    <!-- icon paths -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" x="0px" y="0px"  fill="currentColor">
<path d="M49,0H42a1.993,1.993,0,0,0-1.722,1H24.184a3.186,3.186,0,0,0-2.3,1h-4.16A1.993,1.993,0,0,0,16,1H12A5.006,5.006,0,0,0,7,6V55a5.006,5.006,0,0,0,5,5H46a3,3,0,0,0,3-3V53a3,3,0,0,0,3-3V43a1.993,1.993,0,0,0-1-1.722V33.722A1.993,1.993,0,0,0,52,32V21a1.993,1.993,0,0,0-1-1.722V11.722A1.993,1.993,0,0,0,52,10V3A3,3,0,0,0,49,0ZM42,2h7a1,1,0,0,1,1,1l0,7H48.414L42,3.586ZM18,4h2.471A2.984,2.984,0,0,0,20,5.605V7.586L18.293,5.879A1,1,0,0,1,18,5.172ZM16.879,7.293l2.21,2.21A1.721,1.721,0,0,0,22,8.3V5.605a.994.994,0,0,1,.168-.554l1.008-1.512A1.205,1.205,0,0,1,24.184,3H40v.586A2.015,2.015,0,0,0,40.586,5L47,11.414A2.015,2.015,0,0,0,48.414,12H49v7a3,3,0,0,0-2.871,2.129A3,3,0,0,0,44,24v5a3,3,0,0,0,2.129,2.871A3,3,0,0,0,49,34v7h-.586A2.015,2.015,0,0,0,47,41.586L40.586,48A2.015,2.015,0,0,0,40,49.414V50H34V45a1,1,0,0,0-2,0v5H23V48a1,1,0,0,0-2,0v2H19V45a1,1,0,0,0-2,0v5H13V3h3V5.172A2.978,2.978,0,0,0,16.879,7.293ZM50,32H49a1,1,0,0,1-1-1,1,1,0,0,0-1-1,1,1,0,0,1-1-1V24a1,1,0,0,1,1-1,1,1,0,0,0,1-1,1,1,0,0,1,1-1l1,0ZM11,3.184V50.1a5,5,0,0,0-2,.923V6A3,3,0,0,1,11,3.184ZM47,57a1,1,0,0,1-1,1H12a3,3,0,1,1,0-6H40.278A1.993,1.993,0,0,0,42,53h5Zm3-7a1,1,0,0,1-1,1H42V49.414L48.414,43H50Z"/><path d="M19.615,27.063a3,3,0,0,1,2.322,2.324A1.992,1.992,0,0,0,23.893,31H36.107a1.99,1.99,0,0,0,1.955-1.613,3.005,3.005,0,0,1,2.325-2.325A1.992,1.992,0,0,0,42,25.107V18.893a1.99,1.99,0,0,0-1.613-1.955,3.005,3.005,0,0,1-2.325-2.325A1.992,1.992,0,0,0,36.107,13H23.893a1.994,1.994,0,0,0-1.956,1.615,3,3,0,0,1-2.324,2.323A1.99,1.99,0,0,0,18,18.893v6.214A1.994,1.994,0,0,0,19.615,27.063ZM20.02,18.9a5.023,5.023,0,0,0,2.73-1.588A4.947,4.947,0,0,0,23.893,15l12.211.021a5.01,5.01,0,0,0,1.146,2.287,5.087,5.087,0,0,0,2.75,1.6l-.022,6.2A4.986,4.986,0,0,0,36.107,29L23.9,28.98a5.023,5.023,0,0,0-1.588-2.73A4.947,4.947,0,0,0,20,25.107Z"/><path d="M41,54H36a1,1,0,0,0,0,2h5a1,1,0,0,0,0-2Z"/><path d="M32,54H16a1,1,0,0,0,0,2H32a1,1,0,0,0,0-2Z"/></svg>

</svg>   
   

    <!-- Active Icon (initially hidden) -->
  <svg id="openCover-icon-active" class="openCover-icon hidden" ...>
    <!-- icon paths -->
    
    <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>book</title> <path d="M15 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM29 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM31 8h-1v19h-12v1h-5v-1h-12v-19h-1v20h12v1h7.062l-0.062-1h12v-20z"></path> </g></svg>

  </svg>
</button>

<!--closed cover -->
<button type="button" class="closedCover-icon-wrapper mr-2" id="closedCover-toggle-button" data-tooltip-inactive="Add to MY Closed Cover List"
  data-tooltip-active="Remove from My Closed Cover List"
  data-tooltip="Add to My Closed Cover List">
  <!-- Default Icon (visible by default) -->
  <svg id="closedCover-icon-default" class="closedCover-icon" fill="currentColor" viewBox="0 0 24 24" width="50" height="50">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
 <path d="m66.363 31.301c-2.043-1.8594-5.207-1.707-7.0625 0.33594l-14.301 15.738-4.3008-4.7305c-1.8555-2.0469-5.0195-2.1953-7.0625-0.33984-2.043 1.8555-2.1953 5.0195-0.33594 7.0625l5.293 5.8281c3.3984 3.7383 9.4141 3.7383 12.812 0l15.293-16.832c1.8594-2.043 1.707-5.207-0.33594-7.0625zm-5.582 1.6836c1.1133-1.2266 3.0117-1.3203 4.2344-0.20312 1.2266 1.1133 1.3203 3.0117 0.20312 4.2344l-15.293 16.832c-2.6055 2.8711-7.2461 2.8711-9.8516 0l-5.293-5.8242c-1.1172-1.2266-1.0234-3.125 0.20312-4.2383 1.2227-1.1133 3.1211-1.0234 4.2344 0.20312l5.043 5.5469c0.1875 0.20703 0.45703 0.32812 0.73828 0.32812s0.55078-0.12109 0.73828-0.32812z" fill-rule="evenodd"/>
 <path d="m15 19c0-4.9688 4.0312-9 9-9h52c4.9688 0 9 4.0312 9 9v48c0 3.5352-2.0352 6.5938-5 8.0664v8.9336h2c1.6562 0 3 1.3438 3 3s-1.3438 3-3 3h-58c-4.9688 0-9-4.0312-9-9zm61 57c0.6875 0 1.3555-0.078125 2-0.22266v8.2227h-53c-2.2109 0-4-1.7891-4-4s1.7891-4 4-4zm-52-64c-3.8672 0-7 3.1328-7 7v62c0 3.8672 3.1328 7 7 7h58c0.55078 0 1-0.44922 1-1s-0.44922-1-1-1h-57c-3.3125 0-6-2.6875-6-6s2.6875-6 6-6h51c3.8672 0 7-3.1328 7-7v-48c0-3.8672-3.1328-7-7-7z" fill-rule="evenodd"/>
</svg>
</svg>
  <!-- Active Icon (hidden by default) -->
  
  <svg id="closedCover-icon-active" class="closedCover-icon hidden" fill="currentColor" viewBox="0 0 24 24" width="50" height="50">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
 <path d="m24 10c-4.9688 0-9 4.0312-9 9v62c0 4.9688 4.0312 9 9 9h58c1.6562 0 3-1.3438 3-3s-1.3438-3-3-3h-2v-8.9336c2.9648-1.4727 5-4.5312 5-8.0664v-48c0-4.9688-4.0312-9-9-9zm54 65.777v8.2227h-53c-2.2109 0-4-1.7891-4-4s1.7891-4 4-4h51c0.6875 0 1.3555-0.078125 2-0.22266zm-18.699-44.141c1.8555-2.043 5.0195-2.1953 7.0625-0.33594 2.043 1.8555 2.1953 5.0195 0.33594 7.0625l-15.293 16.832c-3.3984 3.7383-9.4141 3.7383-12.812 0l-5.293-5.8281c-1.8594-2.043-1.707-5.207 0.33594-7.0625 2.043-1.8555 5.207-1.707 7.0625 0.33984l4.3008 4.7305z" fill-rule="evenodd"/>
</svg>
</button>


<!--dustyShelves cover -->

<button type="button" class="dustyShelves-icon-wrapper mr-2" id="dustyShelves-toggle-button"  data-tooltip-inactive="Add to My Dusty Shelves List"
  data-tooltip-active="Remove from My Dusty Shelves List"
  data-tooltip="Add to My Dusty Shelves List">
  <!-- Default Icon -->
  <svg id="dustyShelves-icon-default" class="dustyShelves-icon" fill="currentColor" viewBox="0 0 24 24" width="50" height="50">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 5 55 50"  xml:space="preserve"><path d="M40.1549072,6c-4.4111328,0-8.3378906,2.0809326-10.875061,5.3046875H12.0426025  c-3.3320313,0-6.0424805,2.7109375-6.0424805,6.0429688V48.375h0.0174561  c0.0784302,1.3699951,0.6101685,2.6552124,1.5543213,3.6845703C8.7022705,53.2929688,10.3096924,54,11.9820557,54h24.5639648  l0.5791016-0.0224609l0.5961914-0.9443359l-0.2089844-0.4931641c-1.3984375-3.3007813-1.4091797-6.2392578-0.0336914-8.9833984  h-0.0004883l0.2509766-0.5390625l-0.1079102-0.1691895v-9.401001c0.8226929,0.1529541,1.6673584,0.243042,2.5336914,0.243042  c7.6342773,0,13.8452148-6.2109375,13.8452148-13.8447266C54.0001221,12.2109375,47.7891846,6,40.1549072,6z M11.9820557,52  c-1.1132813,0-2.1835938-0.4707031-2.9360352-1.2919922c-0.7631836-0.8320313-1.1289063-1.9150391-1.0302734-3.0488281  c0.1767578-2.0322266,2.0322266-3.6230469,4.2246094-3.6230469h22.8642578  c-0.3808594,1.0802002-0.5818481,2.1954346-0.6239014,3.3388672H12.8843994v2h21.6916504  c0.1117554,0.8609619,0.3037109,1.7352295,0.5969238,2.625H11.9820557z M35.6212158,42.0361328H12.2403564  c-1.6221924,0-3.1190796,0.6081543-4.2402344,1.6014404v-26.289917c0-2.2294922,1.8134766-4.0429688,4.0424805-4.0429688h15.914856  c-1.0494995,1.9493408-1.6477661,4.1762085-1.6477661,6.5410156c0,6.0444336,3.9003906,11.1834106,9.3115234,13.0668335V42.0361328z   M40.1549072,31.6904297c-6.53125,0-11.8452148-5.3134766-11.8452148-11.8447266C28.3096924,13.3134766,33.6236572,8,40.1549072,8  s11.8452148,5.3134766,11.8452148,11.8457031C52.0001221,26.3769531,46.6861572,31.6904297,40.1549072,31.6904297z"/><rect x="16.5460205" y="36.421875" width="10.5297852" height="2"/><rect x="16.5460205" y="30.8066406" width="10.5297852" height="2"/><path d="M40.1549072,9.9003906c-5.4838867,0-9.9453125,4.4619141-9.9453125,9.9453125s4.4614258,9.9453125,9.9453125,9.9453125  s9.9453125-4.4619141,9.9453125-9.9453125S45.6387939,9.9003906,40.1549072,9.9003906z M40.1549072,11.9003906  c1.8305054,0,3.5136108,0.628479,4.8585815,1.6726685L33.8822632,24.7042847  c-1.0441895-1.3449707-1.6726685-3.0280762-1.6726685-4.8585815C32.2095947,15.4648438,35.7740479,11.9003906,40.1549072,11.9003906  z M40.1549072,27.7910156c-1.8305054,0-3.5136108-0.628479-4.8585815-1.6726685l11.1312256-11.1312256  c1.0441895,1.3449707,1.6726685,3.0280762,1.6726685,4.8585815C48.1002197,24.2265625,44.5357666,27.7910156,40.1549072,27.7910156z  "/></svg>  </svg>
  <!-- Active Icon -->
  <svg id="dustyShelves-icon-active" class="dustyShelves-icon hidden" fill="currentColor" viewBox="0 0 24 24" width="50" height="50">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 5 55 50"  xml:space="preserve"><g><path d="M47.9209251,13.6223145l-12.143158,12.1431561c1.4672432,1.1391144,3.3033562,1.824728,5.3002739,1.824728   c4.7791176,0,8.667614-3.8884945,8.667614-8.667614C49.7456551,16.9256706,49.0600395,15.0895548,47.9209251,13.6223145z"/><path d="M11.3283949,51.136364v-2.1818199h23.5596123c0.0458794-1.2473793,0.2651367-2.4640007,0.6806221-3.6423988H10.625802   c-2.3916903,0-4.4158378,1.7354393-4.6086645,3.9524155c-0.1075993,1.2368584,0.2913709,2.4183235,1.1239347,3.3259926   C7.9619174,53.4865074,9.1295309,54,10.3440199,54h25.2991829c-0.31987-0.9706573-0.529274-1.9244041-0.6511917-2.863636   H11.3283949z"/><path d="M41.0780411,10.2549715c-4.7791214,0-8.667614,3.8884945-8.667614,8.667613   c0,1.9969158,0.6856117,3.8330307,1.8247299,5.300272l12.1431541-12.1431561   C44.911068,10.9405851,43.074955,10.2549715,41.0780411,10.2549715z"/><path d="M25.9741688,18.9225845c0-2.5797882,0.6526546-5.009099,1.7975636-7.1356525H10.4100704   c-2.4316401,0-4.4099784,1.9783382-4.4099784,4.410511v28.6799107c1.2230783-1.0835876,2.8560462-1.7470284,4.62571-1.7470284   h25.5063934v-9.9530144C30.2291412,31.1226692,25.9741688,25.5165119,25.9741688,18.9225845z M26.8099289,39.1875H15.3228903   v-2.1818199h11.4870386V39.1875z M26.8099289,33.0617905H15.3228903v-2.181818h11.4870386V33.0617905z"/><path d="M41.0780411,6c-7.125,0-12.9220543,5.7965202-12.9220543,12.9225845c0,7.125,5.7970543,12.9215202,12.9220543,12.9215202   s12.9220505-5.7965202,12.9220505-12.9215202C54.0000916,11.7965202,48.2030411,6,41.0780411,6z M41.0780411,29.7720165   c-5.9824219,0-10.8494339-4.8675423-10.8494339-10.849432s4.867012-10.849431,10.8494339-10.849431   s10.8494301,4.8675423,10.8494301,10.849431S47.060463,29.7720165,41.0780411,29.7720165z"/></g></svg>  </svg>
</button>





</form>
              </div>
             </div>
                 </div>
            </div>
          <div class="row mt-4 mt-md-5">
            <div class="col-12">
              <h3 class="h4 mb-3 mb-md-4">Description</h3>
              <div class="description-box p-4 rounded-4">
                <p class="fs-5 fs-md-6 lh-base m-0 text" style="text-align: justify;">${description}</p>
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
          <div id="customReviewPagination" class="d-flex justify-content-center mt-4"></div>
        </div>
      `;

      document.getElementById('bookDetails').innerHTML = bookDetailsContent;
      setupToggleButtons();
      setupReviewForm();
      fetchComments();
    })
    
    .catch(error => console.error('Error fetching book details:', error));

  function setupReviewForm() {
    let selectedRating = 0; // Default = 0 if user doesn't click
    const form = document.getElementById('reviewForm');

    document.querySelectorAll('.review-star').forEach(star => {
      star.addEventListener('click', function () {
        selectedRating = parseInt(this.getAttribute('data-rating'));
        updateStars(selectedRating);
      });
    });

    function updateStars(rating) {
      document.querySelectorAll('.review-star').forEach(star => {
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
      if (reviewText) {
        const formData = new FormData();
        formData.append('username', 'Guest');
        formData.append('rating', selectedRating); // will be 0 if no star clicked
        formData.append('comment', reviewText);
        formData.append('bookId', bookId);

        fetch('../PHP/comments.php', {
          method: 'POST',
          body: formData
        }).then(response => response.text())
          .then(() => {
            alert('Review submitted successfully!');
            form.reset();
            selectedRating = 0;
            updateStars(0);
            fetchComments();
          }).catch(error => console.error('Error posting review:', error));
      } else {
        alert('Please enter a review.');
      }
    });
  }

  function fetchComments() {
    fetch(`../PHP/comments.php?bookId=${bookId}`)
      .then(response => response.json())
      .then(comments => {
        commentsData = comments.sort((a, b) => b.timestamp - a.timestamp);
        totalComments = commentsData.length;
        renderReviews();
        renderPagination();
      })
      .catch(error => console.error('Error fetching comments:', error));
  }

  function renderReviews() {
    const start = (currentPage - 1) * reviewsPerPage;
    const paginated = commentsData.slice(start, start + reviewsPerPage);
    const userReviews = document.getElementById('userReviews');
    userReviews.innerHTML = paginated.map(c =>
      generateUserReview(c.username, c.pfpUrl, c.rating, c.comment, c.timestamp)
    ).join('');

    const cards = userReviews.querySelectorAll('.comment-card');
    cards.forEach((card, index) => {
      card.style.opacity = 0;
      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease";
        card.style.opacity = 1;
      }, index * 200);
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(totalComments / reviewsPerPage);
    const container = document.getElementById('customReviewPagination');
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = `<span class="custom-page-link ${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(${currentPage - 1})">&lt;</span>`;

    if (currentPage > 2) {
      html += `<span class="custom-page-link" onclick="changePage(1)">1</span>`;
      if (currentPage > 3) html += `<span class="custom-page-link disabled">...</span>`;
    }

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      html += `<span class="custom-page-link${i === currentPage ? ' active' : ''}" onclick="changePage(${i})">${i}</span>`;
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) html += `<span class="custom-page-link disabled">...</span>`;
      html += `<span class="custom-page-link" onclick="changePage(${totalPages})">${totalPages}</span>`;
    }

    html += `<span class="custom-page-link ${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(${currentPage + 1})">&gt;</span>`;
    container.innerHTML = html;
  }

  window.changePage = function (page) {
    const totalPages = Math.ceil(totalComments / reviewsPerPage);
    if (page < 1 || page > totalPages || page === currentPage) return;
    currentPage = page;
    renderReviews();
    renderPagination();
  };

  function generateUserReview(username, pfpUrl, rating, comment, timestamp) {
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<span class="review-star ${i < rating ? 'text-warning' : ''}">★</span>`).join('');
    const date = new Date(timestamp * 1000).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    
    return `
      <div class="comment-card p-4 rounded-4">
        <div class="d-flex align-items-center mb-3">
          <img src="${pfpUrl}" alt="${username}" class="rounded-circle me-3" style="width: 60px; height: 60px; object-fit: cover;">
          <div>
            <h5 class="mb-1" style="color: var(--color-primary-light);">${username}</h5>
            <div class="d-flex">${stars}</div>
            <div class="small text-muted">${date}</div>
          </div>
        </div>
        <p style="color: var(--color-primary-light);">${comment}</p>
      </div>
    `;
  }
});


//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//تشغيل الكود بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  //استخراج bookId من رابط الصفحة
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('bookId');
  //تجهيز رابط API لجلب بيانات الكتاب
  const apiURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  let book = null;
  let image = '';
  //تجهيز رابط API لجلب بيانات الكتاب
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      book = data.volumeInfo;
      //تجهيز رابط API لجلب بيانات الكتاب
      image = book.imageLinks
        ? book.imageLinks.thumbnail.replace('http://', 'https://').replace('zoom=1', 'zoom=3')
        : 'https://via.placeholder.com/400x600';

      // Generic toggle logic دالة التبديل (إضافة/إزالة) للكتاب في جدول معين
      function handleToggleButton(buttonId, tableName, iconDefaultId = null, iconActiveId = null) {
        const btn = document.getElementById(buttonId);
        if (!btn || !book) return;

        const payload = {
          table: tableName,
          bookId: bookId, // هنا الإضافة المهمة
          title: book?.title || '',
          authors: book?.authors?.join(', ') || '',
          thumbnail: image?.slice(0, 64)
        };

        fetch('/Graduation-project/ALL_JS/toggle_book.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(res => res.json())
          .then(data => {
            if (data.status === 'added') {
              btn.classList.add('active');
              if (iconDefaultId && iconActiveId) {
                document.getElementById(iconDefaultId)?.classList.add('hidden');
                document.getElementById(iconActiveId)?.classList.remove('hidden');
              }
            } else if (data.status === 'removed') {
              btn.classList.remove('active');
              if (iconDefaultId && iconActiveId) {
                document.getElementById(iconDefaultId)?.classList.remove('hidden');
                document.getElementById(iconActiveId)?.classList.add('hidden');
              }
            }
          });
      }
      //دالة فحص حالة الزر عند تحميل الصفحة
      function checkToggleButtonState(buttonId, tableName, iconDefaultId = null, iconActiveId = null) {
        const btn = document.getElementById(buttonId);
        if (!btn || !book) return;

        const payload = {
          table: tableName,
          bookId: bookId ,// هنا الإضافة المهمة
          title: book?.title || '',
          authors: book?.authors?.join(', ') || ''
        };

        fetch('/Graduation-project/ALL_JS/check_book.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(res => res.json())
          .then(data => {
            if (data.exists) {
              btn.classList.add('active');
              if (iconDefaultId && iconActiveId) {
                document.getElementById(iconDefaultId)?.classList.add('hidden');
                document.getElementById(iconActiveId)?.classList.remove('hidden');
              }
            }
          });
      }

      // Bind all buttons
      const buttonConfigs = [
        { id: 'favorite-button', table: 'myfavorites' },
        { id: 'library-toggle-button', table: 'mylibrary' },
        { id: 'openCover-toggle-button', table: 'myopencover' },
        { id: 'closedCover-toggle-button', table: 'myclosedcover' },
        { id: 'dustyShelves-toggle-button', table: 'mydustyshelves' }
      ];

      buttonConfigs.forEach(cfg => {
        const btn = document.getElementById(cfg.id);
        if (btn) {
          btn.addEventListener('click', () => handleToggleButton(cfg.id, cfg.table, cfg.iconDefault, cfg.iconActive));
          checkToggleButtonState(cfg.id, cfg.table, cfg.iconDefault, cfg.iconActive);
        }
      });
    });
});




