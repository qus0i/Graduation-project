document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('transition-video');

  // simple map of filenames → page keys
  const pageMap = {
    'home.php': 'home',
        'recommendations.html': 'recommendation',
    'about.html': 'about'
  };
  function getCurrentPage() {
    const f = window.location.pathname.split('/').pop();
    return pageMap[f] || 'home';
  }

  // Prevent clicks while a video is playing
  let isPlaying = false;

  // 1) On first load, if we’re on Home, play Main.mp4
  const current = getCurrentPage();
  if (current === 'home') {
    video.src = '/videos/Main.mp4';     // adjust path as needed
    video.load();
    video.play();
    video.onended = () => {
      video.pause();                    // freeze on last frame
      video.onended = null;             // clear handler
    };
  }

  // 2) Once navbar is fetched, hook up your transitions
  fetch('nav.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;

      // Delegate clicks on your nav links
      document.getElementById('navbar-placeholder')
        .addEventListener('click', e => {
          const a = e.target.closest('a.all-nav');
          if (!a) return;
          e.preventDefault();
          if (isPlaying) return;

          const from = current;
          const toFile = a.getAttribute('href').split('/').pop();
          const to = pageMap[toFile];
          if (!to || from === to) {
            return window.location.href = a.href;
          }

          // play transition from→to
          isPlaying = true;
          video.src = `/videos/${from}_to_${to}.mp4`;
          video.load();
          video.play();
          video.onended = () => {
            isPlaying = false;
            video.pause();
            window.location.href = a.href;
          };
        });
    });

});
