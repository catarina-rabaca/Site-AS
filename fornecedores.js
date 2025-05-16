const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Count the actual slides
const totalSlides = slider.querySelectorAll('.slide').length;
let currentIndex = 0;

function updateSlider() {
  // Get the width of a single slide
  const slideWidth = slider.querySelector('.slide').offsetWidth;
  
  // Calculate how much to move the slider
  const moveX = slideWidth * currentIndex;
  slider.style.transform = `translateX(-${moveX}px)`;

  // Update button states
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= totalSlides - 1;
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    updateSlider();
  }
});

// Initialize the slider
window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);