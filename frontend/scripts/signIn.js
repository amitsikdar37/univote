import {BACKEND_URL} from "../config.js";

window.addEventListener('error', (e) => {
  console.error('Script error:', e.message);
});


document.getElementById("signinForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  document.getElementById('loadingMessage').style.display = 'block';
  document.getElementById('successMessage').style.display = 'none';

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };

  try{
    const response = await fetch(`${BACKEND_URL}/api/SignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })

    document.getElementById('loadingMessage').style.display = 'none';

    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data.message);

      // Show success message
      document.getElementById('successMessage').style.display = 'block';

      // Redirect after short delay
      setTimeout(() => {
          window.location.href = './about2.html';
      }, 1000); // 1 seconds delay
    }
    else {
      const data = await response.json();
      const errors = data.errors || [];

      ['email', 'password'].forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) errorElement.textContent = '';
      });

      errors.forEach(err => {
        const field = err.param || err.path;
        const message = err.msg;
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.textContent = message;

        } else if (field === 'form') {
            const formError = document.getElementById('formError');
            if (formError) formError.textContent = message;

        } else {
            console.error(`${field}: ${message}`);
        }
      });
      console.log(data.errors); // Show them as alerts or in the DOM
    }
  } catch (error) {
    console.error('Error:', error);
    document.open();
    console.error('Error:', error);
    document.close();
  }
});

['email', 'password'].forEach(field => {
  const input = document.getElementById(field);
  const errorElement = document.getElementById(`${field}Error`);
  if (input && errorElement) {
    input.addEventListener('input', () => {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    });
  }
});

// Function to check and show the message if on mobile or tablet
function checkDevice() {
  if (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)) {
      alert("This application is only supported on Windows. It is not supported on Android or mobile devices.");
     window.location.href = "unsupported.html"; // Or window.history.back();
 }
}