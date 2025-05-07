import { BACKEND_URL } from "../config.js";

async function fetchGasPrice() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/Gwei`);
    const data = await response.json();

    if (data.status === "1" & data.message === "OK") {
      propose.innerText = ` ${data.result.ProposeGasPrice} Gas Fee`;
    } else {
      propose.innerText = "Error!";
    }
  } catch (err) {
    propose.innerText = "API Failed!";
  }
}

fetchGasPrice();
setInterval(fetchGasPrice, 5000);

// Function to check and show the message if on mobile or tablet
//  function checkDevice() {
//    if (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)) {
//        alert("This application is only supported on Windows. It is not supported on Android or mobile devices.");
//       window.location.href = "unsupported.html"; // Or window.history.back();
//   }
// }

// Initial check when page loads
checkDevice();

// Check on window resize
window.addEventListener('resize', function() {
  checkDevice();
});

const launchButton = document.getElementById("launch-app-btn");
const registerButton = document.getElementById("register-btn");

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
      window.location.href = './sign-in.html';
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

launchButton.addEventListener("click", launchapp);
