document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId'); // Get bookId from the URL
  
    const apiURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const book = data.volumeInfo;
        const title = book.title;
        const authors = book.authors ? book.authors.join(', ') : 'Unknown';
        const description = book.description || 'No description available';
        const image = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150';
  
        const bookDetailsContent = `
          <h1>${title}</h1>
          <h3>by ${authors}</h3>
          <img src="${image}" alt="Book Image">
          <p>${description}</p>
        `;
  
        document.getElementById('bookDetails').innerHTML = bookDetailsContent;
      })
      .catch(error => console.error('Error fetching book details:', error));
  });
  