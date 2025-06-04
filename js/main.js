document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme Manager
    // Checks if ThemeManager is defined (i.e., if js/theme.js has been loaded)
    if (typeof ThemeManager !== 'undefined' && ThemeManager && typeof ThemeManager.init === 'function') {
        ThemeManager.init(); 
    } else {
        console.error("ThemeManager is not defined or its init function is missing. Ensure js/theme.js is loaded before js/main.js.");
    }
            
    // Initialize Navigation Manager
    // Checks if NavigationManager is defined (i.e., if js/navigation.js has been loaded)
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
    // This find bar will redirect to explorer.html with the search query
    const findBarHeader = document.getElementById('find-bar-header');
    if (findBarHeader) {
        findBarHeader.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const searchTerm = findBarHeader.value.trim();
                // Construct the URL for explorer.html with the search query
                // Assumes explorer.html is in the same directory or a known relative path
                let explorerUrl = 'explorer.html';
                if (searchTerm) {
                    explorerUrl += `?search=${encodeURIComponent(searchTerm)}`;
                }
                window.location.href = explorerUrl; 
            }
        });
    }

    // --- Page-Specific Initializations (Optional Advanced Approach) ---
    // You could add a data attribute to your <body> tag like <body data-page-id="explorer">
    // Then, main.js could call specific init functions:
    // const pageId = document.body.dataset.pageId;
    // if (pageId === 'explorer' && typeof ExplorerPage !== 'undefined' && ExplorerPage.init) {
    //     ExplorerPage.init();
    // } else if (pageId === 'laptopDetail' && typeof LaptopDetailPage !== 'undefined' && LaptopDetailPage.init) {
    //     LaptopDetailPage.init();
    // } // etc.
    // For now, we are keeping page-specific logic within their respective <script> tags
    // or separate js/page_name.js files that also listen for DOMContentLoaded.
});
