import { BACKEND_URL } from "../config.js";

// DOMContentLoaded to ensure DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Fallback for BACKEND_URL
  if (!BACKEND_URL) {
    console.error("BACKEND_URL is not defined. Check config.js.");
    alert("Configuration error: Backend URL missing.");
    window.location.href = './login.html';
    return;
  }

  // Token verification
  const loadingScreen = document.getElementById('loading-screen');
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

    if (loadingScreen) loadingScreen.remove();
    document.body.style.display = 'block';
    // ...existing code...
    if (loadingScreen) loadingScreen.remove();
    document.body.style.display = 'block';

    // ==== Proposal mode toggle logic START ====
    const proposalSwitch = document.getElementById('switchCheckDefault');
    const defineTopicCard = document.getElementById('defineTopicCard');
    const proposalCard = document.getElementById('proposalCard');

    function toggleProposalMode() {
      if (proposalSwitch && defineTopicCard && proposalCard) {
        if (proposalSwitch.checked) {
          defineTopicCard.style.display = 'none';
          proposalCard.style.display = '';
        } else {
          defineTopicCard.style.display = '';
          proposalCard.style.display = '';
        }
      }
    }

    if (proposalSwitch) {
      proposalSwitch.addEventListener('change', toggleProposalMode);
      // Initial state
      toggleProposalMode();
    }
    // ==== Proposal mode toggle logic END ====
  } catch (err) {
    console.error("Token verification error:", err);
    if (loadingScreen) loadingScreen.remove();
    alert("Failed to verify access. Redirecting to login...");
    window.location.href = './login.html';
    return;
  }

  // Initialize wallet check and gas price fetch
  await checkWallet();
  fetchGasPrice();
  setInterval(fetchGasPrice, 30000); // Update gas price every 30 seconds
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

    if (data.status === "1" && data.message === "OK" && data.result?.ProposeGasPrice) {
      const gasPrice = parseFloat(data.result.ProposeGasPrice).toFixed(2);
      proposeButton.innerText = `🌐 Propose: ${gasPrice} Gas Fee`;
    } else {
      proposeButton.innerText = "🌐 Propose: Error!";
      console.warn("Invalid gas price response:", data);
    }
  } catch (err) {
    console.error("Gas price fetch error:", err);
inket.innerText = "🌐 Propose: API Failed!";
  }
}

// Check wallet status on load
async function checkWallet() {
  const walletAddressSpan = document.getElementById('walletAddress');
  const connectWalletButton = document.getElementById('connectWalletBtn');
  const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

  if (!walletAddressSpan || !connectWalletButton || !disconnectWalletButton) {
    console.error("Wallet UI elements not found.");
    return;
  }

  if (typeof window.ethereum === 'undefined') {
    console.warn("MetaMask not detected on page load.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      const walletAddress = accounts[0];
      walletAddressSpan.textContent = `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
      connectWalletButton.classList.add('d-none');
      disconnectWalletButton.classList.remove('d-none');
    }
  } catch (err) {
    console.error("Error checking wallet on load:", err);
  }
}

// Wallet connection
async function connectWallet() {
  const walletAddressSpan = document.getElementById('walletAddress');
  const connectWalletButton = document.getElementById('connectWalletBtn');
  const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

  if (!walletAddressSpan || !connectWalletButton || !disconnectWalletButton) {
    console.error("Wallet UI elements not found.");
    return;
  }

  if (typeof window.ethereum === 'undefined') {
    alert("Please install MetaMask to use this feature. Visit https://metamask.io to get started.");
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
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Failed to connect wallet. Please try again.");
  }
}

// Disconnect wallet
function disconnectWallet() {
  const walletAddressSpan = document.getElementById('walletAddress');
  const connectWalletButton = document.getElementById('connectWalletBtn');
  const disconnectWalletButton = document.getElementById('disconnectWalletBtn');

  if (!walletAddressSpan || !connectWalletButton || !disconnectWalletButton) {
    console.error("Wallet UI elements not found.");
    return;
  }

  walletAddressSpan.textContent = '';
  connectWalletButton.classList.remove('d-none');
  disconnectWalletButton.classList.add('d-none');
}

// Logout function
async function logout() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if (response.ok) {
      window.location.href = './login.html';
    } else {
      console.warn("Logout failed:", response.status);
      alert("Failed to log out. Redirecting...");
      window.location.href = './login.html';
    }
  } catch (err) {
    console.error("Logout error:", err);
    alert("Failed to log out. Redirecting...");
    window.location.href = './login.html';
  }
}

// Add event listeners
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
document.getElementById('disconnectWalletBtn').addEventListener('click', disconnectWallet);
document.getElementById('logoutBtn').addEventListener('click', logout);