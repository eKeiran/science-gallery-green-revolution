document.addEventListener('DOMContentLoaded', function() {
    const slides = [
        { img: 'meme12.jpeg' },
        { img: 'meme2.jpeg' },
        // { img: 'meme1.jpeg' },
        { img: 'meme3.jpeg' },
        { img: 'meme4.jpeg' },
        { img: 'meme5.jpeg' },
        { img: 'meme6.jpeg' },
        // { img: 'meme7.jpeg' },
        { img: 'meme9.jpeg' },
        { img: 'meme8.jpeg' },
        { img: 'meme11.jpeg' },
        { img: 'meme10.jpeg' },
    ];

    const slideshow = document.querySelector('.slideshow');
    const indicatorsContainer = document.querySelector('.indicators');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;

    // Create slides and indicators
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
        slideElement.innerHTML = `
            <img src="assets/img/${slide.img}" alt="Meme ${index + 1}">        `;
        slideshow.appendChild(slideElement);

        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.dataset.index = index;
        indicatorsContainer.appendChild(indicator);
    });

    const allSlides = document.querySelectorAll('.slide');
    const allIndicators = document.querySelectorAll('.indicator');

    function updateSlides() {
        allSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.style.animation = 'slideIn 0.8s ease-in-out';
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            }
        });

        allIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    indicatorsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicator')) {
            goToSlide(parseInt(e.target.dataset.index));
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Initial update
    updateSlides();
});