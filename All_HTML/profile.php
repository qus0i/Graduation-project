<?php 
session_start();
$username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';
$imgUrl = isset($_SESSION['profile_img']) && !empty($_SESSION['profile_img'])
    ? $_SESSION['profile_img']
    : 'https://www.w3schools.com/w3images/avatar2.png';
    $user_id = $_SESSION['user_id'] ;
///Graduation-project/All_IMAGES/Profil.png    
    

?> 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Profile</title>
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  rel="stylesheet"
/>

     <link rel="stylesheet" href="../All_CSS/main.css">

</head>
<body>
  <!-- Navbar Include (if you have one) -->
  <div id="navbar-placeholder"></div>
  <script>
  fetch('nav.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar-placeholder').innerHTML = data);
  </script>
  <!-- Profile & Counters Section -->
  <section class="profile py-5">
    <div class=" container">
      <div class="row align-items-center">
        <div class="col-md-4 text-center mb-4 mb-md-0">
          <img
            id="profileImg"
            src="<?php echo htmlspecialchars($imgUrl); ?>"
            alt="Profile"
            class="rounded-circle"
            style="width:200px;height:200px;object-fit:cover;background-color:#2d241f;"
          />
          <h2 class="mt-3 profiletxt" id="username"><?php echo $username; ?></h2>
        </div>
        <div class="col-md-8">
          <div class="row text-center">
            <!-- Five counters -->
           <script>
  // 1. Define a mapping from list-keys to SVG markup
  const icons = {
    myfavorites: `
 <svg xmlns="http://www.w3.org/2000/svg" class="icons-counter" viewBox="0 0 24 24" width="50" height="50" >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
      `,
    mylibrary: `      
    <svg fill="black" height="50px" width="50px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g transform="translate(1 1)"><path style="fill:#f9c172;" d="M27.564 23.404c0 -1.547 0.427 -2.987 1.173 -4.267H6.338c-2.347 0 -4.267 1.92 -4.267 4.267s1.92 4.267 4.267 4.267h22.4c-0.747 -1.28 -1.173 -2.72 -1.173 -4.267"/><path style="fill:#E7D6C4;" d="M2.071 23.404c0 -2.347 1.92 -4.267 4.267 -4.267H4.737c-2.347 0 -4.267 1.92 -4.267 4.267s1.92 4.267 4.267 4.267h1.6c-2.347 0 -4.267 -1.92 -4.267 -4.267"/><path style="fill:#c17b36;" d="M30.337 19.137h-1.6c-0.747 1.28 -1.173 2.72 -1.173 4.267s0.427 2.987 1.173 4.267h1.6c-0.747 -1.28 -1.173 -2.72 -1.173 -4.267s0.427 -2.987 1.173 -4.267"/><path style="fill:#f9c172;" points="7.533,306.2 485.4,306.2 485.4,220.867 7.533,220.867 	" d="M0.471 19.137L30.337 19.137L30.337 13.804L0.471 13.804Z"/><path style="fill:#E7D6C4;" points="7.533,306.2 33.133,306.2 33.133,220.867 7.533,220.867 	" d="M0.471 19.137L2.071 19.137L2.071 13.804L0.471 13.804Z"/><g><path style="fill:#f9c172;" points="50.2,220.867 459.8,220.867 459.8,135.533 50.2,135.533 		" d="M3.138 13.804L28.738 13.804L28.738 8.471L3.138 8.471Z"/><path style="fill:#f9c172;" points="24.6,135.533 442.733,135.533 442.733,67.267 24.6,67.267 		" d="M1.538 8.471L27.671 8.471L27.671 4.204L1.538 4.204Z"/></g><g><path style="fill:#E7D6C4;" points="24.6,135.533 50.2,135.533 50.2,67.267 24.6,67.267 		" d="M1.538 8.471L3.138 8.471L3.138 4.204L1.538 4.204Z"/><path style="fill:#E7D6C4;" points="50.2,220.867 75.8,220.867 75.8,135.533 50.2,135.533 		" d="M3.138 13.804L4.737 13.804L4.737 8.471L3.138 8.471Z"/></g><g><path style="fill:#c17b36;" points="459.8,306.2 485.4,306.2 485.4,220.867 459.8,220.867 		" d="M28.738 19.137L30.337 19.137L30.337 13.804L28.738 13.804Z"/><path style="fill:#c17b36;" points="417.133,135.533 442.733,135.533 442.733,67.267 417.133,67.267 		" d="M26.071 8.471L27.671 8.471L27.671 4.204L26.071 4.204Z"/><path style="fill:#c17b36;" points="434.2,220.867 459.8,220.867 459.8,135.533 434.2,135.533 		" d="M27.137 13.804L28.738 13.804L28.738 8.471L27.137 8.471Z"/></g><g><path style="fill:#c17b36;" points="75.8,306.2 127,306.2 127,220.867 75.8,220.867 		" d="M4.737 19.137L7.938 19.137L7.938 13.804L4.737 13.804Z"/><path style="fill:#c17b36;" points="400.067,306.2 434.2,306.2 434.2,220.867 400.067,220.867 		" d="M25.004 19.137L27.137 19.137L27.137 13.804L25.004 13.804Z"/><path style="fill:#c17b36;" points="92.867,135.533 144.067,135.533 144.067,67.267 92.867,67.267 		" d="M5.804 8.471L9.004 8.471L9.004 4.204L5.804 4.204Z"/><path style="fill:#c17b36;" points="357.4,135.533 391.533,135.533 391.533,67.267 357.4,67.267 		" d="M22.337 8.471L24.471 8.471L24.471 4.204L22.337 4.204Z"/><path style="fill:#c17b36;" points="101.4,220.867 135.533,220.867 135.533,135.533 101.4,135.533 		" d="M6.338 13.804L8.471 13.804L8.471 8.471L6.338 8.471Z"/></g><path d="M30.337 28.204H4.737c-2.667 0 -4.8 -2.133 -4.8 -4.8s2.133 -4.8 4.8 -4.8h25.6c0.213 0 0.373 0.107 0.48 0.267s0.107 0.373 0 0.533c-0.693 1.227 -1.067 2.613 -1.067 4s0.373 2.773 1.067 4c0.107 0.16 0.107 0.373 0 0.533s-0.267 0.267 -0.48 0.267M4.737 19.671c-2.08 0 -3.733 1.653 -3.733 3.733S2.658 27.137 4.737 27.137h24.747c-0.533 -1.173 -0.8 -2.453 -0.8 -3.733s0.267 -2.56 0.8 -3.733z"/><path d="M26.604 23.938H11.137c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h15.467c0.32 0 0.533 0.213 0.533 0.533S26.924 23.938 26.604 23.938"/><path d="M11.671 26.071H4.737c-1.493 0 -2.667 -1.173 -2.667 -2.667 0 -1.493 1.173 -2.667 2.667 -2.667h12.267c0.32 0 0.533 0.213 0.533 0.533s-0.213 0.533 -0.533 0.533H4.737c-0.907 0 -1.6 0.693 -1.6 1.6s0.693 1.6 1.6 1.6h6.933c0.32 0 0.533 0.213 0.533 0.533 0 0.32 -0.213 0.533 -0.533 0.533"/><path d="M30.337 21.804H19.137c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h11.2c0.32 0 0.533 0.213 0.533 0.533s-0.213 0.533 -0.533 0.533"/><path d="M19.137 26.071h-4.8c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h4.8c0.32 0 0.533 0.213 0.533 0.533s-0.213 0.533 -0.533 0.533"/><path d="M30.337 26.071H21.804c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533H30.337c0.32 0 0.533 0.213 0.533 0.533s-0.213 0.533 -0.533 0.533"/><path d="M8.471 23.938h-3.2c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h3.2c0.32 0 0.533 0.213 0.533 0.533 0 0.32 -0.213 0.533 -0.533 0.533"/><path d="M30.337 19.671H0.471C0.151 19.671 -0.063 19.457 -0.063 19.137v-5.333c0 -0.32 0.213 -0.533 0.533 -0.533H30.337c0.32 0 0.533 0.213 0.533 0.533V19.137c0 0.32 -0.213 0.533 -0.533 0.533M1.004 18.604h28.8V14.338h-28.8z"/><path d="M7.938 19.671H4.737c-0.32 0 -0.533 -0.213 -0.533 -0.533v-5.333c0 -0.32 0.213 -0.533 0.533 -0.533H7.938c0.32 0 0.533 0.213 0.533 0.533V19.137c0 0.32 -0.213 0.533 -0.533 0.533m-2.667 -1.067h2.133V14.338H5.271z"/><path d="M21.804 17.004H11.671c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h10.133c0.32 0 0.533 0.213 0.533 0.533 0 0.32 -0.213 0.533 -0.533 0.533"/><path d="M27.137 19.671h-2.133c-0.32 0 -0.533 -0.213 -0.533 -0.533v-5.333c0 -0.32 0.213 -0.533 0.533 -0.533H27.137c0.32 0 0.533 0.213 0.533 0.533V19.137c0 0.32 -0.213 0.533 -0.533 0.533m-1.6 -1.067h1.067V14.338H25.538z"/><path d="M27.671 9.004H1.538c-0.32 0 -0.533 -0.213 -0.533 -0.533V4.204c0 -0.32 0.213 -0.533 0.533 -0.533h26.133c0.32 0 0.533 0.213 0.533 0.533v4.267c0 0.32 -0.213 0.533 -0.533 0.533M2.071 7.938H27.137V4.737H2.071z"/><path d="M9.004 9.004h-3.2c-0.32 0 -0.533 -0.213 -0.533 -0.533V4.204c0 -0.32 0.213 -0.533 0.533 -0.533h3.2c0.32 0 0.533 0.213 0.533 0.533v4.267c0 0.32 -0.213 0.533 -0.533 0.533M6.338 7.938h2.133V4.737H6.338z"/><path d="M19.137 6.871H12.738c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h6.4c0.32 0 0.533 0.213 0.533 0.533s-0.213 0.533 -0.533 0.533"/><path d="M24.471 9.004H22.337c-0.32 0 -0.533 -0.213 -0.533 -0.533V4.204c0 -0.32 0.213 -0.533 0.533 -0.533h2.133c0.32 0 0.533 0.213 0.533 0.533v4.267c0 0.32 -0.213 0.533 -0.533 0.533M22.871 7.938H23.938V4.737h-1.067z"/><path d="M28.738 14.338H3.138c-0.32 0 -0.533 -0.213 -0.533 -0.533v-5.333c0 -0.32 0.213 -0.533 0.533 -0.533h25.6c0.32 0 0.533 0.213 0.533 0.533v5.333c0 0.32 -0.213 0.533 -0.533 0.533M3.671 13.271h24.533v-4.267H3.671z"/><path d="M8.471 14.338H6.338c-0.32 0 -0.533 -0.213 -0.533 -0.533v-5.333c0 -0.32 0.213 -0.533 0.533 -0.533h2.133c0.32 0 0.533 0.213 0.533 0.533v5.333c0 0.32 -0.213 0.533 -0.533 0.533m-1.6 -1.067H7.938v-4.267h-1.067z"/><path d="M26.604 11.671H11.671c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h14.933c0.32 0 0.533 0.213 0.533 0.533 0 0.32 -0.213 0.533 -0.533 0.533"/><path d="M31.404 19.671h-4.8c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h4.8c0.32 0 0.533 0.213 0.533 0.533s-0.213 0.533 -0.533 0.533"/><path d="M31.404 28.204h-4.8c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h4.8c0.32 0 0.533 0.213 0.533 0.533s-0.213 0.533 -0.533 0.533"/><path d="M30.391 23.938H26.657c-0.32 0 -0.533 -0.213 -0.533 -0.533s0.213 -0.533 0.533 -0.533h3.733c0.32 0 0.533 0.213 0.533 0.533 0 0.32 -0.267 0.533 -0.533 0.533"/></g></svg>
      `,
    myopencover: `
         <svg fill="currentColor"  class="icons-counter"  viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>book</title> <path d="M15 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM29 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM31 8h-1v19h-12v1h-5v-1h-12v-19h-1v20h12v1h7.062l-0.062-1h12v-20z"></path> </g></svg>
      `,
    myclosedcover: `
      <svg xmlns="http://www.w3.org/2000/svg" class="icons-counter" version="1.1" viewBox="0 0 100 100">
 <path d="m24 10c-4.9688 0-9 4.0312-9 9v62c0 4.9688 4.0312 9 9 9h58c1.6562 0 3-1.3438 3-3s-1.3438-3-3-3h-2v-8.9336c2.9648-1.4727 5-4.5312 5-8.0664v-48c0-4.9688-4.0312-9-9-9zm54 65.777v8.2227h-53c-2.2109 0-4-1.7891-4-4s1.7891-4 4-4h51c0.6875 0 1.3555-0.078125 2-0.22266zm-18.699-44.141c1.8555-2.043 5.0195-2.1953 7.0625-0.33594 2.043 1.8555 2.1953 5.0195 0.33594 7.0625l-15.293 16.832c-3.3984 3.7383-9.4141 3.7383-12.812 0l-5.293-5.8281c-1.8594-2.043-1.707-5.207 0.33594-7.0625 2.043-1.8555 5.207-1.707 7.0625 0.33984l4.3008 4.7305z" fill-rule="evenodd"/>
`,
    mydustyshelves: `
     
<svg class="icons-counter" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 5 55 50"  xml:space="preserve"><g><path d="M47.9209251,13.6223145l-12.143158,12.1431561c1.4672432,1.1391144,3.3033562,1.824728,5.3002739,1.824728   c4.7791176,0,8.667614-3.8884945,8.667614-8.667614C49.7456551,16.9256706,49.0600395,15.0895548,47.9209251,13.6223145z"/><path d="M11.3283949,51.136364v-2.1818199h23.5596123c0.0458794-1.2473793,0.2651367-2.4640007,0.6806221-3.6423988H10.625802   c-2.3916903,0-4.4158378,1.7354393-4.6086645,3.9524155c-0.1075993,1.2368584,0.2913709,2.4183235,1.1239347,3.3259926   C7.9619174,53.4865074,9.1295309,54,10.3440199,54h25.2991829c-0.31987-0.9706573-0.529274-1.9244041-0.6511917-2.863636   H11.3283949z"/><path d="M41.0780411,10.2549715c-4.7791214,0-8.667614,3.8884945-8.667614,8.667613   c0,1.9969158,0.6856117,3.8330307,1.8247299,5.300272l12.1431541-12.1431561   C44.911068,10.9405851,43.074955,10.2549715,41.0780411,10.2549715z"/><path d="M25.9741688,18.9225845c0-2.5797882,0.6526546-5.009099,1.7975636-7.1356525H10.4100704   c-2.4316401,0-4.4099784,1.9783382-4.4099784,4.410511v28.6799107c1.2230783-1.0835876,2.8560462-1.7470284,4.62571-1.7470284   h25.5063934v-9.9530144C30.2291412,31.1226692,25.9741688,25.5165119,25.9741688,18.9225845z M26.8099289,39.1875H15.3228903   v-2.1818199h11.4870386V39.1875z M26.8099289,33.0617905H15.3228903v-2.181818h11.4870386V33.0617905z"/><path d="M41.0780411,6c-7.125,0-12.9220543,5.7965202-12.9220543,12.9225845c0,7.125,5.7970543,12.9215202,12.9220543,12.9215202   s12.9220505-5.7965202,12.9220505-12.9215202C54.0000916,11.7965202,48.2030411,6,41.0780411,6z M41.0780411,29.7720165   c-5.9824219,0-10.8494339-4.8675423-10.8494339-10.849432s4.867012-10.849431,10.8494339-10.849431   s10.8494301,4.8675423,10.8494301,10.849431S47.060463,29.7720165,41.0780411,29.7720165z"/></g></svg>  </svg>

      `
  };

  const lists = ['myfavorites','mylibrary','myopencover','myclosedcover','mydustyshelves'];
  lists.forEach(key => {
    const iconSvg = icons[key] || icons.library; // fallback icon
    document.write(`
      <div class="col-6 col-lg-4 mb-4">
        <div class="counter__item">
          <div class="counter__item__text profiletxt2">
            ${iconSvg}
            <h2 class="counter_num profiletxt" id="count-${key}">0</h2>
            <p>${key.charAt(0).toUpperCase() + key.slice(1)}</p>
          </div>
        </div>
      </div>
    `);
  });
</script>

          </div>
        </div>
      </div>  
    </div>
  </section>

  <!-- Book Carousels -->
  <div class="container mt-5"  style=" max-width:1500px;">
    <script>
      lists.forEach(key => {
        document.write(`
          <section class="mb-5">
            <div class="row" style="min-height: 460px;">
              <div class="col-md-2 d-flex flex-column justify-content-center align-items-center">
                <h3 class="fw-bold text-center lh-base mb-5 align-items-center">${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              </div>
              <div class="col-md-10">
                <div id="carousel-${key}" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner" id="inner-${key}"></div>

                  <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${key}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carousel-${key}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        `);
      });
    </script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
  // Example slider names — you must define this array somewhere
  // e.g. const lists = ['myfavorites', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];
  lists.forEach(slider => {
    fetch(`get_slider_books.php?slider=${slider}`)
      .then(res => res.json())
      .then(books => {
        document.getElementById(`count-${slider}`).textContent = books.length;
        const inner = document.getElementById(`inner-${slider}`);
        const perSlide = window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : 4;
        let html = '';
        let cardIndex = 0;

        // Process each book
        books.forEach((book, i) => {
          const bookId = book.book_Id || book.book_id; // تأكد من الحقل الصحيح حسب PHP
          if (!bookId) return;

          fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then(res => res.json())
            .then(data => {
              const volumeInfo = data.volumeInfo || {};
              const title = volumeInfo.title
                ? (volumeInfo.title.length > 30 ? volumeInfo.title.slice(0, 30) + '…' : volumeInfo.title)
                : (book.title || 'No Title');
              const author = volumeInfo.authors
                ? volumeInfo.authors.join(', ')
                : (book.author || 'Unknown Author');
              const thumbnail = volumeInfo.imageLinks?.thumbnail
                ? volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
                : 'default-book.png';
              const rating = book.averageRating || 0;
              let starRating = '';
for (let i = 1; i <= 5; i++) {
  starRating += `<span
    class="star ${i <= rating ? 'filled' : ''}"
    data-rating="${rating.toFixed(1)}"
  >★</span>`;
}

              // بناء HTML بعد استلام كل كتاب
              if (cardIndex % perSlide === 0) {
                html += `<div class="carousel-item ${cardIndex === 0 ? 'active' : ''}"><div class="row gx-2">`;
              }
              html += `
                <div class="col-md-3 col-sm-6 px-1" style="min-height: 400px;">
                  <a href="book-detail.html?bookId=${bookId}" class="card-link">
                    <div class="card">
                      <img src="${thumbnail}" class="card-img-top" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='default-book.png';">
                      <div class="card-body">
                        <h5 class="card-title card-link">${title}</h5>
                        <p class="card-text card-link author">${author}</p>
                        <div class="stars" data-rating="${rating}">${starRating}</div>               
                      </div>
                    </div>
                  </a>
                </div>
              `;

              cardIndex++;

              if (cardIndex % perSlide === 0 || cardIndex === books.length) {
                html += `</div></div>`;
              }

              // فقط بعد آخر عنصر يتم رسم المخرجات
              if (cardIndex === books.length) {
                inner.innerHTML = html;
              }
            })
            .catch(err => {
              console.error(`Failed to fetch book info for bookId: ${bookId}`, err);
            });
        });
      })
      .catch(err => console.error(`Failed to load slider: ${slider}`, err));
  });
});

    </script>
  <div id="footer-placeholder"></div>
  <script>
    fetch('footer.html')
      .then(response => response.text())
      .then(html => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const footerEl = temp.querySelector('footer');
        document.getElementById('footer-placeholder').appendChild(footerEl);
      })
      .catch(err => console.error('Error loading footer:', err));
  </script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
></script>

</body>
</html>
