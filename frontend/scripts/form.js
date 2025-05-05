import { BACKEND_URL } from '../config.js'; 

window.addEventListener('error', (e) => {
    console.error('Script error:', e.message);
});

const form = document.getElementById('registerForm');
    const error = document.getElementById('error');

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      document.getElementById('loadingMessage').style.display = 'block';
      document.getElementById('successMessage').style.display = 'none';
      
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

            document.getElementById('loadingMessage').style.display = 'none';

            if (!response.ok) {
                const data = await response.json();
                // display data.errors on the form
                const errors = data.errors || [];

                // Clear all previous errors
                ['firstname', 'lastname', 'email', 'password', 'confirmPassword'].forEach(field => {
                    const errorElement = document.getElementById(`${field}Error`);
                    if (errorElement) errorElement.textContent = '';
                });
                
                // Display new errors
                errors.forEach(err => {
                    const field = err.param;
                    const message = err.msg;
                    const errorElement = document.getElementById(`${field}Error`);
                if (errorElement) {
                    errorElement.textContent = message;

                } else if (field === 'form') {
                    // Display a global form error somewhere (you can add a div with id="formError")
                    const formError = document.getElementById('formError');
                    if (formError) formError.textContent = message;

                } else {
                // fallback if some unknown error
                console.error(`${field}: ${message}`);
                }
            });
            console.log(data.errors); // Show them as alerts or in the DOM
            } else {
                const data = await response.json();
                console.log('Success:', data.message);

                // Show success message
                document.getElementById('successMessage').style.display = 'block';

                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = './about2.html';
                }, 2000); // 2 seconds delay
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