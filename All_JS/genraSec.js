// Optional: You can add event listeners for animation effects or interactivity.
document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
    });
  
    card.addEventListener('mouseleave', () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });
  