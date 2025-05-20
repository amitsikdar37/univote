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
      document.getElementById('propose').innerText = ` ${data.result.ProposeGasPrice} Gas Fee`;
    } else {
      document.getElementById('propose').innerText = "Error!";
    }
  } catch (err) {
    document.getElementById('propose').innerText = "API Failed!";
  }
}

fetchGasPrice();
setInterval(fetchGasPrice, 5000);

const connectWalletButton = document.getElementById('connectWalletBtn');
const disconnectWalletButton = document.getElementById('disconnectWalletBtn');
const walletAddressSpan = document.getElementById('walletAddress');

const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];
      walletAddressSpan.textContent = `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
      connectWalletButton.classList.add('d-none');
      disconnectWalletButton.classList.remove('d-none');
    } catch (error) {
      console.error("User rejected connection or other error", error);
      alert("Failed to connect wallet. Please try again.");
    }
  } else {
    alert("Please install MetaMask to use this feature.");
  }
};

const disconnectWallet = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      // Clear cached accounts (MetaMask workaround for disconnect)
      window.ethereum._state.accounts = [];
      // Update UI
      walletAddressSpan.textContent = '';
      connectWalletButton.classList.remove('d-none');
      disconnectWalletButton.classList.add('d-none');
      alert('Wallet disconnected successfully!');
    } else {
      alert('MetaMask not detected. Please ensure it is installed.');
    }
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    alert('Failed to disconnect wallet. Please try again.');
  }
};

// Check wallet status on page load
const checkWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        walletAddressSpan.textContent = `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
        connectWalletButton.classList.add('d-none');
        disconnectWalletButton.classList.remove('d-none');
      }
    } catch (error) {
      console.error('Error checking wallet:', error);
    }
  }
};

// Event listeners
connectWalletButton.addEventListener('click', connectWallet);
disconnectWalletButton.addEventListener('click', disconnectWallet);

// Check wallet on page load
checkWallet();

// Listen for account changes
window.ethereum?.on('accountsChanged', (accounts) => {
  if (accounts.length > 0) {
    walletAddressSpan.textContent = `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
    connectWalletButton.classList.add('d-none');
    disconnectWalletButton.classList.remove('d-none');
  } else {
    walletAddressSpan.textContent = '';
    connectWalletButton.classList.remove('d-none');
    disconnectWalletButton.classList.add('d-none');
  }
});

// Function to check and show the message if on mobile or tablet
function checkDevice() {
  if (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)) {
    alert("This application is only supported on Windows. It is not supported on Android or mobile devices.");
    window.location.href = "unsupported.html";
  }
}

checkDevice();