// grids
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.stages__item');

    if (window.innerWidth >= 576) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1 
        });

        items.forEach(item => {
            observer.observe(item);
        });
    } else {
        items.forEach(item => {
            item.classList.add('visible');
        });
    }
});

// plane
document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.stages__img');

    if (window.innerWidth >= 576) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('stages__img--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(img);
    } else {
        img.classList.add('stages__img--visible');
        img.style.position = 'relative'; 
        img.style.top = '-20px'; 
    }
});