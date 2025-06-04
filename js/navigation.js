const NavigationManager = (() => {
    // Attempt to get elements, but don't error out if they don't exist on a particular page
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Select nav links from both desktop and mobile menus to ensure all are covered for active state
    const navLinks = document.querySelectorAll('header .nav-link, #mobile-menu .nav-link');

    /**
     * Updates the active state of navigation links based on the current page URL.
     */
    function updateActiveLink() {
        if (!navLinks || navLinks.length === 0) return;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Get current file name, default to index.html for root

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref) {
                const linkPath = linkHref.split('/').pop();
                // Check if the link's path matches the current path.
                // Also handle the case where currentPath might be empty (root) and link is to index.html.
                if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                    link.classList.add('active');
                }
            }
        });
    }

    /**
     * Initializes navigation features: mobile menu toggle and active link highlighting.
     */
    function init() {
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Apply dark mode styling to mobile menu if the main theme is dark
                if (document.documentElement.classList.contains('dark')) {
                    mobileMenu.classList.add('dark:bg-gray-800'); // Ensure dark class is specific if needed
                } else {
                    mobileMenu.classList.remove('dark:bg-gray-800');
                }
            });
        }

        // Add event listeners to mobile menu links to close the menu when a link is clicked
        if (mobileMenu) {
            const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                    // Active link state will be updated on page load by updateActiveLink
                });
            });
        }
        
        // Set the active link on initial page load
        updateActiveLink();
    }

    // Expose public methods
    return {
        init,
        updateActiveLink // Expose in case it needs to be called manually after dynamic content changes affecting nav
    };
})();
