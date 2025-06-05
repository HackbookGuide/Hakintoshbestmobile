const ExplorerPage = (() => {
    let laptopGrid;
    let priorityFilterButtonsContainer;
    let findBarExplorer;
    let noResultsP;
    let compareActionBar;
    let compareSelectedBtn;
    let clearSelectionBtn;
    let selectedCountSpan;
    
    let currentPriorityFilter = "all";
    let currentSearchTerm = "";
    let selectedLaptopsForComparison = [];

    /**
     * Updates the visibility and count of the compare action bar.
     */
    function updateCompareActionBar() {
        const count = selectedLaptopsForComparison.length;
        if (selectedCountSpan) selectedCountSpan.textContent = count;
        if (compareActionBar) {
            compareActionBar.classList.toggle('hidden', count === 0);
        }
        if (compareSelectedBtn) {
            compareSelectedBtn.disabled = count < 2;
        }
    }

    /**
     * Renders laptop cards into the grid based on current filters.
     */
    function renderLaptopsExplorer() {
        if (!laptopGrid) {
            console.error("laptopGrid element not found");
            return;
        }
        if (!window.laptopData) {
            console.error("laptopData is not defined");
            return;
        }
        
        let laptops = [];
        try {
            laptops = Object.entries(window.laptopData).map(([id, data]) => {
                console.log("Processing laptop:", id, data);
                return { id, ...data };
            });
        } catch (error) {
            console.error("Error processing laptopData:", error);
            return;
        }
        console.log("Total laptops found:", laptops.length);

        // Remove the last 4 laptop tiles
        if (laptops.length > 4) {
            laptops = laptops.slice(0, laptops.length - 4);
        }
        console.log("Laptops after removing last 4:", laptops.length);

        // Filter by priority if the filter is not "all"
        if (currentPriorityFilter && currentPriorityFilter !== "all") {
            laptops = laptops.filter(laptop => laptop.priority && 
                    laptop.priority.toLowerCase() === currentPriorityFilter.toLowerCase());
            console.log(`Laptops after applying priority filter (${currentPriorityFilter}):`, laptops.length);
        }

        // Filter by search term if provided
        if (currentSearchTerm && currentSearchTerm.trim() !== "") {
            const term = currentSearchTerm.trim().toLowerCase();
            laptops = laptops.filter(laptop =>
                (laptop.name && laptop.name.toLowerCase().includes(term)) ||
                (laptop.summary && laptop.summary.toLowerCase().includes(term))
            );
            console.log("Laptops after applying search filter:", laptops.length);
        }

        if (laptops.length === 0) {
            laptopGrid.innerHTML = "<p>No laptops found</p>";
            if (noResultsP) noResultsP.classList.remove('hidden');
            return;
        }
        if (noResultsP) noResultsP.classList.add('hidden');
        
        let htmlContent = "";
        laptops.forEach(laptop => {
            let scoreColor = 'bg-green-500';
            if (laptop.score < 5) scoreColor = 'bg-red-500';
            else if (laptop.score < 8) scoreColor = 'bg-yellow-500';

            const isSelected = selectedLaptopsForComparison.includes(laptop.id);
            
            htmlContent += `
                <div class="laptop-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <div class="absolute top-2 right-2 z-10">
                        <input type="checkbox" id="compare-${laptop.id}" data-id="${laptop.id}" class="compare-checkbox h-6 w-6 text-primary rounded border-gray-300 focus:ring-primary dark:bg-gray-600 dark:border-gray-500" ${isSelected ? 'checked' : ''}>
                        <label for="compare-${laptop.id}" class="sr-only">Select ${laptop.name || 'Untitled Laptop'} for comparison</label>
                    </div>
                    <a href="laptop_detail.html?id=${laptop.id}" class="block laptop-card-clickable-area" data-id="${laptop.id}">
                        <img src="${laptop.image || 'assets/images/placeholder.jpg'}" alt="${laptop.name || 'Untitled Laptop'}" class="w-full h-48 object-cover rounded-lg mb-4" onerror="this.src='assets/images/placeholder.jpg'">
                        <h3 class="text-lg font-bold mb-2">${laptop.name || 'Untitled Laptop'}</h3>
                        <p class="text-medium mb-3">${laptop.summary || ''}</p>
                        <div class="score-bar-container">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Score: ${laptop.score}/10</span>
                            <div class="score-bar bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mt-1">
                                <div class="score-bar-fill ${scoreColor} h-2 rounded-full flex items-center justify-center" style="width: ${laptop.score * 10}%;">
                                    <span class="w-full text-xs font-bold text-center" style="color: #fff;">${laptop.score}/10</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });
        
        laptopGrid.innerHTML = htmlContent;
        addCardAndCheckboxListenersExplorer();
        updateCompareActionBar();
    }

    /**
     * Adds event listeners to newly rendered laptop cards and checkboxes.
     */
    function addCardAndCheckboxListenersExplorer() {
        document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                if (e.target.checked) {
                    if (!selectedLaptopsForComparison.includes(id)) {
                        selectedLaptopsForComparison.push(id);
                    }
                } else {
                    selectedLaptopsForComparison = selectedLaptopsForComparison.filter(laptopId => laptopId !== id);
                }
                localStorage.setItem('selectedLaptopsForComparison', JSON.stringify(selectedLaptopsForComparison));
                updateCompareActionBar();
            });
        });
    }
    
    /**
     * Initializes the Explorer page functionalities.
     * This function will be called by js/main.js.
     */
    function init() {
        console.log("ExplorerPage init called"); // For debugging
        
        // Check if laptopData exists and has content
        if (!window.laptopData) {
            console.error("laptopData is not defined!");
            return;
        }
        console.log("Available laptops:", Object.keys(laptopData).length);
        
        // Initialize DOM elements
        laptopGrid = document.getElementById('laptop-grid');
        if (!laptopGrid) {
            console.error("laptop-grid element not found!");
            return;
        }
        priorityFilterButtonsContainer = document.getElementById('priority-filter-buttons-explorer');
        findBarExplorer = document.getElementById('find-bar-explorer');
        noResultsP = document.getElementById('no-results');
        compareActionBar = document.getElementById('compare-action-bar');
        compareSelectedBtn = document.getElementById('compare-selected-btn');
        clearSelectionBtn = document.getElementById('clear-selection-btn');
        selectedCountSpan = document.getElementById('selected-count');

        const storedSelections = localStorage.getItem('selectedLaptopsForComparison');
        if (storedSelections) {
            try {
                selectedLaptopsForComparison = JSON.parse(storedSelections);
            } catch (e) {
                console.error("Error parsing selected laptops from localStorage:", e);
                selectedLaptopsForComparison = [];
                localStorage.removeItem('selectedLaptopsForComparison');
            }
        }

        if (priorityFilterButtonsContainer) {
            const priorityBtnsExplorer = priorityFilterButtonsContainer.querySelectorAll('.priority-btn, .priority-btn-all');
            console.log("Found filter buttons:", priorityBtnsExplorer.length);
            priorityBtnsExplorer.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    console.log("Filter button clicked:", e.currentTarget);
                    currentPriorityFilter = e.currentTarget.dataset.priority;
                    console.log("Setting filter to:", currentPriorityFilter);
                    renderLaptopsExplorer();
                    priorityBtnsExplorer.forEach(b => b.classList.remove('active-filter'));
                    e.currentTarget.classList.add('active-filter');
                });
            });
        }
        
        if (findBarExplorer) {
            findBarExplorer.addEventListener('input', (e) => {
                currentSearchTerm = e.target.value;
                renderLaptopsExplorer();
            });
        }

        if (compareSelectedBtn) {
            compareSelectedBtn.addEventListener('click', () => {
                if (selectedLaptopsForComparison.length >= 2) {
                    window.location.href = 'comparison.html';
                }
            });
        }
        
        if (clearSelectionBtn) {
            clearSelectionBtn.addEventListener('click', () => {
                selectedLaptopsForComparison = [];
                localStorage.setItem('selectedLaptopsForComparison', JSON.stringify(selectedLaptopsForComparison));
                document.querySelectorAll('.compare-checkbox').forEach(cb => cb.checked = false);
                updateCompareActionBar();
            });
        }

        // Process URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const priorityFromUrl = urlParams.get('priority');
        const searchTermFromUrl = urlParams.get('search');

        if (priorityFromUrl && priorityFilterButtonsContainer) {
            currentPriorityFilter = priorityFromUrl;
            const activeBtn = priorityFilterButtonsContainer.querySelector(`[data-priority="${priorityFromUrl}"]`);
            if (activeBtn) {
                priorityFilterButtonsContainer.querySelectorAll('.priority-btn, .priority-btn-all').forEach(b => b.classList.remove('active-filter'));
                activeBtn.classList.add('active-filter');
            }
        } else if (priorityFilterButtonsContainer) { 
             const allBtn = priorityFilterButtonsContainer.querySelector(`[data-priority="all"]`);
             if(allBtn) allBtn.classList.add('active-filter');
        }

        if (searchTermFromUrl) {
            currentSearchTerm = searchTermFromUrl;
            if(findBarExplorer) findBarExplorer.value = searchTermFromUrl;
        }
        
        // Call render after all initialization
        renderLaptopsExplorer();
        updateCompareActionBar();
    }

    return {
        init,
        renderLaptopsExplorer
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    if (window.ExplorerPage && typeof window.ExplorerPage.init === 'function') {
        ExplorerPage.init();
    } else {
        console.error("ExplorerPage or init function not found!");
    }
});

window.ExplorerPage = ExplorerPage;
