const ComponentsPage = (() => {
    let componentTabsContainer;
    let componentContentContainer;

    function createComponentTab(key, isActive = false) {
        const tab = document.createElement('button');
        tab.className = `component-tab px-4 py-2 rounded-lg font-semibold transition-all hover:bg-opacity-90 scale-in ${
            isActive ? 'bg-primary text-white dark:bg-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`;
        tab.setAttribute('data-component', key);
        tab.textContent = key;
        return tab;
    }

    function renderComponentContent(component) {
        if (!component) return '';
        
        return `
            <div class="component-content-wrapper slide-up">
                <p class="text-lg mb-6 fade-in">${component.intro}</p>
                <div class="grid gap-6 stagger-animate">
                    ${component.items.map(item => `
                        <div class="bg-secondary dark:bg-gray-700 p-4 rounded-lg fade-in">
                            <div class="flex items-start gap-4">
                                <span class="status-indicator ${item.status}"></span>
                                <div>
                                    <h4 class="font-semibold mb-2">${item.name}</h4>
                                    <p class="text-medium dark:text-gray-300 text-sm">${item.desc}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
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
            const tab = createComponentTab(key, index === 0);
            
            tab.addEventListener('click', () => {
                // Update active tab
                componentTabsContainer.querySelectorAll('.component-tab').forEach(t => t.classList.remove('active', 'bg-primary', 'text-white', 'dark:bg-blue-600'));
                tab.classList.add('active', 'bg-primary', 'text-white', 'dark:bg-blue-600');
                
                // Render content
                componentContentContainer.innerHTML = renderComponentContent(componentData[key]);
            });
            
            componentTabsContainer.appendChild(tab);
        });
        
        // Render content for the first tab by default
        if (firstKey) {
            componentContentContainer.innerHTML = renderComponentContent(componentData[firstKey]);
        } else {
            componentContentContainer.innerHTML = `<p>No component categories found.</p>`;
        }
    }

    return {
        init
    };
})();
