document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('waitlist-form');
  const getStartedBtn = document.getElementById('get-started');
  const navbarGetStartedBtn = document.getElementById('navbar-get-started');
  const formSection = document.getElementById('form-section');

  if (getStartedBtn && formSection) {
    getStartedBtn.addEventListener('click', function() {
      formSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (navbarGetStartedBtn && formSection) {
    navbarGetStartedBtn.addEventListener('click', function() {
      formSection.scrollIntoView({ behavior: 'smooth' });
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
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      }, 100);

      const onMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
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
}); 