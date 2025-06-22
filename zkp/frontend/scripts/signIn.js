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

document.getElementById("g_id_signin").addEventListener("click", function () {
  document.getElementById('loadingMessage').style.display = 'block';
  document.getElementById('successMessage').style.display = 'none';

  // Initialize Google Identity Services
  google.accounts.id.initialize({
    client_id: '537966024039-fm932ftvjcdc8v7dqmd7g0lnr1pi5och.apps.googleusercontent.com', // Replace with your actual client ID
    callback: handleCredentialResponse,
  });

  google.accounts.id.prompt(); // Show the Google sign-in popup
});

async function handleCredentialResponse(response) {
  // response.credential contains the Google ID token
  const idToken = response.credential;

  try {
    const res = await fetch(`${BACKEND_URL}/api/SignIn/Google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token: idToken }),
    });

    document.getElementById('loadingMessage').style.display = 'none';

    if (res.ok) {
      const data = await res.json();
      console.log('Success:', data.message || 'Signed in with Google');

      // Show success message
      document.getElementById('successMessage').style.display = 'block';

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = './about2.html';
      }, 1000);
    } else {
      const data = await res.json();
      const errors = data.errors || [];

      // Clear previous errors
      ['email', 'password'].forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) errorElement.textContent = '';
      });

      // Display any errors (e.g., from backend validation)
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
      console.log(data.errors);
    }
  } catch (error) {
    console.error('Error:', error);
    document.open();
    document.close();
  }
}