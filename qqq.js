<div class="d-flex gap-3 my-3">

  <!-- Favorite -->
  <button type="button" id="favorite-button" class="heart-button"
    data-tooltip-inactive="Add to Favorites"
    data-tooltip-active="Remove from Favorites"
    data-tooltip="Add to Favorites">
    <!-- You can add icon here if needed -->
    <svg id="favorite-icon-default" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#f00" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  </button>

  <!-- Library -->
  <button type="button" id="library-toggle-button" class="library-icon-wrapper"
    data-tooltip-inactive="Add to My Library"
    data-tooltip-active="Remove from My Library"
    data-tooltip="Add to My Library">
    <svg id="library-icon-default" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><rect width="24" height="24" fill="#f9c172"/></svg>
    <svg id="library-icon-active" class="hidden" width="32" height="32" fill="black" viewBox="0 0 24 24"><rect width="24" height="24" fill="black"/></svg>
  </button>

  <!-- Open Cover -->
  <button type="button" id="openCover-toggle-button" class="openCover-icon-wrapper"
    data-tooltip-inactive="Add to My Open Cover List"
    data-tooltip-active="Remove from My Open Cover List"
    data-tooltip="Add to My Open Cover List">
    <svg id="openCover-icon-default" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#8ecae6"/></svg>
    <svg id="openCover-icon-active" class="hidden" width="32" height="32" fill="black" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="black"/></svg>
  </button>

  <!-- Closed Cover -->
  <button type="button" id="closedCover-toggle-button" class="closedCover-icon-wrapper"
    data-tooltip-inactive="Add to My Closed Cover List"
    data-tooltip-active="Remove from My Closed Cover List"
    data-tooltip="Add to My Closed Cover List">
    <svg id="closedCover-icon-default" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><rect width="24" height="24" fill="#ffb703"/></svg>
    <svg id="closedCover-icon-active" class="hidden" width="32" height="32" fill="black" viewBox="0 0 24 24"><rect width="24" height="24" fill="black"/></svg>
  </button>

  <!-- Dusty Shelves -->
  <button type="button" id="dustyShelves-toggle-button" class="dustyShelves-icon-wrapper"
    data-tooltip-inactive="Add to My Dusty Shelves List"
    data-tooltip-active="Remove from My Dusty Shelves List"
    data-tooltip="Add to My Dusty Shelves List">
    <svg id="dustyShelves-icon-default" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="12" ry="8" fill="#d9d9d9"/></svg>
    <svg id="dustyShelves-icon-active" class="hidden" width="32" height="32" fill="black" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="12" ry="8" fill="black"/></svg>
  </button>

</div>
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('bookId');
  const apiURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  let book = null;
  let image = '';

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      book = data.volumeInfo;
      image = book.imageLinks
        ? book.imageLinks.thumbnail.replace('http://', 'https://').replace('zoom=1', 'zoom=3')
        : 'https://via.placeholder.com/400x600';

      const buttonConfigs = [
        { id: 'favorite-button', table: 'myfavorites' },
        { id: 'library-toggle-button', table: 'mylibrary', iconDefault: 'library-icon-default', iconActive: 'library-icon-active' },
        { id: 'openCover-toggle-button', table: 'myopencover', iconDefault: 'openCover-icon-default', iconActive: 'openCover-icon-active' },
        { id: 'closedCover-toggle-button', table: 'myclosedcover', iconDefault: 'closedCover-icon-default', iconActive: 'closedCover-icon-active' },
        { id: 'dustyShelves-toggle-button', table: 'mydustyshelves', iconDefault: 'dustyShelves-icon-default', iconActive: 'dustyShelves-icon-active' }
      ];

      buttonConfigs.forEach(cfg => {
        const btn = document.getElementById(cfg.id);
        if (!btn) return;

        // Handle toggle click
        btn.addEventListener('click', function () {
          btn.disabled = true;
          const payload = {
            table: cfg.table,
            title: book?.title || '',
            authors: book?.authors?.join(', ') || '',
            thumbnail: image
          };

          fetch('/Graduation-project/ALL_JS/toggle_book.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
            .then(res => res.json())
            .then(data => {
              if (data.status === 'added') {
                setButtonState(btn, true, cfg);
              } else if (data.status === 'removed') {
                setButtonState(btn, false, cfg);
              }
            })
            .catch(err => console.error(err))
            .finally(() => {
              btn.disabled = false;
            });
        });

        // Check initial state
        const checkPayload = {
          table: cfg.table,
          title: book?.title || '',
          authors: book?.authors?.join(', ') || ''
        };
        fetch('/Graduation-project/ALL_JS/check_book.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkPayload)
        })
          .then(res => res.json())
          .then(data => {
            setButtonState(btn, !!data.exists, cfg);
          });
      });

      // Utility: set button state, icon, and tooltip
      function setButtonState(btn, isActive, cfg) {
        if (isActive) {
          btn.classList.add('active');
          if (cfg.iconDefault && cfg.iconActive) {
            document.getElementById(cfg.iconDefault)?.classList.add('hidden');
            document.getElementById(cfg.iconActive)?.classList.remove('hidden');
          }
          if (btn.getAttribute('data-tooltip-active'))
            btn.setAttribute('data-tooltip', btn.getAttribute('data-tooltip-active'));
        } else {
          btn.classList.remove('active');
          if (cfg.iconDefault && cfg.iconActive) {
            document.getElementById(cfg.iconDefault)?.classList.remove('hidden');
            document.getElementById(cfg.iconActive)?.classList.add('hidden');
          }
          if (btn.getAttribute('data-tooltip-inactive'))
            btn.setAttribute('data-tooltip', btn.getAttribute('data-tooltip-inactive'));
        }
      }
    });
});
.hidden {
  display: none !important;
}
.heart-button.active svg path {
  fill: #f00 !important;
}
button[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  background: #333;
  color: #fff;
  padding: 4px 12px;
  border-radius: 6px;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 13px;
  z-index: 50;
}
