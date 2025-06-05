class ThemeManager {
    constructor() {
        this.storageKey = 'hackintoshguide-theme';
        this.init();
    }

    init() {
        // Apply theme before DOM loads to prevent flash
        this.applyTheme();
        
        // Add listeners after DOM loads
        document.addEventListener('DOMContentLoaded', () => {
            this.setupToggleButton();
            this.setupSystemThemeListener();
        });
    }

    applyTheme() {
        const isDark = this.shouldUseDarkTheme();
        document.documentElement.classList.toggle('dark', isDark);
    }

    shouldUseDarkTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setupToggleButton() {
        const button = document.querySelector('.theme-toggle');
        if (!button) return;

        this.updateButtonState(button);
        button.addEventListener('click', () => this.toggleTheme(button));
    }

    toggleTheme(button) {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
        this.updateButtonState(button);
    }

    updateButtonState(button) {
        const isDark = document.documentElement.classList.contains('dark');
        button.textContent = isDark ? '🌙' : '☀️';
        button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    }

    setupSystemThemeListener() {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!localStorage.getItem(this.storageKey)) {
                    document.documentElement.classList.toggle('dark', e.matches);
                    const button = document.querySelector('.theme-toggle');
                    if (button) this.updateButtonState(button);
                }
            });
    }
}

// Initialize theme manager
new ThemeManager();