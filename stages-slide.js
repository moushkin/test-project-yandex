document.addEventListener('DOMContentLoaded', function() {
    const sliderList = document.querySelector('.stages__list');
    const items = document.querySelectorAll('.stages__item');
    const prevButton = document.getElementById('prevMob');
    const nextButton = document.getElementById('nextMob');
    const dots = document.querySelectorAll('.stages__dot');

    let currentIndex = 0;
    const maxIndex = items.length - 1;

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === maxIndex;
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function showSlide(index) {
        const offset = -index * 100; 
        sliderList.style.transform = `translateX(${offset}%)`;
        currentIndex = index;
        updateButtons();
        updateDots();
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            showSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            showSlide(currentIndex - 1);
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showSlide(index);
        });
    });

    function initializeSlider() {
        if (window.innerWidth <= 576) {
            showSlide(currentIndex);
            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);
        } else {
            sliderList.style.transform = 'none'; 
            currentIndex = 0; 
            updateButtons();
            updateDots();
            nextButton.removeEventListener('click', nextSlide);
            prevButton.removeEventListener('click', prevSlide);
        }
        updateDots(); 
    }

    initializeSlider();
    window.addEventListener('resize', initializeSlider);
});