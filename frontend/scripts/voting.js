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

document.addEventListener('DOMContentLoaded', () => {

  const contractAddress = " 0x3922877F1697B0449A51B682620F26bFB325Fa14"; // 🟨 Replace with your deployed ZkpVoting contract
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_verifier",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "electionId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "name": "ElectionCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "electionId",
          "type": "string"
        }
      ],
      "name": "ElectionEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "electionId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "commitment",
          "type": "bytes32"
        }
      ],
      "name": "VoterRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_commitment",
          "type": "bytes32"
        }
      ],
      "name": "addCommitment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "_commitments",
          "type": "bytes32[]"
        }
      ],
      "name": "addCommitmentsInBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "commitments",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "_candidateNames",
          "type": "string[]"
        }
      ],
      "name": "createElection",
      "outputs": [
        {
          "internalType": "string",
          "name": "newElectionId",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_electionId",
          "type": "string"
        }
      ],
      "name": "endElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_electionId",
          "type": "string"
        }
      ],
      "name": "getCandidateCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_electionId",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getCandidateName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "counter",
          "type": "uint256"
        }
      ],
      "name": "getGeneratedElectionId",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNextElectionCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_electionId",
          "type": "string"
        }
      ],
      "name": "getTotalVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_electionId",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getVotesForCandidate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_commitment",
          "type": "bytes32"
        }
      ],
      "name": "isRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_electionId",
          "type": "string"
        }
      ],
      "name": "showResult",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "verifier",
      "outputs": [
        {
          "internalType": "contract Verifier",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_electionId",
          "type": "string"
        },
        {
          "internalType": "uint256[2]",
          "name": "a",
          "type": "uint256[2]"
        },
        {
          "internalType": "uint256[2][2]",
          "name": "b",
          "type": "uint256[2][2]"
        },
        {
          "internalType": "uint256[2]",
          "name": "c",
          "type": "uint256[2]"
        },
        {
          "internalType": "uint256[4]",
          "name": "input",
          "type": "uint256[4]"
        },
        {
          "internalType": "uint256",
          "name": "candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "voteWithZKProof",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
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

  async function checkEligibilityAndUpdateUI(electionId) {
    const res = await fetch(`${BACKEND_URL}/api/CheckPublicClaim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ election_id: electionId }),
    });

    const data = await res.json();

    if (!res.ok || !data.eligible) {
      // Disable voting button
      submitVoteBtn.disabled = true;
      submitVoteBtn.textContent = "Not Eligible to Vote";
      // Mark failed criteria
      if (data.failedCriteria) markFailedCriteria(data.failedCriteria);
      statusMessageEl.textContent = "You are not eligible to vote in this election.";
      return null;
    } else {
      // Enable voting button
      submitVoteBtn.disabled = false;
      submitVoteBtn.textContent = "Select a Candidate";
      statusMessageEl.textContent = "You are eligible to vote!";
      markFailedCriteria([]); // Clear any previous failed criteria
      window.publicRegisteredCommitment = data.publicRegisteredCommitment;
      window.publicSecret = data.secret; // <-- store the secret for later use
      return data.publicRegisteredCommitment;
    }
  }

  function markFailedCriteria(failedKeys) {
    // Assumes each .criteria-item has a data-key attribute set to the criteria key
    document.querySelectorAll('.criteria-item').forEach(item => {
      const key = item.getAttribute('data-key');
      if (failedKeys.includes(key)) {
        item.classList.add('criteria-failed');
      } else {
        item.classList.remove('criteria-failed');
      }
    });
  }



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

  // async function connectAndLoad() {
  //   if (!electionId) {
  //     statusMessageEl.textContent = "No Election ID provided. Enter or search for one.";
  //     return;
  //   }
  //   if (typeof window.ethereum === 'undefined') { return alert("Please install MetaMask."); }
  //   try {
  //     statusMessageEl.textContent = "Connecting...";
  //     provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     signer = provider.getSigner();
  //     contract = new ethers.Contract(contractAddress, contractABI, signer);
  //     statusMessageEl.textContent = "Wallet connected. Loading details...";
  //     connectWalletBtn.style.display = 'none';
  //     submitVoteBtn.style.display = 'block'; // Use 'block' to show the button
  //     await loadElectionDetails(contract);
  //     await checkEligibilityAndUpdateUI(electionId);
  //   } catch (e) {
  //     statusMessageEl.textContent = "Wallet connection failed.";
  //     console.error(e);
  //   }
  // }


  // 
  async function connectAndLoad() {
    if (typeof window.ethereum === 'undefined') {
      return alert("Please install MetaMask.");
    }
    try {
      statusMessageEl.textContent = "Connecting wallet...";

      // Step 1: Accounts request karein
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Step 2: Naya provider banayein
      provider = new ethers.providers.Web3Provider(window.ethereum);

      // Step 3: Network check karein (yeh aadat achhi hai)
      const network = await provider.getNetwork();
      const baseSepoliaChainId = 84532; // Base Sepolia ka Chain ID

      if (network.chainId !== baseSepoliaChainId) {
        statusMessageEl.textContent = `Please switch to Base Sepolia network in MetaMask.`;
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + baseSepoliaChainId.toString(16) }], // Chain ID ko hex mein bhejna hota hai
          });
          // Switch karne ke baad provider reload karein
          provider = new ethers.providers.Web3Provider(window.ethereum);
        } catch (switchError) {
          // Agar user switch cancel kar de
          console.error(switchError);
          statusMessageEl.textContent = "Wallet connection failed: Please select the correct network.";
          return;
        }
      }

      // Step 4: Signer prapt karein
      signer = provider.getSigner();

      // Step 5: Sahi variables ka upyog karke contract ka instance banayein
      // Yahan 'contract' variable ka istemal kiya gaya hai jo script mein global hai
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      statusMessageEl.textContent = "Wallet connected. Loading election...";
      const userAddress = await signer.getAddress();
      connectWalletBtn.textContent = `Connected: ${userAddress.substring(0, 6)}...`;
      connectWalletBtn.disabled = true;
      submitVoteBtn.style.display = 'block';

      // Step 6: Yadi electionId maujood hai to details load karein
      if (electionId) {
        // 'loadElectionDetails' ko contract ka instance pass karein
        await loadElectionDetails(contract);
        await checkEligibilityAndUpdateUI(electionId);
      } else {
        statusMessageEl.textContent = "Wallet connected. Please search for an election.";
      }

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
        optionButton.addEventListener('click', async () => {
          document.querySelectorAll('.option-btn.selected').forEach(btn => btn.classList.remove('selected'));
          optionButton.classList.add('selected');
          selectedCandidateIndex = parseInt(optionButton.dataset.index, 10);

          const eligible = await checkEligibilityAndUpdateUI(electionId);
          if (eligible) {
            submitVoteBtn.disabled = false;
            submitVoteBtn.textContent = `Submit Vote for "${candidateName}"`;
          } else {
            submitVoteBtn.disabled = true;
            submitVoteBtn.textContent = "Not Eligible to Vote";
          }
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

    // Use the commitment received from backend eligibility check
    const commitment = window.publicRegisteredCommitment;
    const secret = window.publicSecret; // Use the secret stored earlier
    if (!commitment || !secret) {
      statusMessageEl.textContent = "Commitment or secret not found. Please check eligibility first.";
      submitVoteBtn.disabled = false;
      return;
    }

    // Ensure commitment is a bytes32 hex string
    let hexCommitment;
    try {
      // If already hex (starts with 0x), use as is, else convert
      hexCommitment = commitment.startsWith('0x')
        ? commitment
        : ethers.BigNumber.from(commitment).toHexString();
    } catch (e) {
      statusMessageEl.textContent = "Invalid commitment format.";
      submitVoteBtn.disabled = false;
      return;
    }
    console.log("Registering commitment (hex):", hexCommitment);
    try {

      const registerTx = await contract.registerCommitment(electionId, hexCommitment);
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


    console.log("Voting with commitment (hex):", hexCommitment);
    console.log("Proof input commitment (BigNumber):", proofInput.input[0].toHexString());


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
    loadingMessage.style.display = 'none';
    await checkEligibilityAndUpdateUI(electionId);
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
      checkEligibilityAndUpdateUI(urlId);
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
      html += `<li class="criteria-item" data-key="${key}">${getCriteriaSentence(key)}</li>`;
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

function markFailedCriteria(failedKeys) {
  document.querySelectorAll('.criteria-item').forEach(item => {
    const key = item.getAttribute('data-key');
    if (failedKeys.includes(key)) {
      item.classList.add('criteria-failed');
      item.classList.remove('criteria-success');
    } else {
      item.classList.remove('criteria-failed');
      item.classList.add('criteria-success');
    }
  });
}
























// import { BACKEND_URL } from "../config.js";

// // === Load ZK proof and public inputs ===
// async function LoadProofAndPublic() {
//   try {
//     const proofRes = await fetch("/proof.json");
//     const publicRes = await fetch("/public.json");

//     const proof = await proofRes.json();
//     const publicSignals = await publicRes.json();

//     return { proof, publicSignals };
//   } catch (error) {
//     console.error("Error loading proof/public signals:", error);
//     throw new Error("Proof or public.json loading failed");
//   }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//   // ✅ Token verification
//   if (!BACKEND_URL) {
//     alert("Backend config missing.");
//     return (window.location.href = "./index.html");
//   }

//   try {
//     const response = await fetch(`${BACKEND_URL}/api/Verify-Token`, {
//       method: "GET",
//       credentials: "include"
//     });

//     if (!response.ok) throw new Error("Unauthorized");
//     document.documentElement.style.visibility = 'visible';
//   } catch (err) {
//     alert("Login required.");
//     return (window.location.href = "./index.html");
//   }

//   // === Contract Setup ===
//   const contractAddress = " 0x4658F8678C7b06cB1667773303CE55b45F803682"; // 🟨 Replace with your deployed ZkpVoting contract
//   const contractABI =[
//   {
//     "inputs": [
//       { "internalType": "address", "name": "_verifier", "type": "address" },
//       { "internalType": "address", "name": "_registry", "type": "address" }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       { "indexed": true, "internalType": "string", "name": "electionId", "type": "string" },
//       { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
//       { "indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256" }
//     ],
//     "name": "ElectionCreated",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       { "indexed": true, "internalType": "string", "name": "electionId", "type": "string" }
//     ],
//     "name": "ElectionEnded",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       { "indexed": true, "internalType": "string", "name": "electionId", "type": "string" },
//       { "indexed": false, "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }
//     ],
//     "name": "Voted",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       { "internalType": "string", "name": "_name", "type": "string" },
//       { "internalType": "uint256", "name": "_durationInMinutes", "type": "uint256" },
//       { "internalType": "string[]", "name": "_candidateNames", "type": "string[]" }
//     ],
//     "name": "createElection",
//     "outputs": [
//       { "internalType": "string", "name": "newElectionId", "type": "string" }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       { "internalType": "string", "name": "_electionId", "type": "string" }
//     ],
//     "name": "endElection",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       { "internalType": "string", "name": "_electionId", "type": "string" }
//     ],
//     "name": "getCandidateCount",
//     "outputs": [
//       { "internalType": "uint256", "name": "", "type": "uint256" }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       { "internalType": "string", "name": "_electionId", "type": "string" },
//       { "internalType": "uint256", "name": "index", "type": "uint256" }
//     ],
//     "name": "getCandidateName",
//     "outputs": [
//       { "internalType": "string", "name": "", "type": "string" }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [{ "internalType": "uint256", "name": "counter", "type": "uint256" }],
//     "name": "getGeneratedElectionId",
//     "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }],
//     "name": "getTotalVotes",
//     "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [{ "internalType": "string", "name": "_electionId", "type": "string" }],
//     "name": "showResult",
//     "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getNextElectionCounter",
//     "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       { "internalType": "string", "name": "_electionId", "type": "string" },
//       { "internalType": "uint256[2]", "name": "a", "type": "uint256[2]" },
//       { "internalType": "uint256[2][2]", "name": "b", "type": "uint256[2][2]" },
//       { "internalType": "uint256[2]", "name": "c", "type": "uint256[2]" },
//       { "internalType": "uint256[4]", "name": "input", "type": "uint256[4]" },
//       { "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }
//     ],
//     "name": "voteWithZKProof",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }]

//  // 🟨 Replace with your ABI

//   let provider, signer, contract, electionId;
//   let selectedCandidateIndex = null;

//   const connectWalletBtn = document.getElementById("connectWalletBtn");
//   const submitVoteBtn = document.getElementById("submitVoteBtn");
//   const optionsContainerEl = document.getElementById("optionsContainer");
//   const statusMessageEl = document.getElementById("statusMessage");

//   // === Get Election ID from URL ===
//   function getElectionIdFromURL() {
//     const params = new URLSearchParams(window.location.search);
//     return params.get("electionId");
//   }

//   function setElectionId(id) {
//     electionId = id;
//     document.getElementById("electionIdDisplay").textContent = `ID: ${id}`;
//     document.getElementById("electionIdLabel").textContent = id;
//   }

//   function resetOptions() {
//     optionsContainerEl.innerHTML = "";
//     submitVoteBtn.style.display = "none";
//     submitVoteBtn.disabled = true;
//     selectedCandidateIndex = null;
//   }

//   // === Eligibility Check ===
//   async function checkEligibilityAndUpdateUI(electionId) {
//     const res = await fetch(`${BACKEND_URL}/api/CheckPublicClaim`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ election_id: electionId }),
//     });

//     const data = await res.json();

//     if (!res.ok || !data.eligible) {
//       submitVoteBtn.disabled = true;
//       submitVoteBtn.textContent = "Not Eligible to Vote";
//       statusMessageEl.textContent = "You are not eligible.";
//       return null;
//     } else {
//       submitVoteBtn.disabled = false;
//       submitVoteBtn.textContent = "Select a Candidate";
//       statusMessageEl.textContent = "You are eligible!";
//       window.publicRegisteredCommitment = data.publicRegisteredCommitment;
//       window.publicSecret = data.secret;
//       return data.publicRegisteredCommitment;
//     }
//   }

//   // === Connect Wallet ===
//   async function connectAndLoad() {
//     if (!electionId) return;

//     if (typeof window.ethereum === 'undefined') return alert("Install MetaMask.");

//     try {
//       provider = new ethers.providers.Web3Provider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       signer = provider.getSigner();
//       contract = new ethers.Contract(contractAddress, contractABI, signer);

//       statusMessageEl.textContent = "Wallet connected. Loading...";
//       connectWalletBtn.style.display = 'none';
//       submitVoteBtn.style.display = 'block';

//       await loadCandidates(contract);
//       await checkEligibilityAndUpdateUI(electionId);
//     } catch (err) {
//       statusMessageEl.textContent = "Wallet connection failed.";
//     }
//   }

//   // === Load Candidates ===
//   async function loadCandidates(contractInstance) {
//     if (!electionId) return;

//     optionsContainerEl.innerHTML = "<p>Loading candidates...</p>";
//     try {
//       const isOver = await contractInstance.showResult(electionId);
//       if (isOver) {
//         optionsContainerEl.innerHTML = "<p>This election has ended.</p>";
//         submitVoteBtn.disabled = true;
//         submitVoteBtn.textContent = "Election Ended";
//         return;
//       }

//       const candidateCount = await contractInstance.getCandidateCount(electionId);
//       optionsContainerEl.innerHTML = "";

//       for (let i = 0; i < candidateCount.toNumber(); i++) {
//         const name = await contractInstance.getCandidateName(electionId, i);
//         const optionBtn = document.createElement("div");
//         optionBtn.className = "option-btn";
//         optionBtn.textContent = name;
//         optionBtn.dataset.index = i;

//         optionBtn.addEventListener("click", async () => {
//           document.querySelectorAll(".option-btn.selected").forEach(el => el.classList.remove("selected"));
//           optionBtn.classList.add("selected");
//           selectedCandidateIndex = parseInt(optionBtn.dataset.index, 10);
//           await checkEligibilityAndUpdateUI(electionId);
//           submitVoteBtn.textContent = `Submit Vote for "${name}"`;
//         });

//         optionsContainerEl.appendChild(optionBtn);
//       }

//       statusMessageEl.textContent = "Select a candidate to proceed.";
//     } catch (err) {
//       optionsContainerEl.innerHTML = "<p>Error loading candidates.</p>";
//     }
//   }

//   // === Submit Vote ===
//   async function handleVote() {
//     if (selectedCandidateIndex === null) return alert("Select a candidate first.");

//     const commitment = window.publicRegisteredCommitment;
//     const secret = window.publicSecret;
//     if (!commitment || !secret) {
//       return alert("Eligibility not confirmed.");
//     }

//     const nullifierHash = ethers.utils.solidityKeccak256(['bytes32'], [secret]);

//     try {
//       // === Step 1: Register Commitment ===
//       statusMessageEl.textContent = "Registering commitment...";
//       const registerTx = await contract.registerCommitment(electionId, commitment);
//       await registerTx.wait();

//       // === Step 2: Load proof.json and public.json ===
//       statusMessageEl.textContent = "Loading ZK Proof...";
//       const { proof, publicSignals } = await LoadProofAndPublic();

//       // === Step 3: Cast Vote with ZK Proof ===
//       statusMessageEl.textContent = "Submitting vote...";

//       await contract.voteWithZKProof(
//         electionId,
//         proof.pi_a.slice(0, 2),
//         [proof.pi_b[0].slice(0, 2), proof.pi_b[1].slice(0, 2)],
//         proof.pi_c.slice(0, 2),
//         publicSignals,
//         selectedCandidateIndex
//       );

//       statusMessageEl.textContent = "Vote submitted successfully!";
//       submitVoteBtn.disabled = true;
//       submitVoteBtn.textContent = "Voted ✅";
//     } catch (err) {
//       console.error(err);
//       statusMessageEl.textContent = "Error submitting vote.";
//     }
//   }

//   // === Search Form Logic ===
//   document.getElementById("electionSearchForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const input = document.getElementById("electionSearchInput").value.trim();
//     if (!input) return;

//     setElectionId(input);
//     resetOptions();
//     statusMessageEl.textContent = "Please connect wallet to see candidates.";
//     await checkEligibilityAndUpdateUI(input);
//   });

//   // === Init ===
//   const idFromURL = getElectionIdFromURL();
//   if (idFromURL) {
//     setElectionId(idFromURL);
//     statusMessageEl.textContent = "Please connect wallet to vote.";
//   }

//   connectWalletBtn.addEventListener("click", connectAndLoad);
//   submitVoteBtn.addEventListener("click", handleVote);
// });
