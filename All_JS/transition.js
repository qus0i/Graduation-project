document.addEventListener('DOMContentLoaded', () => {
  // ========== VIDEO TRANSITION SETUP ==========
  const video = document.getElementById('transition-video');
  
  // Page mapping
  const pageMap = {
    'home.php': 'home',
    'recommendations.html': 'recommendation',
    'about.html': 'about'
  };

  function getCurrentPage() {
    const f = window.location.pathname.split('/').pop();
    return pageMap[f] || 'home';
  }

  let isPlaying = false;

  // ========== TYPEWRITER EFFECT SETUP ==========
  const titleElement = document.querySelector('.hero-title .typewriter-text');
  const subtitleElement = document.querySelector('.hero-subtitle');
  
  // Initialize typewriter effects
  if (titleElement && subtitleElement) {
    const titleText = titleElement.textContent;
    const subtitleText = subtitleElement.textContent;
    
    titleElement.textContent = '';
    subtitleElement.textContent = '';
    
    // Type title first
    typeText(titleElement, titleText, 0, () => {
      // Then type subtitle after title completes
      typeText(subtitleElement, subtitleText, 0);
    });
  }

  function typeText(element, text, i, callback) {
    if (i < text.length) {
      element.textContent = text.substring(0, i + 1);
      setTimeout(() => typeText(element, text, i + 1, callback), 50);
    } else if (callback) {
      callback();
    }
  }

  // ========== COMBINED FUNCTIONALITY ==========
  const current = getCurrentPage();
  if (current === 'home') {
    video.src = '/videos/Main.mp4';
    video.load();
    video.play();
    video.onended = () => video.pause();
  }

  fetch('nav.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;

      document.getElementById('navbar-placeholder')
        .addEventListener('click', e => {
          const a = e.target.closest('a.all-nav');
          if (!a) return;
          e.preventDefault();
          if (isPlaying) return;

          // 1. First reverse the subtitle
          deleteText(subtitleElement, () => {
            // 2. Then reverse the title
            deleteText(titleElement, () => {
              // 3. After both are gone, play video transition
              const from = current;
              const toFile = a.getAttribute('href').split('/').pop();
              const to = pageMap[toFile];
              
              if (!to || from === to) {
                window.location.href = a.href;
                return;
              }

              isPlaying = true;
              video.src = `/videos/${from}_to_${to}.mp4`;
              video.load();
              video.play();
              video.onended = () => {
                isPlaying = false;
                window.location.href = a.href;
              };
            });
          });
        });
    });

  function deleteText(element, callback) {
    const text = element.textContent;
    let i = text.length;
    
    const deleteInterval = setInterval(() => {
      if (i > 0) {
        element.textContent = text.substring(0, i - 1);
        i--;
      } else {
        clearInterval(deleteInterval);
        if (callback) callback();
      }
    }, 30);
  }
});