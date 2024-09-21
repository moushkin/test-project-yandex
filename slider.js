class Slider {
    constructor(slider) {
        this.slider = slider;
        this.wrapper = slider.querySelector('.slider__wrapper');
        this.slides = Array.from(this.wrapper.querySelectorAll('.slider__slide'));
        this.prevButton = slider.querySelector('#prev');
        this.nextButton = slider.querySelector('#next');
        this.paginate = slider.querySelector('.slider__paginate');

        this.currentIndex = 2;
        this.autoSlideDuration = 4000; 
        this.autoSlideTimer = null;
        this.isAnimating = false;
        this.isHovered = false;

        this.cloneSlides();
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.prevButton.addEventListener('click', () => this.handleUserInteraction(this.prevSlide.bind(this)));
        this.nextButton.addEventListener('click', () => this.handleUserInteraction(this.nextSlide.bind(this)));

        this.slider.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.slider.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    cloneSlides() {
        const firstSlide = this.slides[0].cloneNode(true);
        const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);
        const preFirstSlide = this.slides[1].cloneNode(true);
        const preLastSlide = this.slides[this.slides.length - 2].cloneNode(true);

        firstSlide.classList.add('clone');
        lastSlide.classList.add('clone');
        preFirstSlide.classList.add('clone');
        preLastSlide.classList.add('clone');
        
        this.wrapper.appendChild(firstSlide);
        this.wrapper.appendChild(preFirstSlide);
        this.wrapper.insertBefore(preLastSlide, this.slides[0]);
        this.wrapper.insertBefore(lastSlide, preLastSlide);

        this.slides = Array.from(this.wrapper.querySelectorAll('.slider__slide'));
        this.totalSlides = this.slides.length;
    }

    resize() {
        this.windowWidth = window.innerWidth;
        this.sliderWidth = this.slider.clientWidth;
        let slideAmount = 3;

        if (this.windowWidth < 1200) {
            slideAmount = 2;
        }
        if (this.windowWidth < 768) {
            slideAmount = 1;
        }

        const margin = 20; 
        const slideWidth = (this.sliderWidth / slideAmount) - (slideAmount > 1 ? margin : 0);

        this.slides.forEach((slide) => {
            slide.style.width = `${slideWidth}px`;
        });

        this.updateWrapperPosition(true);
    }

    updateWrapperPosition(instant = false) {
        const slideWidth = this.slides[0].clientWidth;
        const margin = this.windowWidth < 576 ? 20 : 20;
        const offset = this.windowWidth < 576 ? -4 : 0; 
        
        this.wrapper.style.transition = instant ? 'none' : 'transform 0.5s ease';
        this.wrapper.style.transform = `translateX(-${(this.currentIndex * (slideWidth + margin) - offset)}px)`;
    
        if (this.currentIndex === 0) {
            this.currentIndex = this.slides.length - 4;
            this.wrapper.style.transition = 'none';
            this.wrapper.style.transform = `translateX(-${(this.currentIndex * (slideWidth + margin) - offset)}px)`;
        } else if (this.currentIndex === 1) {
            this.currentIndex = this.slides.length - 3;
            this.wrapper.style.transition = 'none';
            this.wrapper.style.transform = `translateX(-${(this.currentIndex * (slideWidth + margin) - offset)}px)`;
        } else if (this.currentIndex === this.slides.length - 2) {
            this.currentIndex = 2;
            this.wrapper.style.transition = 'none';
            this.wrapper.style.transform = `translateX(-${(this.currentIndex * (slideWidth + margin) - offset)}px)`;
        } else if (this.currentIndex === this.slides.length - 1) {
            this.currentIndex = 3;
            this.wrapper.style.transition = 'none';
            this.wrapper.style.transform = `translateX(-${(this.currentIndex * (slideWidth + margin) - offset)}px)`;
        }
    
        this.updatePagination();
        this.updateActiveSlide();
    }

    updateActiveSlide() {
        const slideAmount = this.windowWidth < 1200 ? 2 : 3;
    
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            
            if (slideAmount === 2) {
                if (index === this.currentIndex) {
                    slide.classList.add('active');
                }
            } else {
                if (index === this.currentIndex + 1) {
                    slide.classList.add('active');
                }
            }
        });
    }

    prevSlide() {
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateWrapperPosition();
        setTimeout(() => this.isAnimating = false, 500);
    }

    nextSlide() {
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateWrapperPosition();
        setTimeout(() => this.isAnimating = false, 500);
    }

    updatePagination() {
        let realIndex;
    
        if (this.currentIndex === 0) {
            realIndex = this.slides.length - 4;
        } else if (this.currentIndex === 1) {
            realIndex = this.slides.length - 3;
        } else if (this.currentIndex === this.slides.length - 2) {
            realIndex = 2;
        } else if (this.currentIndex === this.slides.length - 1) {
            realIndex = 3;
        } else {
            realIndex = this.currentIndex - 1;
        }
    
        this.paginate.innerHTML = `
            <span class="slide__current">${realIndex}</span>
            <span class="slide__slash">/</span>
            <span class="slide__total">${this.slides.length - 4}</span>
        `;
    }

    startAutoSlide() {
        if (!this.autoSlideTimer) {
            this.autoSlideTimer = setInterval(() => this.nextSlide(), this.autoSlideDuration);
        }
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideTimer);
        this.autoSlideTimer = null;
    }

    handleMouseEnter() {
        this.isHovered = true;
        this.stopAutoSlide();
    }

    handleMouseLeave() {
        this.isHovered = false;
        this.startAutoSlide();
    }

    handleUserInteraction(callback) {
        this.stopAutoSlide();
        callback();
        this.startAutoSlide();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach((slider) => {
        new Slider(slider);
    });
});