const AnimationManager = (() => {
    function initPageTransitions() {
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            link.addEventListener('click', e => {
                if (link.target === '_blank') return;
                
                e.preventDefault();
                const href = link.getAttribute('href');
                
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }

    function initStaggeredLists() {
        document.querySelectorAll('.stagger-animate').forEach(container => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                },
                { threshold: 0.1 }
            );
            
            observer.observe(container);
        });
    }

    return {
        init() {
            initPageTransitions();
            initStaggeredLists();
            
            // Add fade-in to main content
            document.querySelector('main')?.classList.add('fade-in');
            
            // Add hover effects to cards
            document.querySelectorAll('.laptop-card').forEach(card => {
                card.classList.add('hover-lift');
            });
        }
    };
})();