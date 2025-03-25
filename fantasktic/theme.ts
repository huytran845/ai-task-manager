// Function to set theme based on user preference
function applyTheme(): void {
  // Check if a preference is already saved
  const savedTheme: string | null = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.className = savedTheme;
  } else {
    // Check system preference if no saved theme
    const prefersDark: boolean = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    document.documentElement.className = prefersDark ? 'dark' : 'light';
  }
}

// Save the user's choice for future visits
function toggleTheme(): void {
  const currentTheme: string = document.documentElement.className;
  const newTheme: string = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.className = newTheme;
  localStorage.setItem('theme', newTheme);
}

// Apply theme on page load
// Based on this implementation the theme only changes upon page reload due to lack of event listener
document.addEventListener('DOMContentLoaded', applyTheme);
