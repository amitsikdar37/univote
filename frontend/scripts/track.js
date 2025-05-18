import { BACKEND_URL } from "../config.js"; 

window.addEventListener('DOMContentLoaded', async () => {
  // Wait for config.js to set BACKEND_URL
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    const response = await fetch(`${BACKEND_URL}/api/Verify-Token`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      window.location.href = './login.html';
      return;
    }

    document.getElementById('loading-screen')?.remove();
    document.body.style.display = 'block';
  } catch (err) {
    console.error("Token verification error:", err);
    window.location.href = './login.html';
  }
});
