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

    return {
        init
    };
})();
