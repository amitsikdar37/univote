import {BACKEND_URL} from "../config.js";

window.addEventListener('error', (e) => {
  console.error('Script error:', e.message);
});


document.getElementById("signinForm").addEventListener("submit", async function(e) {
  e.preventDefault();
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
    if (response.ok) {
      window.location.href = response.url;
    }
    else {
      const errorMessage = document.getElementById("errorMessage");
      errorMessage.textContent = "Invalid email or password";
      errorMessage.style.display = "block";
    }
  } catch (error) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "An error occurred. Please try again later.";
    errorMessage.style.display = "block";
  }
});