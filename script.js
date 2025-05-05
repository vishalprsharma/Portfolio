// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // 1. Carousel Functionality
  const initCarousel = () => {
      const carousel = document.querySelector('.carousel');
      if (!carousel) return;
      
      const prevBtn = document.querySelector('.carousel-prev');
      const nextBtn = document.querySelector('.carousel-next');
      const slides = document.querySelectorAll('.carousel-slide');
      let currentIndex = 0;

      function showSlide(index) {
          slides.forEach((slide, i) => {
              slide.style.transform = `translateX(${(i - index) * 100}%)`;
          });
      }

      if (prevBtn && nextBtn) {
          prevBtn.addEventListener('click', () => {
              currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
              showSlide(currentIndex);
          });

          nextBtn.addEventListener('click', () => {
              currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
              showSlide(currentIndex);
          });

          showSlide(currentIndex);
      }
  };

  // 2. Smooth Scrolling (single instance)
  const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                  target.scrollIntoView({
                      behavior: 'smooth'
                  });
              }
          });
      });
  };

  // 3. Sticky Header
  const initStickyHeader = () => {
      const header = document.querySelector('header');
      if (!header) return;
      
      const sticky = header.offsetTop;
      function handleScroll() {
          if (window.pageYOffset > sticky) {
              header.classList.add('sticky');
          } else {
              header.classList.remove('sticky');
          }
      }
      window.addEventListener('scroll', handleScroll);
  };

  // 4. Back to Top Button
  const initBackToTop = () => {
      const backToTopBtn = document.createElement('button');
      backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
      backToTopBtn.className = 'back-to-top';
      document.body.appendChild(backToTopBtn);

      function toggleBackToTopButton() {
          if (window.scrollY > 300) {
              backToTopBtn.style.display = 'block';
          } else {
              backToTopBtn.style.display = 'none';
          }
      }

      backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', toggleBackToTopButton);
  };

  // 5. Active Navigation Highlight
  const initActiveNav = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');

      if (sections.length === 0 || navLinks.length === 0) return;

      function highlightNavLink() {
          let index = sections.length;
          while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
          navLinks.forEach((link) => link.classList.remove('active'));
          if (navLinks[index]) navLinks[index].classList.add('active');
      }

      window.addEventListener('scroll', highlightNavLink);
  };
  const addSwipeSupport = (carousel) => {
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            // swipe left → next slide
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            showSlide(currentIndex);
        } else if (endX - startX > 50) {
            // swipe right → previous slide
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            showSlide(currentIndex);
        }
    });
};

// In initCarousel:
addSwipeSupport(carousel);
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    initStickyHeader();
}
window.addEventListener('resize', () => {
    // Recalculate breakpoints, maybe reinitialize some behaviors
});

  // Initialize all components
  initCarousel();
  initSmoothScroll();
  initStickyHeader();
  initBackToTop();
  initActiveNav();
});
// Add this to your existing script.js
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger-icon');
    const navItems = document.querySelector('.nav-items');
    
    if (hamburger && navItems) {
      hamburger.addEventListener('click', () => {
        navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
      });
    }
  };
  
  // Call this in your initialization
  initMobileMenu();
  // Add this to your existing script
const addTouchSupport = () => {
    // Prevent 300ms delay on touch devices
    document.addEventListener('touchstart', function() {}, true);
    
    // Improve touch feedback
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });
      
      el.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
      });
    });
  };
  
  // Call this in your initialization
  addTouchSupport();