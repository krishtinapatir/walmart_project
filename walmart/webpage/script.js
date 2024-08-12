let currentIndex = 0;

function nextSlide() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first slide if at the end
    }
    updateCarouselPosition();
}

function prevSlide() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1; // Loop back to the last slide if at the beginning
    }
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const track = document.querySelector('.carousel-track');
    const slideWidth = document.querySelector('.carousel-slide').offsetWidth;
    const moveAmount = slideWidth * currentIndex;
    
    track.style.transform = `translateX(-${moveAmount}px)`;
}
