import { BACKEND_URL } from "../config.js";

function updateUsername() {
    const showUsername = document.getElementById('span-username');

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
            } else {
                showUsername.innerText = '';
                showUsername.style.display = 'none';
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

function loadWalletFromSession() {
  const profileWalletAddressSpan = document.getElementById('profile-wallet-address');
  const walletAddress = sessionStorage.getItem('connectedWallet');
  if (walletAddress && profileWalletAddressSpan) {
    const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    profileWalletAddressSpan.textContent = shortAddress;
  }
}

document.addEventListener('DOMContentLoaded', loadWalletFromSession);
// Run when page is shown from bfcache or normal navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        loadWalletFromSession();
    }
});