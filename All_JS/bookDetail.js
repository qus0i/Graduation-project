document.addEventListener('DOMContentLoaded', function () {
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
      const book = data.volumeInfo;
      const title = book.title;
      const authors = book.authors ? book.authors.join(', ') : 'Unknown';
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
      <img src="${image}" class="img-fluid rounded shadow-lg" alt="Book cover" style="max-height: 70vh; max-width: 100%; object-fit: contain;">
 <!--this is the favourite button link it with data base-->
<form method="post" id="favourite">     
  <button type="button" class="heart-button" onclick="this.classList.toggle('active')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </button>
</form>
</div>
  </div>
</div>
            <div class="col-12 col-md-7 col-lg-8">
<div class="ps-md-4 d-flex flex-column" style="height: 100%;">
                <h1 class="display-5 display-md-3 mb-2 mb-md-3">${title}</h1>
                <h2 class="h4 h3-md mb-2 mb-md-3">by ${authors}</h2>
                <h3 class="h6 mb-3 mb-md-4"><strong>Genre:</strong> ${genre}</h3>
                <div class="3">
                  <div class="star-rating pb-2 me-1">
                    ★<span class="fs-1">${Number(rating).toFixed(1)}/5.0</span>
                  </div>
                  </div>                  
<div class="mt-auto d-flex flex-column align-items-end">
               <!--testing-->
    <form  class="mt-auto p-2"  action="/your-action-url" method="POST">
  <button type="button" class="library-icon-wrapper mr-2" id="library-toggle-button" name="libraryButton" value="submit">
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

  <button type="button" class="openCover-icon-wrapper" id="openCover-toggle-button">
  <!-- Default Icon -->
  <svg id="openCover-icon-default" class="openCover-icon" ...>
    <!-- icon paths -->
   
   
    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path class="st0" d="M508.176,243.518c-5.5-6.281-15.109-6.859-21.391-1.313l-44.672,39.547L315.926,393.408 c-7.953,7.016-18.078,10.781-28.484,10.781c-3.031,0-6.063-0.297-9.109-0.938l-72.125-15.984l-87.094-19.219l-61.078-13.516 l-8.734-1.953c-2.766-0.938-5.219-2.156-7.375-3.766c-3.469-2.516-6.219-5.781-8.109-9.531c-1.938-3.766-2.953-7.953-2.953-12.219 c0-2.609,0.438-5.344,1.219-8.016c0.953-2.891,2.313-5.5,3.984-7.813c2.453-3.469,5.781-6.219,9.531-8.094 c3.703-1.953,7.875-2.953,12.156-2.953c0.719,0,1.438,0.063,2.156,0.063l62.953,13.594l146,31.578 c18.078,3.969,36.938-0.938,50.813-13.219l89.766-79.078l91.656-80.734c8.234-7.297,11.703-18.578,8.891-29.188 c-2.75-10.703-11.281-18.875-22.047-21.188l-11.422-2.453l-83.266-18L287.801,78.799c-18.063-3.969-36.922,0.938-50.813,13.234 L96.129,215.768L53.77,252.986L16.91,285.361c-1.516,1.734-2.813,3.469-3.969,5.344c-0.656,0.797-1.234,1.516-1.813,2.391 c-3.609,4.922-6.5,10.547-8.453,16.703c-1.813,5.703-2.672,11.563-2.672,17.266c0,12.359,3.969,24.141,10.984,33.828 c3.531,4.922,7.797,9.25,12.797,12.859c4.906,3.625,10.547,6.516,16.688,8.391l0.656,0.219l64.25,14.094l60.859,13.297 l105.672,23.125c5.125,1.156,10.328,1.672,15.531,1.672c17.703,0,34.984-6.359,48.578-18.297l3.609-3.172l125.469-111.094 l41.781-37C513.16,259.408,513.738,249.814,508.176,243.518z"></path> </g> </g></svg>
</svg>
  <!-- Active Icon (initially hidden) -->
  <svg id="openCover-icon-active" class="openCover-icon hidden" ...>
    <!-- icon paths -->
    
    <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>book</title> <path d="M15 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM29 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM31 8h-1v19h-12v1h-5v-1h-12v-19h-1v20h12v1h7.062l-0.062-1h12v-20z"></path> </g></svg>

  </svg>
</button>


<!--closed cover -->
<button type="button" class="closedCover-icon-wrapper mr-2" id="closedCover-toggle-button">
  <!-- Default Icon (visible by default) -->
  <svg id="closedCover-icon-default" class="closedCover-icon" fill="currentColor" viewBox="0 0 24 24" width="50" height="50">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
  </svg>
  <!-- Active Icon (hidden by default) -->
  <svg id="closedCover-icon-active" class="closedCover-icon hidden" fill="#F9C172" viewBox="0 0 24 24" width="50" height="50">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
  </svg>
</button>



<!--dustyShelves cover -->

<button type="button" class="dustyShelves-icon-wrapper mr-2" id="dustyShelves-toggle-button">
  <!-- Default Icon -->
  <svg id="dustyShelves-icon-default" class="dustyShelves-icon" fill="currentColor" viewBox="0 0 24 24" width="50" height="50">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
  </svg>
  <!-- Active Icon -->
  <svg id="dustyShelves-icon-active" class="dustyShelves-icon hidden" fill="#F9C172" viewBox="0 0 24 24" width="50" height="50">
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-8v2h8V7zm0 4h-8v2h8v-2zm0 4h-8v2h8v-2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
  </svg>
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
          <div id="customReviewPagination" class="d-flex justify-content-center mt-4"></div>
        </div>
      `;

      document.getElementById('bookDetails').innerHTML = bookDetailsContent;

      const libraryButton = document.getElementById('library-toggle-button');
      const libraryIconDefault = document.getElementById('library-icon-default');
      const libraryIconActive = document.getElementById('library-icon-active');
      libraryButton.addEventListener('click', function () {
        libraryButton.classList.toggle('active');
        const isActive = libraryButton.classList.contains('active');
        libraryIconDefault.classList.toggle('hidden', isActive);
        libraryIconActive.classList.toggle('hidden', !isActive);
      });
 
      const openCoverButton = document.getElementById('openCover-toggle-button');
      const openCoverIconDefault = document.getElementById('openCover-icon-default');
      const openCoverIconActive = document.getElementById('openCover-icon-active');
      openCoverButton.addEventListener('click', function () {
        openCoverButton.classList.toggle('active');
        const isActive = openCoverButton.classList.contains('active');
        openCoverIconDefault.classList.toggle('hidden', isActive);
        openCoverIconActive.classList.toggle('hidden', !isActive);
      });
      
      const closedCoverButton = document.getElementById('closedCover-toggle-button');
const closedCoverIconDefault = document.getElementById('closedCover-icon-default');
const closedCoverIconActive = document.getElementById('closedCover-icon-active');

closedCoverButton.addEventListener('click', function() {
  closedCoverButton.classList.toggle('active');
  const isActive = closedCoverButton.classList.contains('active');
  closedCoverIconDefault.classList.toggle('hidden', isActive);
  closedCoverIconActive.classList.toggle('hidden', !isActive);
});
const dustyShelvesButton = document.getElementById('dustyShelves-toggle-button');
const dustyShelvesIconDefault = document.getElementById('dustyShelves-icon-default');
const dustyShelvesIconActive = document.getElementById('dustyShelves-icon-active');

dustyShelvesButton.addEventListener('click', function() {
  dustyShelvesButton.classList.toggle('active');
  const isActive = dustyShelvesButton.classList.contains('active');
  dustyShelvesIconDefault.classList.toggle('hidden', isActive);
  dustyShelvesIconActive.classList.toggle('hidden', !isActive);
});
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
