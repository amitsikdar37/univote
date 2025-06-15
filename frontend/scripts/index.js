import { BACKEND_URL } from "../config.js";

async function fetchGasPrice() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/Gwei`);
    const data = await response.json();

    if (data.status === "1" & data.message === "OK") {
      const gasPrice = parseFloat(data.result.ProposeGasPrice);
      propose.innerText = ` ${gasPrice.toFixed(2)} Gas Fee`;
    } else {
      propose.innerText = "Error!";
    }
  } catch (err) {
    propose.innerText = "API Failed!";
  }
}

fetchGasPrice();
setInterval(fetchGasPrice, 5000);

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
      window.location.href = './about2.html';
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



window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splash-screen');
  const mainContent = document.getElementById('main-content');

  // Splash screen ko 2.5 seconds tak dikhayein
  setTimeout(() => {
      splashScreen.classList.add('hidden'); // Fade out class add karein

      // Splash screen ke poori tarah se gayab hone ke baad (transition duration ke baad)
      // main content ko visible karein
      setTimeout(() => {
          splashScreen.style.display = 'none'; // DOM se remove karein (optional, par accha practice hai)
          mainContent.classList.add('visible'); // Fade in class add karein
      }, 800); // Yeh duration splash screen ke CSS transition se match hona chahiye (0.8s)
  }, 2500); // 2.5 seconds ka delay
});

launchButton.addEventListener("click", launchapp);

