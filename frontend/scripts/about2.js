import { BACKEND_URL } from "../config.js";

document.addEventListener('DOMContentLoaded', async () => {
  // Ensure BACKEND_URL is defined
  if (!BACKEND_URL) {
    console.error("BACKEND_URL is not defined. Check config.js.");
    window.location.href = './login.html';
    return;
  }

  // Token verification
  try {
    const response = await fetch(`${BACKEND_URL}/api/Verify-Token`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      console.warn("Token verification failed:", response.status);
      window.location.href = './login.html';
      return;
    }

    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.remove();
    document.body.style.display = 'block';
  } catch (err) {
    console.error("Token verification error:", err);
    window.location.href = './login.html';
  }

  // Initialize wallet check and gas price fetch
  await checkWallet();
  fetchGasPrice();
  setInterval(fetchGasPrice, 5000);
});

// Fetch gas price for proposals
async function fetchGasPrice() {
  const proposeButton = document.getElementById('propose');
  if (!proposeButton) {
    console.error("Propose button not found in DOM.");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/Gwei`);
    const data = await response.json();

    if (data.status === "1" && data.message === "OK") {
      proposeButton.innerText = `🌐 Propose: ${data.result.ProposeGasPrice} Gas Fee`;
    } else {
      proposeButton.innerText = "🌐 Propose: Error!";
    }
  } catch (err) {
    console.error("Gas price fetch error:", err);
    proposeButton.innerText = "🌐 Propose: API Failed!";
  }
}

// Wallet connection
const connectWallet = async () => {
  const walletAddressSpan = document.getElementById('walletAddress');
  const connectWalletButton = document.getElementById('connectWalletBtn');
  const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

  if (!walletAddressSpan || !connectWalletButton || !disconnectWalletButton) {
    console.error("Wallet UI elements not found.");
    return;
  }

  if (typeof window.ethereum === 'undefined') {
    alert("Please install MetaMask to use this feature.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (accounts.length > 0) {
      const walletAddress = accounts[0];
      walletAddressSpan.textContent = `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
      connectWalletButton.classList.add('d-none');
      disconnectWalletButton.classList.remove('d-none');
    }
  } catch (error) {
    console.error("Wallet connection error:", error);
    alert("Failed to connect wallet. Please try again.");
  }
};

// Wallet disconnection
const disconnectWallet = async () => {
  const walletAddressSpan = document.getElementById('walletAddress');
  const connectWalletButton = document.getElementById('connectWalletBtn');
  const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

  if (!walletAddressSpan || !connectWalletButton || !disconnectWalletButton) {
    console.error("Wallet UI elements not found.");
    return;
  }

  if (typeof window.ethereum === 'undefined') {
    alert("MetaMask not detected. Please ensure it is installed.");
    return;
  }

  try {
    // Clear MetaMask state
    window.ethereum.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
    walletAddressSpan.textContent = '';
    connectWalletButton.classList.remove('d-none');
    disconnectWalletButton.classList.add('d-none');
    alert('Wallet disconnected successfully!');
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    alert('Failed to disconnect wallet. Please try again.');
  }
};

// Check wallet status on load
const checkWallet = async () => {
  if (typeof window.ethereum === 'undefined') return;

  const walletAddressSpan = document.getElementById('walletAddress');
  const connectWalletButton = document.getElementById('connectWalletBtn');
  const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

  if (!walletAddressSpan || !connectWalletButton || !disconnectWalletButton) {
    console.error("Wallet UI elements not found.");
    return;
  }

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
};

// Wallet account change listener
if (typeof window.ethereum !== 'undefined') {
  window.ethereum.on('accountsChanged', (accounts) => {
    const walletAddressSpan = document.getElementById('walletAddress');
    const connectWalletButton = document.getElementById('connectWalletBtn');
    const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

    if (!walletAddressSpan || !connectWalletButton || !disconnectWalletButton) {
      console.error("Wallet UI elements not found.");
      return;
    }

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
}

// Device check
function checkDevice() {
  const isMobile = /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent) || window.innerWidth <= 768;
  if (isMobile) {
    alert("This application is only supported on Windows. It is not supported on Android or mobile devices.");
    window.location.href = "unsupported.html";
  }
}

// Logout functionality
const setupLogout = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) {
    console.error("Logout button not found.");
    return;
  }

  logoutBtn.addEventListener('click', async () => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'text-center mt-3';
    messageDiv.style.fontFamily = 'Poppins, sans-serif';
    messageDiv.style.fontSize = '1rem';
    const container = document.querySelector('.container');
    if (container) container.prepend(messageDiv);
    messageDiv.style.color = 'green';
    messageDiv.textContent = 'Logging out...';

    try {
      const response = await fetch(`${BACKEND_URL}/api/Logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        messageDiv.style.color = 'red';
        messageDiv.textContent = data?.errors?.[0]?.msg || 'Logout failed. Try again.';
        setTimeout(() => messageDiv.remove(), 3000);
        return;
      }

      messageDiv.style.color = 'green';
      messageDiv.textContent = data.message || 'Logged out successfully!';

      // Clear wallet state
      const walletAddressSpan = document.getElementById('walletAddress');
      const connectWalletButton = document.getElementById('connectWalletBtn');
      const disconnectWalletButton = document.getElementById('disconnectWalletBtn');
      if (walletAddressSpan && connectWalletButton && disconnectWalletButton) {
        walletAddressSpan.textContent = '';
        connectWalletButton.classList.remove('d-none');
        disconnectWalletButton.classList.add('d-none');
      }

      // Redirect to login page
      setTimeout(() => {
        window.location.href = './login.html';
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      messageDiv.style.color = 'red';
      messageDiv.textContent = 'Server error. Try again later.';
      setTimeout(() => messageDiv.remove(), 3000);
    }
  });
};

// Initialize event listeners and device check
const init = () => {
  const connectWalletButton = document.getElementById('connectWalletBtn');
  const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

  if (connectWalletButton) connectWalletButton.addEventListener('click', connectWallet);
  if (disconnectWalletButton) disconnectWalletButton.addEventListener('click', disconnectWallet);

  checkDevice();
  setupLogout();
};

init();