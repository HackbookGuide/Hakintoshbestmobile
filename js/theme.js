const ThemeManager = (() => {
    // Attempt to get elements, but don't error out if they don't exist on a particular page
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');

    /**
     * Applies the specified theme to the document and updates icons.
     * @param {string} theme - The theme to apply ('dark' or 'light').
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIconLight) themeIconLight.classList.add('hidden');
            if (themeIconDark) themeIconDark.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeIconLight) themeIconLight.classList.remove('hidden');
            if (themeIconDark) themeIconDark.classList.add('hidden');
        }

        // Update chart themes if ChartManager is available and has the update function
        if (typeof ChartManager !== 'undefined' && ChartManager && typeof ChartManager.updateAllChartThemes === 'function') {
            ChartManager.updateAllChartThemes(theme);
        }
    }

    /**
     * Applies the saved theme from localStorage or system preference.
     */
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(savedTheme);
    }

    /**
     * Initializes the theme manager, setting up the theme toggle listener and applying the initial theme.
     */
    function init() {
        // Apply the theme as early as possible on page load
        applySavedTheme(); 

        if (themeToggle) { 
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme); 
            });
        }
        
        // Listen for theme changes from other tabs/windows (optional but good for consistency)
        window.addEventListener('storage', (event) => {
            if (event.key === 'theme' && event.newValue) {
                applyTheme(event.newValue);
            }
        });
    }
    
    // Expose public methods
    return {
        init,
        applyTheme, // Expose for manual calls if needed, e.g., after dynamic content load
        applySavedTheme
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        html.classList.add('dark');
    }

    // Update theme toggle button state
    const updateToggleState = () => {
        const isDark = html.classList.contains('dark');
        darkModeToggle.setAttribute('aria-checked', isDark.toString());
        darkModeToggle.innerHTML = isDark ? '🌙' : '☀️';
    };

    updateToggleState();

    // Handle theme toggle
    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateToggleState();
    });
});
