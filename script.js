// Detect system preference and saved theme
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');

// Apply theme based on saved preference or system default
function applyTheme(mode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

applyTheme(saved ? saved : (prefersDark ? 'dark' : 'light'));

// Dark mode toggle button
const btn = document.getElementById('theme-toggle');
if (btn) {
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Project filtering
const filterButtons = document.querySelectorAll('#project-filters button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Reset selected state
    filterButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
    button.setAttribute('aria-selected', 'true');

    // Filter projects by category
    const category = button.getAttribute('data-filter');
    projectCards.forEach(card => {
      const match = category === 'all' || card.getAttribute('data-category') === category;
      card.style.display = match ? 'block' : 'none';
    });
  });
});
