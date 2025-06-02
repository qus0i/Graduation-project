document.addEventListener('DOMContentLoaded', () => {
  // ========== STATE MANAGEMENT ==========
  let isAnimating = false;
  let isVideoPlaying = false;
  let textShown = false; // Ensure typewriter runs only once

  // ========== ELEMENT GETTERS ==========
  function getVideoElement() {
    return document.getElementById('transition-video');
  }

  function getTitleElement() {
    return document.querySelector('.typewriter-text');
  }

  function getSubtitleElement() {
    return document.querySelector('.hero-subtitle');
  }

  function setNavClickable(clickable) {
    document.querySelectorAll('.all-nav').forEach(link => {
      link.style.pointerEvents = clickable ? 'auto' : 'none';
      link.style.opacity = clickable ? '1' : '0.6';
    });
  }

  // ========== TYPEWRITER EFFECT ==========
  function typeText(element, text, speed, callback) {
    if (!element || isAnimating) return;
    isAnimating = true;
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
        isAnimating = false;
        if (callback) callback();
      }
    }, speed);
  }

  function startTypewriterAnimation() {
    if (textShown) return;
    textShown = true;

    const titleEl = getTitleElement();
    const subtitleEl = getSubtitleElement();
    if (!titleEl || !subtitleEl) return;

    const titleText = titleEl.dataset.originalText || '';
    const subtitleText = subtitleEl.dataset.originalText || '';

    typeText(titleEl, titleText, 40, () => {
      setTimeout(() => {
        typeText(subtitleEl, subtitleText, 30);
      }, 200);
    });
  }

  // ========== VIDEO HANDLING ==========
  function playIntroVideo() {
    const video = getVideoElement();
    if (!video) {
      // No video element: just show text
      showText();
      return;
    }

    isVideoPlaying = true;
    setNavClickable(false);

    // Store original text & clear elements
    const titleEl = getTitleElement();
    const subtitleEl = getSubtitleElement();
    if (titleEl && subtitleEl) {
      if (!titleEl.dataset.originalText) {
        titleEl.dataset.originalText = titleEl.textContent;
      }
      if (!subtitleEl.dataset.originalText) {
        subtitleEl.dataset.originalText = subtitleEl.textContent;
      }
      titleEl.textContent = '';
      subtitleEl.textContent = '';
    }

    video.src = '/Adv_software/Videos/main.mp4';
    video.load();

    video.onloadeddata = () => {
      video.play().catch(() => handleVideoEnd());
    };

    video.onended = handleVideoEnd;
    video.onerror = () => handleVideoEnd();

    function handleVideoEnd() {
      if (video.duration) {
        video.currentTime = video.duration;
      }
      video.pause();
      isVideoPlaying = false;
      setNavClickable(true);
      showText();
    }
  }

  function showText() {
    startTypewriterAnimation();
  }

  // ========== NAVIGATION HANDLING ==========
  function handleNavigation(event) {
    const link = event.target.closest('a.all-nav');
    if (!link || isAnimating || isVideoPlaying) return;
    event.preventDefault();
    window.location.href = link.getAttribute('href');
  }

  // ========== INITIALIZATION ==========
  function initializeHeroSection() {
    document.addEventListener('click', handleNavigation);
    setTimeout(playIntroVideo, 100);
  }

  // ========== NAVBAR LOADING ==========
  function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) {
      initializeHeroSection();
      return;
    }
    fetch('nav.html')
      .then(res => res.text())
      .then(html => {
        placeholder.innerHTML = html;
        setTimeout(initializeHeroSection, 100);
      })
      .catch(() => initializeHeroSection());
  }

  loadNavbar();
});
