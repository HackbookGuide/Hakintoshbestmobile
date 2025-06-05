document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle'); // Select the button
    const html = document.documentElement; // Target the <html> element
    const storageKey = 'theme'; // Key for localStorage

    // Apply theme from localStorage or system preference
    function applyTheme() {
        const savedTheme = localStorage.getItem(storageKey);
        const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        html.classList.toggle('dark', isDark);
        themeToggle.textContent = isDark ? '🌙' : '☀️';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '🌙' : '☀️';
    });

    applyTheme(); // Apply the theme on page load
});
