const SearchHistory = (() => {
    const MAX_HISTORY = 5;
    
    function saveSearch(term) {
        const history = getSearchHistory();
        const newHistory = [term, ...history.filter(t => t !== term)].slice(0, MAX_HISTORY);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
    
    function getSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    }
    
    function renderSearchSuggestions(container) {
        const history = getSearchHistory();
        if (history.length === 0) return;
        
        const suggestions = document.createElement('div');
        suggestions.className = 'search-suggestions bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mt-1';
        suggestions.innerHTML = history
            .map(term => `<div class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded">${term}</div>`)
            .join('');
            
        container.appendChild(suggestions);
    }
    
    return { saveSearch, getSearchHistory, renderSearchSuggestions };
})();