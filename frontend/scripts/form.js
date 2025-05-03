import { BACKEND_URL } from '../config.js';  

const form = document.getElementById('registerForm');
    const emailInput = document.getElementById('emailInput');
    const error = document.getElementById('error');

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Reset errors
      //document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
      
      const formData = {
          firstname: document.getElementById('firstname').value,
          lastname: document.getElementById('lastname').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          confirmPassword: document.getElementById('confirmPassword').value
        };

      try {
          const response = await fetch(`${BACKEND_URL}/api/SignUp`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              credentials: 'include',
              body: JSON.stringify(formData)
            });

          if (!response.ok) {
                const data = await response.json();
                // display data.errors on the form
                console.log(data.errors); // Show them as alerts or in the DOM
            } else {
                const data = await response.json();
                if (data.redirectTo) {
                    window.location.href = `${BACKEND_URL}${data.redirectTo}`;
                }
            }            
        } catch (error) {
            console.error('Error:', error);
            document.open();
            console.error('Error:', error);
            document.close();
        }
  });

  // Real-time password match validation
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const error = document.getElementById('confirmPasswordError');

    if (password !== confirmPassword) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});