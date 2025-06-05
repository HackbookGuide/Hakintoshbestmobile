const TooltipManager = (() => {
    function init() {
        const tooltips = document.querySelectorAll('[data-tooltip]');
        
        tooltips.forEach(element => {
            element.addEventListener('mouseenter', e => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip absolute bg-gray-900 text-white px-2 py-1 rounded text-sm z-50 fade-in';
                tooltip.textContent = element.dataset.tooltip;
                document.body.appendChild(tooltip);
                
                const rect = element.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
                tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
            });
            
            element.addEventListener('mouseleave', () => {
                document.querySelectorAll('.tooltip').forEach(t => t.remove());
            });
        });
    }
    
    return { init };
})();