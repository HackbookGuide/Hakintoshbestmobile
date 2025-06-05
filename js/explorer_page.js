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
            if (count > 0) {
                compareActionBar.classList.remove('hidden');
            } else {
                compareActionBar.classList.add('hidden');
            }
        }
        if (compareSelectedBtn) compareSelectedBtn.disabled = count < 2;
    }

    /**
     * Renders laptop cards into the grid based on current filters.
     */
    function renderLaptopsExplorer() {
        if (!laptopGrid || typeof laptopData === 'undefined' || laptopData === null) {
            console.error("ExplorerPage: laptopGrid or laptopData is not available.");
            if(noResultsP) {
                noResultsP.textContent = "Error: Laptop data could not be loaded or grid element is missing.";
                noResultsP.classList.remove('hidden');
            }
            return;
        }
        laptopGrid.innerHTML = '';
        let laptopsToRender = Object.entries(laptopData);

        // Apply priority filter
        if (currentPriorityFilter !== "all") {
            laptopsToRender = laptopsToRender.filter(([id, data]) => data.priority && data.priority.includes(currentPriorityFilter));
        }

        // Apply search term filter
        if (currentSearchTerm.trim() !== "") {
            const lowerSearchTerm = currentSearchTerm.trim().toLowerCase();
            laptopsToRender = laptopsToRender.filter(([id, data]) => {
                if (data.name && data.name.toLowerCase().includes(lowerSearchTerm)) return true;
                if (data.summary && data.summary.toLowerCase().includes(lowerSearchTerm)) return true;
                if (data.details) {
                    if (data.details.cpu && data.details.cpu.toLowerCase().includes(lowerSearchTerm)) return true;
                    if (data.details.igpu && data.details.igpu.toLowerCase().includes(lowerSearchTerm)) return true;
                    if (data.details.dgpu && data.details.dgpu !== "None" && data.details.dgpu.toLowerCase().includes(lowerSearchTerm)) return true;
                    if (data.details.ram && data.details.ram.toLowerCase().includes(lowerSearchTerm)) return true;
                    if (data.details.storage && data.details.storage.toLowerCase().includes(lowerSearchTerm)) return true;
                }
                return false; 
            });
        }
        
        if (laptopsToRender.length === 0) {
            if(noResultsP) {
                noResultsP.textContent = "No laptops match your current filters.";
                noResultsP.classList.remove('hidden');
            }
        } else {
            if(noResultsP) noResultsP.classList.add('hidden');
        }

        laptopsToRender.forEach(([id, data]) => {
            const scoreColor = data.score >= 80 ? 'bg-green-500' : data.score >= 70 ? 'bg-yellow-500' : 'bg-red-500';
            const isSelected = selectedLaptopsForComparison.includes(id);
            
            const card = `
                <div class="laptop-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover-lift fade-in">
                    <div class="absolute top-2 right-2 z-10">
                        <input type="checkbox" id="compare-${id}" data-id="${id}" class="compare-checkbox h-6 w-6 text-primary rounded border-gray-300 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:checked:bg-primary dark:focus:ring-offset-gray-800" ${isSelected ? 'checked' : ''}>
                        <label for="compare-${id}" class="sr-only">Select ${data.name} for comparison</label>
                    </div>
                    <a href="laptop_detail.html?id=${id}" class="block laptop-card-clickable-area" data-id="${id}">
                        <img src="${data.image}" alt="${data.name}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/212529/F8F9FA?text=Image+Not+Found';">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 text-dark dark:text-gray-100">${data.name}</h3>
                            <p class="text-medium dark:text-gray-300 text-sm mb-4 h-20 overflow-y-auto">${data.summary}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-primary font-bold">Score: ${data.score}/10</span>
                                <a href="laptop_detail.html?id=${id}" class="text-primary hover:underline">View Details →</a>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            laptopGrid.insertAdjacentHTML('beforeend', card);
        });
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
        laptopGrid = document.getElementById('laptop-grid');
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
            priorityBtnsExplorer.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    currentPriorityFilter = e.currentTarget.dataset.priority;
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
        
        renderLaptopsExplorer(); 
        updateCompareActionBar(); 
    }

    return {
        init
    };
})();
