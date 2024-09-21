document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.createElement('button');
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.display = 'none'; 
    backToTopButton.style.bottom = '30px';
    backToTopButton.style.right = '30px';
    backToTopButton.style.width = '48px';
    backToTopButton.style.height = '48px';
    backToTopButton.style.zIndex = '1000'; 
    backToTopButton.style.backgroundImage = 'url("../img/backtotop-btn.svg")';
    backToTopButton.style.backgroundRepeat = 'no-repeat';
    backToTopButton.style.backgroundPosition = 'contain';
    backToTopButton.style.backgroundColor = 'transparent';
    backToTopButton.style.border = 'none';
    backToTopButton.style.cursor = 'pointer';

    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0 
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                backToTopButton.style.display = 'block'; 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    const supportSection = document.getElementById('support');
    if (supportSection) {
        observer.observe(supportSection);
    }

    window.addEventListener('scroll', () => {
        const supportRect = supportSection.getBoundingClientRect();
        if (window.scrollY > supportRect.bottom) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});