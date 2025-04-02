// Function to set theme based on user preference
function applyTheme(): void {
  // If you want theme to be constant and not swap to user's system preference.
  // Check if a preference is already saved
  // const savedTheme: string | null = localStorage.getItem("theme");
  // if (savedTheme) {
  //   document.documentElement.className = savedTheme;
  // } else {
  // Check system preference if no saved theme
  const prefersDark: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const systemTheme: string = prefersDark ? "dark" : "light";
  document.documentElement.className = systemTheme;
  // Saves the theme to local storage for other components
  localStorage.setItem("theme", systemTheme);
  // }
}

// Function to change the theme from its current
function toggleTheme(): void {
  const currentTheme: string = document.documentElement.className;
  const newTheme: string = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.className = newTheme;
  localStorage.setItem("theme", newTheme);
}

// Apply theme on page load
// Based on this implementation the theme only changes upon page reload due to lack of event listener
document.addEventListener("DOMContentLoaded", applyTheme);
