const ComponentsPage = (() => {
    let componentTabsContainer;
    let componentContentContainer;

    /**
     * Renders the content for a specific component category.
     * @param {string} key - The key of the component category (e.g., "CPU", "GPU").
     */
    function renderComponentContent(key) {
        if (!componentContentContainer || typeof componentData === 'undefined' || !componentData[key]) {
            console.error("ComponentsPage: DOM element for content or componentData not found for key:", key);
            if (componentContentContainer) {
                componentContentContainer.innerHTML = `<p class="text-red-500">Error: Could not load component details for ${key}.</p>`;
            }
            return;
        }
        
        const data = componentData[key];
        let contentHTML = `<p class="text-center text-medium dark:text-gray-300 mb-6">${data.intro}</p><div class="space-y-4">`;
        
        data.items.forEach(item => {
            let statusClass, icon, darkStatusClass;
            if (item.status === 'good') {
                statusClass = 'border-l-4 border-green-500 bg-green-50';
                darkStatusClass = 'dark:bg-green-900/50 dark:border-green-400';
                icon = '✔';
            } else if (item.status === 'mid') {
                statusClass = 'border-l-4 border-yellow-500 bg-yellow-50';
                darkStatusClass = 'dark:bg-yellow-700/50 dark:border-yellow-400';
                icon = '〰️';
            } else { 
                statusClass = 'border-l-4 border-red-500 bg-red-50';
                darkStatusClass = 'dark:bg-red-900/50 dark:border-red-400';
                icon = '❌';
            }
            contentHTML += `
                <div class="p-4 rounded-lg ${statusClass} ${darkStatusClass}">
                    <h4 class="font-bold text-dark dark:text-gray-100">${icon} ${item.name}</h4>
                    <p class="text-sm text-medium dark:text-gray-300 mt-1">${item.desc}</p>
                </div>
            `;
        });
        contentHTML += `</div>`;
        componentContentContainer.innerHTML = contentHTML;

        // Update active tab class
        if (componentTabsContainer) {
            componentTabsContainer.querySelectorAll('.component-tab').forEach(t => t.classList.remove('active', 'bg-primary', 'text-white', 'dark:bg-blue-600'));
            const activeTab = componentTabsContainer.querySelector(`.component-tab[data-key="${key}"]`);
            if (activeTab) {
                activeTab.classList.add('active', 'bg-primary', 'text-white', 'dark:bg-blue-600');
            }
        }
    }

    /**
     * Initializes the Components page: renders tabs and sets up event listeners.
     */
    function init() {
        console.log("ComponentsPage.init() called"); // For debugging
        componentTabsContainer = document.getElementById('component-tabs');
        componentContentContainer = document.getElementById('component-content');

        if (!componentTabsContainer || !componentContentContainer) {
            console.error("ComponentsPage: Required DOM elements (#component-tabs or #component-content) not found.");
            return;
        }

        if (typeof componentData === 'undefined') {
            console.error("ComponentsPage: componentData is not defined. Ensure js/data.js is loaded.");
            componentContentContainer.innerHTML = `<p class="text-red-500">Error: Component data could not be loaded.</p>`;
            return;
        }

        // Render tabs
        let firstKey = null;
        Object.keys(componentData).forEach((key, index) => {
            if (index === 0) firstKey = key;
            const tab = document.createElement('button');
            tab.innerText = key;
            tab.dataset.key = key;
            // Base classes for tabs
            tab.className = `component-tab font-semibold py-2 px-4 rounded-md cursor-pointer border-2 border-transparent 
                             bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                             hover:bg-gray-300 dark:hover:bg-gray-600`;
            
            tab.addEventListener('click', () => renderComponentContent(key));
            componentTabsContainer.appendChild(tab);
        });
        
        // Render content for the first tab by default
        if (firstKey) {
            renderComponentContent(firstKey);
        } else {
            componentContentContainer.innerHTML = `<p>No component categories found.</p>`;
        }
    }

    return {
        init
    };
})();
