document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme Manager
    if (typeof ThemeManager !== 'undefined' && ThemeManager && typeof ThemeManager.init === 'function') {
        ThemeManager.init(); 
    } else {
        console.error("ThemeManager is not defined or its init function is missing. Ensure js/theme.js is loaded before js/main.js.");
    }
            
    // Initialize Navigation Manager
    if (typeof NavigationManager !== 'undefined' && NavigationManager && typeof NavigationManager.init === 'function') {
        NavigationManager.init();
    } else {
        console.error("NavigationManager is not defined or its init function is missing. Ensure js/navigation.js is loaded before js/main.js.");
    }
            
    // Set the current year in the footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Global Header Find Bar functionality
    const findBarHeader = document.getElementById('find-bar-header');
    if (findBarHeader) {
        findBarHeader.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const searchTerm = findBarHeader.value.trim();
                let explorerUrl = 'explorer.html';
                if (searchTerm) {
                    explorerUrl += `?search=${encodeURIComponent(searchTerm)}`;
                }
                window.location.href = explorerUrl; 
            }
        });
    }

    // --- Page-Specific Initializations ---
    const pageId = document.body.dataset.pageId;

    if (pageId === 'home' && typeof IndexPage !== 'undefined' && IndexPage.init) {
        IndexPage.init();
    } else if (pageId === 'explorer' && typeof ExplorerPage !== 'undefined' && ExplorerPage.init) {
        ExplorerPage.init(); // This will call the init function from js/explorer_page.js
    } else if (pageId === 'laptop-detail' && typeof LaptopDetailPage !== 'undefined' && LaptopDetailPage.init) {
        // LaptopDetailPage.init(); // Assuming js/laptop_detail_page.js also exposes an init
    } else if (pageId === 'comparison' && typeof ComparisonPage !== 'undefined' && ComparisonPage.init) {
        // ComparisonPage.init(); // Assuming js/comparison_page.js also exposes an init
    }
    // ... any other page-specific initializations
});
