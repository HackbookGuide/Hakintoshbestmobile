import { ScoreBar } from './components/ScoreBar.js';

// Make ScoreBar available globally if needed
window.ScoreBar = ScoreBar;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme Manager
    if (typeof ThemeManager !== 'undefined' && ThemeManager && typeof ThemeManager.init === 'function') {
        ThemeManager.init(); 
    } else {
        console.warn("ThemeManager is not defined or its init function is missing. Ensure js/theme.js is loaded before js/main.js if theme functionality is expected on this page.");
    }
            
    // Initialize Navigation Manager
    if (typeof NavigationManager !== 'undefined' && NavigationManager && typeof NavigationManager.init === 'function') {
        NavigationManager.init();
    } else {
        console.warn("NavigationManager is not defined or its init function is missing. Ensure js/navigation.js is loaded before js/main.js if navigation functionality is expected on this page.");
    }
            
    // Initialize Animation Manager
    if (typeof AnimationManager !== 'undefined' && AnimationManager && typeof AnimationManager.init === 'function') {
        AnimationManager.init();
    } else {
        console.warn("AnimationManager is not defined or its init function is missing. Ensure js/animation.js is loaded before js/main.js if animation functionality is expected on this page.");
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
                let explorerUrl = 'explorer.html'; // Assuming explorer.html is in the root
                if (searchTerm) {
                    explorerUrl += `?search=${encodeURIComponent(searchTerm)}`;
                }
                window.location.href = explorerUrl; 
            }
        });
    }

    // --- Page-Specific Initializations ---
    // Looks for a data-page-id attribute on the body to call specific page initializers.
    const pageId = document.body.dataset.pageId;

    if (pageId) {
        switch (pageId) {
            case 'home':
                if (typeof IndexPage !== 'undefined' && IndexPage.init) {
                    IndexPage.init();
                } else {
                    // console.log("IndexPage specific script not loaded or init function missing.");
                }
                break;
            case 'explorer':
                if (typeof ExplorerPage !== 'undefined' && ExplorerPage.init) {
                    ExplorerPage.init();
                } else {
                    console.warn("ExplorerPage specific script (js/explorer_page.js) not loaded or ExplorerPage.init function missing.");
                }
                break;
            case 'laptop-detail':
                if (typeof LaptopDetailPage !== 'undefined' && LaptopDetailPage.init) {
                    LaptopDetailPage.init();
                } else {
                    console.warn("LaptopDetailPage specific script (js/laptop_detail_page.js) not loaded or LaptopDetailPage.init function missing.");
                }
                break;
            case 'comparison':
                if (typeof ComparisonPage !== 'undefined' && ComparisonPage.init) {
                    ComparisonPage.init();
                } else {
                    console.warn("ComparisonPage specific script (js/comparison_page.js) not loaded or ComparisonPage.init function missing.");
                }
                break;
            case 'components':
                if (typeof ComponentsPage !== 'undefined' && ComponentsPage.init) {
                    ComponentsPage.init();
                } else {
                     console.warn("ComponentsPage specific script (js/components_page.js) not loaded or ComponentsPage.init function missing.");
                }
                break;
            // Add cases for other pages like 'build-guide', 'essentials', etc.
            // Example:
            // case 'build-guide':
            //     if (typeof BuildGuidePage !== 'undefined' && BuildGuidePage.init) {
            //         BuildGuidePage.init();
            //     }
            //     break;
            default:
                // console.log(`No specific JS initializer for page ID: ${pageId}`);
                break;
        }
    } else {
        console.warn("Body tag is missing 'data-page-id' attribute. Page-specific initializations may not run.");
    }
    
    // Initialize new features
    TooltipManager.init();
    ShortcutManager.init();
    
    // Add tooltips to important elements
    document.querySelectorAll('[data-priority]').forEach(el => {
        el.setAttribute('data-tooltip', 'Click to filter by this priority');
    });
    
    // Initialize search with history
    const searchInput = document.querySelector('#find-bar-header');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            if (e.target.value) {
                SearchHistory.saveSearch(e.target.value);
            }
        });
        
        searchInput.addEventListener('focus', () => {
            SearchHistory.renderSearchSuggestions(searchInput.parentElement);
        });
    }

    // Update laptop display on page load
    updateLaptopDisplay();
});

function updateLaptopDisplay() {
    const laptopsContainer = document.querySelector('#laptops-container');
    const laptops = getCurrentFilteredLaptops();
    
    laptopsContainer.innerHTML = laptops.map(laptop => displayLaptop(laptop)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const laptopContainer = document.getElementById('laptop-container');
    const priorityFilters = document.querySelectorAll('.priority-btn');
    
    // Function to display laptops
    function displayLaptops(laptops) {
        if (!laptopContainer) return;
        
        laptopContainer.innerHTML = laptops.map(laptop => `
            <div class="laptop-card">
                <img src="${laptop.image}" 
                     alt="${laptop.name}" 
                     onerror="this.src='assets/images/placeholder.png'"
                     class="laptop-image">
                <div class="laptop-content">
                    <h3 class="laptop-title">${laptop.name}</h3>
                    ${ScoreBar.render(laptop.score)}
                    <p class="laptop-summary">${laptop.summary}</p>
                    <div class="laptop-priorities">
                        ${laptop.priority.map(p => 
                            `<span class="priority-tag">${p}</span>`
                        ).join('')}
                    </div>
                    <a href="laptop_details.html?id=${laptop.name.toLowerCase().replace(/\s+/g, '_')}" 
                       class="view-details-btn">View Details →</a>
                </div>
            </div>
        `).join('');
    }

    // Initial display of all laptops
    displayLaptops(Object.values(laptopData));

    // Filter functionality
    priorityFilters.forEach(button => {
        button.addEventListener('click', (e) => {
            const priority = e.target.dataset.priority;
            const laptops = priority === 'all' 
                ? Object.values(laptopData)
                : laptopData.getByPriority(priority);
            
            // Update active filter button
            priorityFilters.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');
            
            displayLaptops(laptops);
        });
    });
});
