// Force page to start at top on reload
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {
  // Ensure page starts at top on reload
  window.scrollTo(0, 0);
  
  // Scroll to hero section on page load
  setTimeout(() => {
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
      heroSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 100);
  const form = document.getElementById('waitlist-form');
  const getStartedBtn = document.getElementById('get-started');
  const navbarGetStartedBtn = document.getElementById('navbar-get-started');
  const waitlistSection = document.getElementById('waitlist');

  if (getStartedBtn && waitlistSection) {
    getStartedBtn.addEventListener('click', function() {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (navbarGetStartedBtn && waitlistSection) {
    navbarGetStartedBtn.addEventListener('click', function() {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    field.placeholder = message;
    field.value = '';
  }

  function hideError(fieldId, originalPlaceholder) {
    const field = document.getElementById(fieldId);
    field.classList.remove('error');
    field.placeholder = originalPlaceholder;
  }

  function validateForm() {
    let isValid = true;
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const name = nameField.value.trim();
    const email = emailField.value.trim();

    // Clear previous errors
    hideError('name', 'Your Name');
    hideError('email', 'Your Email');

    // Validate name
    if (!name) {
      showError('name', 'Please enter your name');
      isValid = false;
    }

    // Validate email
    if (!email) {
      showError('email', 'Please enter your email');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    return isValid;
  }

  // Clear error styling when user starts typing
  document.getElementById('name').addEventListener('input', function() {
    if (this.classList.contains('error')) {
      hideError('name', 'Your Name');
    }
  });

  document.getElementById('email').addEventListener('input', function() {
    if (this.classList.contains('error')) {
      hideError('email', 'Your Email');
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-button');
    
    // Prevent multiple submissions
    if (submitBtn.disabled) {
      return;
    }
    
    // Validate form before processing
    if (!validateForm()) {
      return;
    }
    
    // Disable button to prevent multiple clicks
    submitBtn.disabled = true;
    
    // Add loading animation
    submitBtn.classList.add('onclic');
    
    // After 2.25 seconds, show validation
    setTimeout(function() {
      submitBtn.classList.remove('onclic');
      submitBtn.classList.add('validate');
      
      // Keep form visible with validated button
    }, 2250);
  });

  // Tilt effect for feature cards
  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func.apply(this, args);
    };
  }

  function initTiltEffect() {
    const featureCards = document.querySelectorAll('.feature');
    
    featureCards.forEach(card => {
      const onMouseMove = throttle((e) => {
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        // Update mouse position for cursor-proximity outline
        const mouseXPercent = (x / box.width) * 100;
        const mouseYPercent = (y / box.height) * 100;
        card.style.setProperty('--mouse-x', `${mouseXPercent}%`);
        card.style.setProperty('--mouse-y', `${mouseYPercent}%`);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      }, 50);

      const onMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        // Reset mouse position
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    });
  }

  // Initialize tilt effect
  initTiltEffect();

  // Scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize scroll animations
  initScrollAnimations();

  // Navbar scroll effect
  function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;
    
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Add scroll listener for navbar
  window.addEventListener('scroll', throttle(handleNavbarScroll, 16));

  // Hamburger menu functionality
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  
  // Function to check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 600;
  }
  
  // Function to initialize menu state based on screen size
  function initializeMenuState() {
    if (isMobile()) {
      // On mobile: start closed (hamburger icon)
      hamburgerMenu.classList.remove('active');
      menuOverlay.classList.add('hidden');
    } else {
      // On desktop: start open (X icon)
      hamburgerMenu.classList.add('active');
      menuOverlay.classList.remove('hidden');
    }
  }
  
  // Initialize menu state on load
  initializeMenuState();
  
  // Re-initialize on window resize
  window.addEventListener('resize', initializeMenuState);
  
  if (hamburgerMenu && menuOverlay) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      menuOverlay.classList.toggle('hidden');
    });

    // Removed automatic menu closing - only closes via X button

    // Handle menu item clicks with smooth scrolling
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Check if it's the music link
        if (href === '#music') {
          const musicModal = document.getElementById('music-modal');
          if (musicModal) {
            musicModal.classList.add('active');
          }
        } else {
          // Handle other navigation links
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Music modal functionality
  const musicModal = document.getElementById('music-modal');
  const musicModalClose = document.getElementById('music-modal-close');
  
  if (musicModal && musicModalClose) {
    // Close modal when clicking close button
    musicModalClose.addEventListener('click', function() {
      musicModal.classList.remove('active');
    });

    // Close modal when clicking outside content
    musicModal.addEventListener('click', function(e) {
      if (e.target === musicModal) {
        musicModal.classList.remove('active');
      }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && musicModal.classList.contains('active')) {
        musicModal.classList.remove('active');
      }
    });
  }
}); 