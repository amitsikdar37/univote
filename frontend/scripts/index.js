import { BACKEND_URL } from "../config.js";

const launchButton = document.getElementById("launch-app-btn");

const launchapp = async function launchApp() {
  try{
    const response = await fetch (`${BACKEND_URL}/api/Authenticate`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      window.location.href = './governance.html';
    } else {
      window.location.href = './login.html';
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateUsername() {
    const showUsername = document.getElementById('navbar-username');
    const loginButton = document.getElementById('login-btn');

    try {
        fetch(`${BACKEND_URL}/api/Username`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch username');
            }
        })
        .then(data => {
            if (data.username) {
                showUsername.innerText = data.username;
                showUsername.style.display = 'inline-block'; // Ensure username is visible
                loginButton.style.display = 'none'; // Hide login button
            } else {
                showUsername.innerText = '';
                showUsername.style.display = 'none';
                loginButton.style.display = 'inline-block';
            }
        })
        .catch(error => {
            console.error('Error fetching username:', error);
        });
    } catch (error) {
        console.error('Error in DOMContentLoaded:', error);
    }
};

document.addEventListener('DOMContentLoaded', updateUsername);

// Run when page is shown from bfcache or normal navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        updateUsername();
    }
});

launchButton.addEventListener("click", launchapp);

