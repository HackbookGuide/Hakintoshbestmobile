const ExplorerPage = (() => {
    // Module-level variables
    let currentPriorityFilters = new Set(["all"]);
    let currentMacOSFilter = "all";
    let currentSearchQuery = "";
    let currentSortOption = "score-desc";
    let minScore = 0;
    let maxScore = 10;
    let laptopGrid = null;
    let priorityFilterButtonsContainer = null;
    let macOSFilterButtons = null;
    let searchInput = null;
    let sortSelect = null;
    let minScoreRange = null;
    let maxScoreRange = null;

    function createLaptopCard(laptop) {
        return `
            <a href="laptop_detail.html?id=${laptop.id}" 
               class="laptop-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div class="flex flex-col h-full">
                    <img src="${laptop.image || 'assets/images/laptops/placeholder.jpg'}" 
                         alt="${laptop.name}" 
                         class="w-full h-48 object-cover rounded-lg mb-4">
                    
                    <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">${laptop.name}</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">${laptop.summary}</p>
                    
                    <!-- Score Bar -->
                    <div class="score-bar-container mb-4">
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Score:</span>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${laptop.score}/10</span>
                        </div>
                        <div class="score-bar bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div class="score-bar-fill bg-primary h-2 rounded-full" 
                                 style="width: ${laptop.score * 10}%"></div>
                        </div>
                    </div>

                    <!-- Display Features -->
                    ${laptop.details.displayFeatures ? `
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Display</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                ${laptop.details.displayFeatures.type} - ${laptop.details.displayFeatures.brightness}
                            </p>
                        </div>
                    ` : ''}

                    <!-- Battery -->
                    ${laptop.details.batteryLife ? `
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Battery</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                ${laptop.details.batteryLife.average} - ${laptop.details.batteryLife.capacity}
                            </p>
                        </div>
                    ` : ''}

                    <!-- Known Issues -->
                    ${laptop.details.knownIssues ? `
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Known Issues</h4>
                            <ul class="text-sm text-gray-600 dark:text-gray-400 list-disc pl-4">
                                ${laptop.details.knownIssues.slice(0, 2).map(issue => 
                                    `<li>${issue}</li>`
                                ).join('')}
                                ${laptop.details.knownIssues.length > 2 ? `<li>+ ${laptop.details.knownIssues.length - 2} more...</li>` : ''}
                            </ul>
                        </div>
                    ` : ''}

                    <!-- Ports Summary -->
                    ${laptop.details.ports ? `
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Ports</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                ${Object.entries(laptop.details.ports)
                                    .filter(([key, value]) => value && value !== "No")
                                    .slice(0, 2)
                                    .map(([key, value]) => 
                                        Array.isArray(value) ? value[0] : value
                                    ).join(', ')}...
                            </p>
                        </div>
                    ` : ''}

                    <!-- Priority Tags -->
                    <div class="mt-auto pt-4 flex flex-wrap gap-2">
                        ${laptop.priority.map(p => `
                            <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                                ${p}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </a>
        `;
    }

    function filterLaptops(laptops) {
        return laptops.filter(laptop => {
            // Priority filter
            const priorityMatch = currentPriorityFilters.has("all") || 
                laptop.priority.some(p => currentPriorityFilters.has(p.toLowerCase()));

            // macOS filter
            const macOSMatch = currentMacOSFilter === "all" || 
                laptop.details.macosSupport.toLowerCase() === currentMacOSFilter.toLowerCase();

            // Score filter
            const scoreMatch = laptop.score >= minScore && laptop.score <= maxScore;

            // Search filter
            const searchMatch = !currentSearchQuery || 
                Object.values(laptop.details)
                    .concat([laptop.name, laptop.summary])
                    .some(value => 
                        typeof value === 'string' && 
                        value.toLowerCase().includes(currentSearchQuery.toLowerCase())
                    );

            return priorityMatch && macOSMatch && scoreMatch && searchMatch;
        });
    }

    function sortLaptops(laptops) {
        return laptops.sort((a, b) => {
            switch (currentSortOption) {
                case "score-desc":
                    return b.score - a.score;
                case "score-asc":
                    return a.score - b.score;
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
    }

    function renderLaptopsExplorer() {
        if (!laptopGrid || !window.laptopData) {
            console.error("Required elements not found");
            return;
        }

        const allLaptops = Object.entries(window.laptopData).map(([id, data]) => ({
            id,
            ...data
        }));

        let filteredLaptops = filterLaptops(allLaptops);
        filteredLaptops = sortLaptops(filteredLaptops);

        if (filteredLaptops.length === 0) {
            laptopGrid.innerHTML = `
                <p class="col-span-3 text-center text-gray-500 dark:text-gray-400 py-8">
                    No laptops found matching your criteria
                </p>`;
            return;
        }

        laptopGrid.innerHTML = filteredLaptops.map(laptop => createLaptopCard(laptop)).join('');
    }

    function updateURL() {
        const url = new URL(window.location.href);
        
        // Update priority filters
        const priorities = Array.from(currentPriorityFilters);
        if (priorities.length === 1 && priorities[0] === "all") {
            url.searchParams.delete("priority");
        } else {
            url.searchParams.set("priority", priorities.join(","));
        }

        // Update other filters
        if (currentMacOSFilter !== "all") url.searchParams.set("macos", currentMacOSFilter);
        else url.searchParams.delete("macos");

        if (currentSearchQuery) url.searchParams.set("search", currentSearchQuery);
        else url.searchParams.delete("search");

        if (currentSortOption !== "score-desc") url.searchParams.set("sort", currentSortOption);
        else url.searchParams.delete("sort");

        if (minScore > 0) url.searchParams.set("min", minScore);
        else url.searchParams.delete("min");

        if (maxScore < 10) url.searchParams.set("max", maxScore);
        else url.searchParams.delete("max");

        window.history.pushState({}, '', url);
    }

    function init() {
        // Get DOM elements
        laptopGrid = document.getElementById('laptop-grid');
        priorityFilterButtonsContainer = document.getElementById('priority-filter-buttons-explorer');
        macOSFilterButtons = document.getElementById('macos-filter-buttons');
        searchInput = document.getElementById('search-input');
        sortSelect = document.getElementById('sort-select');
        minScoreRange = document.getElementById('min-score');
        maxScoreRange = document.getElementById('max-score');

        if (!laptopGrid || !priorityFilterButtonsContainer || !macOSFilterButtons) {
            console.error("Required elements not found");
            return;
        }

        // Set up priority filter buttons
        priorityFilterButtonsContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const priority = button.dataset.priority;
                
                // Toggle active state
                if (priority === "all") {
                    currentPriorityFilters.clear();
                    currentPriorityFilters.add("all");
                    priorityFilterButtonsContainer.querySelectorAll('button').forEach(btn => {
                        btn.classList.remove('active-filter');
                    });
                    button.classList.add('active-filter');
                } else {
                    currentPriorityFilters.delete("all");
                    button.classList.toggle('active-filter');
                    
                    if (button.classList.contains('active-filter')) {
                        currentPriorityFilters.add(priority);
                    } else {
                        currentPriorityFilters.delete(priority);
                    }

                    // If no filters selected, default to "all"
                    if (currentPriorityFilters.size === 0) {
                        currentPriorityFilters.add("all");
                        const allButton = priorityFilterButtonsContainer.querySelector('[data-priority="all"]');
                        if (allButton) allButton.classList.add('active-filter');
                    }
                }

                updateURL();
                renderLaptopsExplorer();
            });
        });

        // macOS filter buttons
        macOSFilterButtons.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                currentMacOSFilter = button.dataset.macos;
                macOSFilterButtons.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('active-filter');
                });
                button.classList.add('active-filter');
                updateURL();
                renderLaptopsExplorer();
            });
        });

        // Score range inputs
        minScoreRange.addEventListener('input', (e) => {
            minScore = parseFloat(e.target.value);
            document.getElementById('min-score-value').textContent = minScore;
            if (minScore > maxScore) {
                maxScore = minScore;
                maxScoreRange.value = minScore;
                document.getElementById('max-score-value').textContent = maxScore;
            }
            updateURL();
            renderLaptopsExplorer();
        });

        maxScoreRange.addEventListener('input', (e) => {
            maxScore = parseFloat(e.target.value);
            document.getElementById('max-score-value').textContent = maxScore;
            if (maxScore < minScore) {
                minScore = maxScore;
                minScoreRange.value = maxScore;
                document.getElementById('min-score-value').textContent = minScore;
            }
            updateURL();
            renderLaptopsExplorer();
        });

        // Handle initial URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('priority')) {
            currentPriorityFilters = new Set(urlParams.get('priority').split(','));
            currentPriorityFilters.forEach(priority => {
                const button = priorityFilterButtonsContainer.querySelector(`[data-priority="${priority}"]`);
                if (button) button.classList.add('active-filter');
            });
        }

        if (urlParams.has('macos')) {
            currentMacOSFilter = urlParams.get('macos');
            const button = macOSFilterButtons.querySelector(`[data-macos="${currentMacOSFilter}"]`);
            if (button) button.classList.add('active-filter');
        }

        if (urlParams.has('search')) {
            currentSearchQuery = urlParams.get('search');
            searchInput.value = currentSearchQuery;
        }

        if (urlParams.has('sort')) {
            currentSortOption = urlParams.get('sort');
            sortSelect.value = currentSortOption;
        }

        if (urlParams.has('min')) {
            minScore = parseFloat(urlParams.get('min'));
            minScoreRange.value = minScore;
            document.getElementById('min-score-value').textContent = minScore;
        }

        if (urlParams.has('max')) {
            maxScore = parseFloat(urlParams.get('max'));
            maxScoreRange.value = maxScore;
            document.getElementById('max-score-value').textContent = maxScore;
        }

        // Initial render
        renderLaptopsExplorer();
    }

    // Helper function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    return { init };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (!window.laptopData) {
        console.error('laptopData is not available');
        return;
    }
    ExplorerPage.init();
});
