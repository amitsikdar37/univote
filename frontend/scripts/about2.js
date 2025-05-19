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

async function fetchGasPrice() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/Gwei`);
    const data = await response.json();

    if (data.status === "1" && data.message === "OK") {
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

const connectWalletButton = document.getElementById('connectWalletBtn');

const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try{
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      const walletAddress = accounts[0];
      document.getElementById('walletAddress').textContent = `Connected: ${walletAddress}`;
      connectWalletButton.style.display = "none";
    } catch(error){
      console.error("User rejected connection or other error", error);
    }
  } else {
    alert("Please install MetaMask to use this feature.");
  }
}

connectWalletButton.addEventListener('click', connectWallet);

// Function to check and show the message if on mobile or tablet
function checkDevice() {
  if (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)) {
      alert("This application is only supported on Windows. It is not supported on Android or mobile devices.");
     window.location.href = "unsupported.html"; // Or window.history.back();
 }
}