// Same effects as in front-end (copy-paste)
document.addEventListener('DOMContentLoaded', () => {
      const scrollPaths = document.querySelectorAll('.scroll-path');
      const scrollPercentageText = document.getElementById('scrollPercentage');

      // Store individual path lengths
      const pathLengths = [];

      scrollPaths.forEach((path, index) => {
        const length = path.getTotalLength();
        pathLengths[index] = length;
        // Initialize dash array and offset so line starts completely hidden
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        let scrollRatio = 0;
        if (totalScrollableHeight > 0) {
          scrollRatio = Math.min(Math.max(scrollTop / totalScrollableHeight, 0), 1);
        }

        // Update stroke-dashoffset on each path based on scroll progress
        scrollPaths.forEach((path, index) => {
          const length = pathLengths[index];
          const newOffset = length * (1 - scrollRatio);
          path.style.strokeDashoffset = `${newOffset}`;
        });

        // Update UI Percentage Badge
        if (scrollPercentageText) {
          scrollPercentageText.textContent = `${Math.round(scrollRatio * 100)}%`;
        }
      }

      // Event listeners
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
      window.addEventListener('resize', () => {
        // Recalculate path lengths on window resize
        scrollPaths.forEach((path, index) => {
          const length = path.getTotalLength();
          pathLengths[index] = length;
          path.style.strokeDasharray = `${length}`;
        });
        updateScrollProgress();
      }, { passive: true });
});