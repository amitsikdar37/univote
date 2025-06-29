import { BACKEND_URL } from "../config.js"; 

document.addEventListener('DOMContentLoaded', async () => {
  // Fallback for BACKEND_URL
  if (!BACKEND_URL) {
    console.error("BACKEND_URL is not defined. Check config.js.");
    alert("Configuration error: Backend URL missing.");
    window.location.href = './index.html';
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
      alert("Access denied. Redirecting to login...");
      window.location.href = './index.html';
      return;
    }

    // User is authenticated, reveal the page
    document.documentElement.style.visibility = 'visible';

  } catch (err) {
    console.error("Token verification error:", err);
    alert("Failed to verify access. Redirecting to login...");
    window.location.href = './index.html';
    return;
  }
});

/*const searchInput = document.getElementById('voteSearchInput');
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
*/

document.addEventListener('DOMContentLoaded', () => {
    const contractAddress = "0x7C79dab896DDcE3d13b7bA86304a0F42553de21F";
    const contractABI = [
        { "inputs": [{ "internalType": "address", "name": "_verifier", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "string", "name": "electionId", "type": "string" }, { "indexed": false, "internalType": "bytes32", "name": "commitment", "type": "bytes32" }], "name": "CommitmentRegistered", "type": "event" },
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "string", "name": "electionId", "type": "string" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256" }], "name": "ElectionCreated", "type": "event" },
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "string", "name": "electionId", "type": "string" }], "name": "ElectionEnded", "type": "event" },
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "string", "name": "electionId", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }], "name": "Voted", "type": "event" },
        { "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_durationInMinutes", "type": "uint256" }, { "internalType": "string[]", "name": "_candidateNames", "type": "string[]" }], "name": "createElection", "outputs": [{ "internalType": "string", "name": "newElectionId", "type": "string" }], "stateMutability": "nonpayable", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }], "name": "endElection", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }], "name": "getCandidateCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getCandidateName", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
        { "inputs": [{ "internalType": "uint256", "name": "counter", "type": "uint256" }], "name": "getGeneratedElectionId", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
        { "inputs": [], "name": "getNextElectionCounter", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }], "name": "getTotalVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getVotesForCandidate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }, { "internalType": "bytes32", "name": "_commitment", "type": "bytes32" }], "name": "registerCommitment", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }], "name": "showResult", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
        { "inputs": [], "name": "verifier", "outputs": [{ "internalType": "contract Verifier", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
        { "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }, { "internalType": "uint256[2]", "name": "a", "type": "uint256[2]" }, { "internalType": "uint256[2][2]", "name": "b", "type": "uint256[2][2]" }, { "internalType": "uint256[2]", "name": "c", "type": "uint256[2]" }, { "internalType": "uint256[4]", "name": "input", "type": "uint256[4]" }, { "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }], "name": "voteWithZKProof", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
    ];

    let provider, signer, contract, electionId;
    let selectedCandidateIndex = null;

    // DOM elements from the integrated layout
    const electionTopicEl = document.getElementById('electionTopic');
    const electionIdDisplayEl = document.getElementById('electionIdDisplay');
    const optionsContainerEl = document.getElementById('optionsContainer');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const submitVoteBtn = document.getElementById('submitVoteBtn');
    const statusMessageEl = document.getElementById('statusMessage');
    const copyResultLinkBtn = document.getElementById('copyResultLinkBtn'); // copy result link
    const searchForm = document.getElementById('electionSearchForm');
    const searchInput = document.getElementById('electionSearchInput');
    const loadingMessage = document.getElementById('loadingMessage');
    //  *******************************************

    function getElectionIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('electionId');
    }

    function setElectionId(newId) {
      electionId = newId;
      electionIdDisplayEl.textContent = `ID: ${electionId}`;
      document.getElementById('electionIdLabel').textContent = electionId; // Update input field
    }

    function resetElectionDetails() {
      optionsContainerEl.innerHTML = "";
      submitVoteBtn.style.display = 'none';
      submitVoteBtn.disabled = true;
      selectedCandidateIndex = null;
    }

    async function connectAndLoad() {
        if (!electionId) {
          statusMessageEl.textContent = "No Election ID provided. Enter or search for one.";
          return;
        }
        if (typeof window.ethereum === 'undefined') { return alert("Please install MetaMask."); }
        try {
            statusMessageEl.textContent = "Connecting...";
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            statusMessageEl.textContent = "Wallet connected. Loading details...";
            connectWalletBtn.style.display = 'none';
            submitVoteBtn.style.display = 'block'; // Use 'block' to show the button
            await loadElectionDetails(contract);
        } catch (e) {
            statusMessageEl.textContent = "Wallet connection failed.";
            console.error(e);
        }
    }

    async function loadElectionDetails(contractInstance) {
        if (!electionId) {
          statusMessageEl.textContent = "No Election ID provided.";
          resetElectionDetails();
          return;
        }
        optionsContainerEl.innerHTML = '<p>Loading candidates...</p>';
        try {
            const isOver = await contractInstance.showResult(electionId);
            const blockSearchRange = -5000;

            if (isOver) {
                optionsContainerEl.innerHTML = "<p style='text-align:center;'>This election has ended.</p>";
                submitVoteBtn.disabled = true;
                submitVoteBtn.textContent = "Election Ended";
                return;
            }

            const filter = contractInstance.filters.ElectionCreated(electionId);
            const events = await contractInstance.queryFilter(filter, blockSearchRange, 'latest');

            const candidateCount = await contractInstance.getCandidateCount(electionId);
            optionsContainerEl.innerHTML = '';
            for (let i = 0; i < candidateCount.toNumber(); i++) {
                const candidateName = await contractInstance.getCandidateName(electionId, i);
                const optionButton = document.createElement('div');
                optionButton.className = 'option-btn';
                optionButton.textContent = candidateName;
                optionButton.dataset.index = i;
                optionButton.addEventListener('click', () => {
                    document.querySelectorAll('.option-btn.selected').forEach(btn => btn.classList.remove('selected'));
                    optionButton.classList.add('selected');
                    selectedCandidateIndex = parseInt(optionButton.dataset.index, 10);
                    submitVoteBtn.disabled = false;
                    submitVoteBtn.textContent = `Submit Vote for "${candidateName}"`;
                });
                optionsContainerEl.appendChild(optionButton);
            }
            statusMessageEl.textContent = "Please select a candidate.";
        } catch (error) {
            statusMessageEl.textContent = "Could not load election details.";
            console.error(error);
        }
    }

    async function handleVoteProcess() {
        if (selectedCandidateIndex === null) {
            return alert("Please select a candidate first.");
        }
        submitVoteBtn.disabled = true;

        // ===== Step 1: Register Commitment =====
        statusMessageEl.textContent = "Step 1/2: Generating secret & commitment...";
        const secret = ethers.utils.randomBytes(32);
        const commitment = ethers.utils.solidityKeccak256(
            ['uint256', 'bytes32'],
            [selectedCandidateIndex, secret]
        );

        try {
            statusMessageEl.textContent = "Step 1/2: Registering commitment...";
            const registerTx = await contract.registerCommitment(electionId, commitment);
            await registerTx.wait();
            statusMessageEl.textContent = "Commitment registered! Proceeding...";
        } catch (error) {
            const reason = error.reason || (error.data ? error.data.message : "Commitment failed.");
            statusMessageEl.textContent = `Error in Step 1: ${reason}`;
            submitVoteBtn.disabled = false;
            console.error("Commitment registration failed:", error);
            return;
        }

        // ===== Break for network sync =====
        statusMessageEl.textContent = "Waiting for network to sync...";
        await new Promise(resolve => setTimeout(resolve, 7000)); // 7 second break

        // ===== Step 2: Cast Final Vote =====
        statusMessageEl.textContent = "Step 2/2: Generating ZK Proof...";
        const nullifierHash = ethers.utils.solidityKeccak256(['bytes32'], [secret]);

        // Correcting data types for the proof
        const proofInput = {
            a: ['0', '0'],
            b: [['0', '0'], ['0', '0']],
            c: ['0', '0'],
            input: [
                ethers.BigNumber.from(commitment),   // Convert bytes32 to BigNumber
                ethers.BigNumber.from(nullifierHash), // Convert bytes32 to BigNumber
                '0',
                '0'
            ]
        };




        try {
            statusMessageEl.textContent = "Step 2/2: Submitting final vote...";
            const voteTx = await contract.voteWithZKProof(
                electionId,
                proofInput.a,
                proofInput.b,
                proofInput.c,
                proofInput.input,
                selectedCandidateIndex
            );
            await voteTx.wait();

            statusMessageEl.textContent = "Vote cast successfully! Thank you.";
            submitVoteBtn.textContent = "Voted Successfully";
            submitVoteBtn.disabled = true;
        } catch (error) {
            const reason = error.reason || (error.data ? error.data.message : "Final vote failed.");
            statusMessageEl.textContent = `Error in Step 2: ${reason}`;
            submitVoteBtn.disabled = false;
            console.error("Final vote submission failed:", error);
        }
    }

    // --- NEW: Handle search bar election ID entry ---
    searchForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const enteredId = searchInput.value.trim();
        if (!enteredId) {
            statusMessageEl.textContent = "Please enter a valid Election ID.";
            return;
        }
        loadingMessage.style.display = 'block';
        setElectionId(enteredId);
        resetElectionDetails();
        statusMessageEl.textContent = "Please connect wallet to see candidates.";
        // Fetch and update the topic from backend
        await updateElectionTopic(enteredId);
        await updateElectionCriteria(enteredId);
        // Optionally, if wallet is already connected, reload details
        if (provider && signer && contract) {
          await loadElectionDetails(contract);
        }
        loadingMessage.style.display = 'block';
    });

    connectWalletBtn.addEventListener('click', connectAndLoad);
    submitVoteBtn.addEventListener('click', handleVoteProcess);

    function init() {
      const urlId = getElectionIdFromURL();
      if (urlId) {
        setElectionId(urlId);
        statusMessageEl.textContent = "Please connect wallet to see candidates.";
        updateElectionTopic(urlId);
        updateElectionCriteria(urlId);
      } else {
        electionIdDisplayEl.textContent = "ID: ...";
        statusMessageEl.textContent = "Enter or search for an Election ID.";
      }
    }

    init();
});

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('electionSearchForm');
  const loadingMessage = document.getElementById('loadingMessage');

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    loadingMessage.style.display = 'block';

    // Simulate async search (replace with your actual logic)
    setTimeout(function () {
      loadingMessage.style.display = 'none';
      // Handle search result here
    }, 2000);
  });
});

// Example function to update the topic text
async function updateElectionTopic(electionId) {
  const topicEl = document.getElementById('electionTopicText');
  topicEl.textContent = "Loading topic...";
  try {
    const res = await fetch(`${BACKEND_URL}/api/election-criteria/${encodeURIComponent(electionId)}`);
    if (!res.ok) {
      topicEl.textContent = "Topic not found.";
      return;
    }
    const data = await res.json();
    topicEl.textContent = data.topic || "Topic not found.";
  } catch (err) {
    topicEl.textContent = "Failed to load topic.";
  }
}

function getCriteriaSentence(key) {
  const mapping = {
    onlyIITP: "Only recipients of an IITP ID can vote.",
    account10Days: "Only users whose account is older than 10 days are eligible.",
    completedPartX: "Only users who has connected X account are eligible.",
    connectedGoogleAccount: "Only users who have connected their Google account can vote."
  };
  return mapping[key] || key;
}

async function updateElectionCriteria(electionId) {
  const container = document.getElementById('criteriaContainer');
  container.innerHTML = '<div class="criteria-loading">Loading eligibility criteria...</div>';

  try {
    const res = await fetch(`${BACKEND_URL}/api/election-criteria/${encodeURIComponent(electionId)}/criteria`);
    if (!res.ok) {
      container.innerHTML = '<div class="criteria-error">No criteria found for this election.</div>';
      return;
    }
    const data = await res.json();
    const criteriaKeys = data.criteria || [];

    if (criteriaKeys.length === 0) {
      container.innerHTML = '<div class="criteria-empty">No eligibility criteria set for this election.</div>';
      return;
    }

    let html = '<ul class="criteria-list">';
    criteriaKeys.forEach(key => {
      html += `<li class="criteria-item">${getCriteriaSentence(key)}</li>`;
    });
    html += '</ul>';
    container.innerHTML = `
      <h3 class="criteria-title">Eligibility Criteria</h3>
      ${html}
    `;
  } catch (err) {
    container.innerHTML = '<div class="criteria-error">Failed to load criteria.</div>';
  }
}
