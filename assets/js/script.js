document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('waitlist-form');
  const confirmation = document.getElementById('confirmation');
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
    
    // Validate form before processing
    if (!validateForm()) {
      return;
    }
    
    const submitBtn = document.getElementById('submit-button');
    
    // Add loading animation
    submitBtn.classList.add('onclic');
    
    // After 2.25 seconds, show validation
    setTimeout(function() {
      submitBtn.classList.remove('onclic');
      submitBtn.classList.add('validate');
      
      // After 1.25 seconds, show confirmation (keep validate state)
      setTimeout(function() {
        form.classList.add('hidden');
        confirmation.classList.remove('hidden');
      }, 1250);
    }, 2250);
  });
}); 