const ShortcutManager = (() => {
    const shortcuts = {
        '/': () => document.querySelector('#find-bar-header')?.focus(),
        'Escape': () => document.activeElement.blur(),
        'g h': () => window.location.href = 'index.html',
        'g e': () => window.location.href = 'explorer.html',
        'g c': () => window.location.href = 'components.html'
    };

    function init() {
        let buffer = '';
        let bufferTimeout;

        document.addEventListener('keydown', e => {
            if (e.target.matches('input, textarea')) return;
            
            if (bufferTimeout) clearTimeout(bufferTimeout);
            
            if (e.key === '/') {
                e.preventDefault();
            }
            
            buffer += e.key;
            bufferTimeout = setTimeout(() => buffer = '', 1000);

            if (shortcuts[buffer]) {
                shortcuts[buffer]();
                buffer = '';
            }
        });
    }

    return { init };
})();