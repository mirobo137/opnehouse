document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations
    const animatedElements = document.querySelectorAll('.animate-slow');
    
    // Slight delay to allow background to load
    setTimeout(() => {
        animatedElements.forEach(el => el.classList.add('show'));
    }, 500);

    // 2. Confetti Effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // 3. Carousel Logic
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = Array.from(carouselItems).findIndex(item => item.classList.contains('active'));
    
    const animClasses = ['anim-1', 'anim-2', 'anim-3', 'anim-4'];

    function applyRandomAnim(item) {
        animClasses.forEach(c => item.classList.remove(c));
        const randomClass = animClasses[Math.floor(Math.random() * animClasses.length)];
        item.classList.add(randomClass);
    }

    // Fallback if none are active
    if (currentIndex === -1) {
        currentIndex = 0;
        carouselItems[0].classList.add('active');
    }
    applyRandomAnim(carouselItems[currentIndex]);

    function nextSlide() {
        carouselItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % carouselItems.length;
        carouselItems[currentIndex].classList.add('active');
        applyRandomAnim(carouselItems[currentIndex]);
    }

    setInterval(nextSlide, 6000); // Change image every 6 seconds

    // 4. Subtle Shimmer Effect for the Button
    const button = document.querySelector('.cta-button');
    setInterval(() => {
        button.style.transform = 'translateY(-3px) scale(1.02)';
        setTimeout(() => {
            button.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }, 3000);
});
