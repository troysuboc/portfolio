const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Start animation
    } else {
      entry.target.classList.remove('visible'); // Reset animation
    }
  });
}, {
  threshold: 0.1 // Trigger when at least 10% is visible
});

// Observe all elements with the animation class
document.querySelectorAll('.animate-slide-up').forEach(el => observer.observe(el));


