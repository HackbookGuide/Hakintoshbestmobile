const IndexPage = (() => {
    /**
     * Initializes JavaScript specific to the index.html (Home) page.
     */
    function init() {
        // console.log("Home page (index.html) specific JavaScript initialized.");

        // Example: If there were specific interactive elements on the home page
        // not covered by global scripts, their event listeners would go here.
        // For instance, if the priority filter buttons on the home page needed JS
        // to dynamically build the URL (though currently they are static links):
        /*
        const priorityButtonsHome = document.querySelectorAll('#priority-filter-buttons a.priority-btn, #priority-filter-buttons a.priority-btn-all');
        priorityButtonsHome.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Current implementation uses direct href, so this is not strictly needed
                // but demonstrates where such logic would go.
                // e.preventDefault(); 
                // const priority = this.dataset.priority;
                // window.location.href = `explorer.html?priority=${priority}`;
            });
        });
        */
    }

    function displayLaptop(laptop) {
        return `
            <div class="laptop-card">
                <img src="${laptop.image}" alt="${laptop.name}" class="laptop-image" 
                     onerror="this.src='assets/images/placeholder.png'">
                <div class="laptop-info">
                    <h3>${laptop.name}</h3>
                    ${ScoreBar.render(laptop.score)}
                    <p>${laptop.summary}</p>
                    <div class="priority-tags">
                        ${laptop.priority.map(p => `<span class="priority-tag">${p}</span>`).join('')}
                    </div>
                    <a href="laptop_details.html?id=${laptop.id}" class="view-details">View Details →</a>
                </div>
            </div>
        `;
    }

    // Helper functions for filtering
    function getByPriority(priority) {
        return Object.values(laptopData).filter(laptop => 
            laptop.priority && laptop.priority.includes(priority)
        );
    }

    function getByScore(minScore) {
        return Object.values(laptopData).filter(laptop => 
            laptop.score >= minScore
        );
    }

    function getTopRated(limit = 5) {
        return Object.values(laptopData)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    function getCompatibleWith(macOSVersion) {
        const version = macOSVersion.toLowerCase();
        return Object.values(laptopData).filter(laptop => {
            const support = laptop.details.macosSupport.toLowerCase();
            return support.includes(version) || 
                   laptop.details.minMacosSupport.toLowerCase().includes(version) ||
                   laptop.details.maxMacosSupport.toLowerCase().includes(version);
        });
    }

    return {
        init
    };
})();
