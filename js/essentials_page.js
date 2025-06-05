const EssentialsPage = (() => {
    function init() {
        // Initialize staggered animations for timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });

        // Initialize resource link hover effects
        document.querySelectorAll('ul.space-y-3 a').forEach(link => {
            link.classList.add('hover-scale');
        });
    }

    return { init };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.pageId === 'essentials') {
        EssentialsPage.init();
    }
});