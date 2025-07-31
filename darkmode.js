  const darkModeToggle = document.getElementById('darkmode-toggle');
  const pfpElements = document.querySelectorAll('.pfp');

  // Set initial theme from localStorage
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';

    document.documentElement.classList.toggle('light-mode', isLight);
    pfpElements.forEach(el => el.classList.toggle('light-mode', isLight));
    darkModeToggle.checked = isLight;
  });

  // Toggle theme and save preference
  darkModeToggle.addEventListener('change', () => {
    const isChecked = darkModeToggle.checked;

    document.documentElement.classList.toggle('light-mode', isChecked);
    pfpElements.forEach(el => el.classList.toggle('light-mode', isChecked));
    localStorage.setItem('theme', isChecked ? 'light' : 'dark');
  });

