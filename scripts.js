// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscription-form');
  const emailInput = document.getElementById('email');
  const thankYouMessage = document.getElementById('thank-you-message');
  const successModal = document.getElementById('success-modal');
  const closeModalButton = document.getElementById('close-modal');
  
  // Form submission handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    const email = emailInput.value.trim();
    
    // Simple email validation
    if (!validateEmail(email)) {
      console.log('Invalid email:', email);
      alert('Please enter a valid email address');
      return;
    }
    
    console.log('Valid email, proceeding with submission:', email);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('entry.1337209930', email);
      
      // Submit to Google Form
      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSc7HwrkYDiMk9f-sBW4fEHsBbf_MLOwGdTn291FBZ-iQEdxdg/formResponse',
        {
          method: 'POST',
          mode: 'no-cors', // Required to bypass CORS restrictions
          body: formData
        }
      );
      
      console.log('Form submitted successfully');
      
      // Show thank you message
      thankYouMessage.classList.remove('hidden');
      
      // Show success modal
      successModal.classList.remove('hidden');
      
      // Reset form
      form.reset();
      
      // Hide thank you message after 5 seconds
      setTimeout(() => {
        thankYouMessage.classList.add('hidden');
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  });
  
  // Close modal when button is clicked
  closeModalButton.addEventListener('click', () => {
    successModal.classList.add('hidden');
  });
  
  // Close modal when clicking outside of modal content
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.add('hidden');
    }
  });
});

// Email validation function
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
} 