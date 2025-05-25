document.addEventListener('DOMContentLoaded', () => {
  // ========== CONFIGURATION ==========
  const pageMap = {
    'home.php': 'home',
    'genras.html': 'recommendation', 
    'about.html': 'about'
  };

  const videoSources = {
    home: '/Graduation-project/Videos/main.mp4',
    recommendation: '/Graduation-project/Videos/recommendation_intro.mp4', 
    about: '/Graduation-project/Videos/about_intro.mp4'
  };

  // ========== STATE MANAGEMENT ==========
  let isVideoPlaying = false;
  let isAnimating = false;

  // ========== UTILITY FUNCTIONS ==========
  function getCurrentPage() {
    const filename = window.location.pathname.split('/').pop();
    return pageMap[filename] || 'home';
  }

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
    const navLinks = document.querySelectorAll('.all-nav');
    navLinks.forEach(link => {
      if (clickable) {
        link.style.pointerEvents = 'auto';
        link.style.opacity = '1';
      } else {
        link.style.pointerEvents = 'none';
        link.style.opacity = '0.6';
      }
    });
  }

  // ========== TYPEWRITER EFFECTS ==========
  function typeText(element, text, speed = 80, callback) {
    if (!element || isAnimating) return;
    
    isAnimating = true;
    element.textContent = '';
       let i = 0;
    
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent = text.substring(0, i + 1);
        i++;
      } else {
        clearInterval(typeInterval);
        isAnimating = false;
        if (callback) callback();
      }
    }, speed);
  }

  function deleteText(element, speed = 30, callback) {
    if (!element || isAnimating) return;
    
    isAnimating = true;
    const text = element.textContent;
    let i = text.length;
    
    const deleteInterval = setInterval(() => {
      if (i > 0) {
        element.textContent = text.substring(0, i - 1);
        i--;
      } else {
        clearInterval(deleteInterval);
        isAnimating = false;
        if (callback) callback();
      }
    }, speed);
  }

  function startTypewriterAnimation() {
    const titleElement = getTitleElement();
    const subtitleElement = getSubtitleElement();
    
    if (!titleElement || !subtitleElement || isAnimating) return;
    
    // Get original text from data attributes or current content
    const titleText = titleElement.dataset.originalText || titleElement.textContent || getDefaultTitleText();
    const subtitleText = subtitleElement.dataset.originalText || subtitleElement.textContent || getDefaultSubtitleText();
    
    // Store original text
    if (!titleElement.dataset.originalText) {
      titleElement.dataset.originalText = titleText;
    }
    if (!subtitleElement.dataset.originalText) {
      subtitleElement.dataset.originalText = subtitleText;
    }
    
    // Type title first, then subtitle
    typeText(titleElement, titleText, 40, () => {
      setTimeout(() => {
        typeText(subtitleElement, subtitleText, 30);
      }, 200);
    });
  }

  function reverseTypewriterAnimation(callback) {
    const titleElement = getTitleElement();
    const subtitleElement = getSubtitleElement();
    
    if (isAnimating) return;
    
    if (!titleElement || !subtitleElement) {
      if (callback) callback();
      return;
    }
    
    // Delete subtitle first, then title
    deleteText(subtitleElement, 20, () => {
      setTimeout(() => {
        deleteText(titleElement, 20, () => {
          if (callback) callback();
        });
      }, 100);
    });
  }

  function getDefaultTitleText() {
    const currentPage = getCurrentPage();
    const titles = {
      home: 'Welcome to NextChapter',
      recommendation: 'Find Your Genre',
      about: 'About NextChapter'
    };
    return titles[currentPage] || 'Welcome to NextChapter';
  }

  function getDefaultSubtitleText() {
    const currentPage = getCurrentPage();
    const subtitles = {
      home: 'Discover your next literary adventure',
      recommendation: 'Get personalized book recommendations',
      about: 'Learn more about our mission'
    };
    return subtitles[currentPage] || 'Discover your next literary adventure';
  }

  // ========== VIDEO HANDLING ==========
  function playIntroVideo(currentPage) {
    const video = getVideoElement();
    if (!video || isVideoPlaying) return;
    
    const videoSrc = videoSources[currentPage];
    if (!videoSrc) {
      // If no intro video, just start animation
      setTimeout(() => {
        startTypewriterAnimation();
      }, 500);
      return;
    }
    
    isVideoPlaying = true;
    setNavClickable(false);
    
    video.src = videoSrc;
    video.load();
    
    // Start text animation immediately when video starts
    video.onloadeddata = () => {
      video.play().catch(error => {
        console.error('Error playing intro video:', error);
        handleVideoEnd();
      });
      
      // Start typewriter animation as soon as video starts playing
      setTimeout(() => {
        startTypewriterAnimation();
      }, 200);
    };
    
    video.onended = handleVideoEnd;
    
    video.onerror = () => {
      console.warn(`Intro video not found: ${videoSrc}`);
      handleVideoEnd();
    };

    function handleVideoEnd() {
      if (video.duration) {
        video.currentTime = video.duration;
      }
      isVideoPlaying = false;
      setNavClickable(true);
    }
  }

  function playSamePageVideo(currentPage) {
    const video = getVideoElement();
    if (!video || isVideoPlaying) return;
    
    isVideoPlaying = true;
    setNavClickable(false);
    
    const samePageVideoSrc = `/Graduation-project/Videos/${currentPage}_to_${currentPage}.mp4`;
    
    video.src = samePageVideoSrc;
    video.load();
    
    video.onloadeddata = () => {
      video.play().catch(error => {
        console.error('Error playing same page video:', error);
        handleVideoEnd();
      });
      
      // Start reverse animation first
      reverseTypewriterAnimation(() => {
        // Then start new typewriter animation after a short delay
        setTimeout(() => {
          startTypewriterAnimation();
        }, 300);
      });
    };
    
    video.onended = handleVideoEnd;
    
    video.onerror = () => {
      console.warn(`Same page video not found: ${samePageVideoSrc}`);
      handleVideoEnd();
    };

    function handleVideoEnd() {
      if (video.duration) {
        video.currentTime = video.duration;
      }
      isVideoPlaying = false;
      setNavClickable(true);
    }
  }

  function playTransitionVideo(fromPage, toPage, targetHref) {
    const video = getVideoElement();
    if (!video || isVideoPlaying) {
      window.location.href = targetHref;
      return;
    }
    
    isVideoPlaying = true;
    setNavClickable(false);
    
    const transitionVideoSrc = `/Graduation-project/Videos/${fromPage}_to_${toPage}.mp4`;
    
    video.src = transitionVideoSrc;
    video.load();
    
    video.onloadeddata = () => {
      video.play().catch(error => {
        console.error('Error playing transition video:', error);
        navigateToPage();
      });
    };
    
    video.onended = navigateToPage;
    
    video.onerror = () => {
      console.warn(`Transition video not found: ${transitionVideoSrc}`);
      navigateToPage();
    };

    function navigateToPage() {
      if (video.duration) {
        video.currentTime = video.duration;
      }
      setTimeout(() => {
        window.location.href = targetHref;
      }, 200);
    }
  }

  // ========== NAVIGATION HANDLING ==========
  function handleNavigation(event) {
    const link = event.target.closest('a.all-nav');
    if (!link || isVideoPlaying || isAnimating) return;
    
    event.preventDefault();
    
    const currentPage = getCurrentPage();
    const targetHref = link.getAttribute('href');
    const targetFilename = targetHref.split('/').pop();
    const targetPage = pageMap[targetFilename];
    
    // If target page not in our map, navigate normally
    if (!targetPage) {
      window.location.href = targetHref;
      return;
    }
    
    // If same page, play same page video with text animation
    if (currentPage === targetPage) {
      playSamePageVideo(currentPage);
      return;
    }
    
    // Start reverse typewriter animation, then play transition video
    reverseTypewriterAnimation(() => {
      setTimeout(() => {
        playTransitionVideo(currentPage, targetPage, targetHref);
      }, 200);
    });
  }

  // ========== INITIALIZATION ==========
  function initializeHeroSection() {
    const currentPage = getCurrentPage();
    
    // Only initialize if we're on one of the hero pages
    if (!pageMap[window.location.pathname.split('/').pop()]) return;
    
    // Set up navigation event listeners
    document.addEventListener('click', handleNavigation);
    
    // Clear any existing text to prevent glitching
    const titleElement = getTitleElement();
    const subtitleElement = getSubtitleElement();
    
    if (titleElement && subtitleElement) {
      // Store original text before clearing
      if (!titleElement.dataset.originalText) {
        titleElement.dataset.originalText = titleElement.textContent || getDefaultTitleText();
      }
      if (!subtitleElement.dataset.originalText) {
        subtitleElement.dataset.originalText = subtitleElement.textContent || getDefaultSubtitleText();
      }
      
      // Clear text
      titleElement.textContent = '';
      subtitleElement.textContent = '';
    }
    
    // Play intro video for current page
    setTimeout(() => {
      playIntroVideo(currentPage);
    }, 100);
  }

  // ========== NAVBAR LOADING ==========
  function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) {
      // If no placeholder, assume navbar is already loaded
      initializeHeroSection();
      return;
    }
    
    fetch('nav.html')
      .then(response => response.text())
      .then(html => {
        navbarPlaceholder.innerHTML = html;
        // Wait for DOM to update
        setTimeout(() => {
          initializeHeroSection();
        }, 100);
      })
      .catch(error => {
        console.error('Error loading navbar:', error);
        initializeHeroSection();
      });
  }

  // Start the application
  loadNavbar();
});


