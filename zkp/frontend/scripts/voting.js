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

const searchInput = document.getElementById('voteSearchInput');
const searchButton = document.getElementById('electionIdSearchButton');

searchButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const election_id = searchInput.value;

  if (!election_id) {
    alert("Please enter a Voting ID.");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/CheckPublicClaim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ election_id }),
    });

    if (!response.ok) {
      throw new Error("Vote not found");
    }

    const voteData = await response.json();
    console.log("Vote data:", voteData);
    // Display vote data to the user
  } catch (error) {
    console.error("Error fetching vote data:", error);
    alert("You Are Not Eligible To Registered For This Election.");
  }
});
