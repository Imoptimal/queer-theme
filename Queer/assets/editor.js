document.addEventListener('DOMContentLoaded', () => {
  // 1. Update progress bar width on scroll
    const rainbowTrack = document.getElementById('rainbowTrack');
    if (!rainbowTrack) return;

    function updateScrollProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const scrollRatio = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

      // Smoothly expand bar from left to right on scroll
      rainbowTrack.style.setProperty('transform', `scaleX(${scrollRatio})`, 'important');
    }

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateScrollProgress);
    }, { passive: true });

    // Initialize on load
    updateScrollProgress();

    // 2. Handle click-to-scroll functionality
    const rainbowContainer = document.querySelector('.rainbow-container');
    rainbowContainer.addEventListener('click', (e) => {
      const rect = rainbowContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left; // Horizontal pixel position of click
      const clickRatio = Math.min(Math.max(clickX / rect.width, 0), 1); // Percentage (0.0 to 1.0)

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScrollTop = clickRatio * scrollHeight;

      // Smooth scroll to the equivalent page height
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    });
  });