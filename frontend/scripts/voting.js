// import { BACKEND_URL } from "../config.js";

// document.addEventListener('DOMContentLoaded', async () => {
//   // Fallback for BACKEND_URL
//   if (!BACKEND_URL) {
//     console.error("BACKEND_URL is not defined. Check config.js.");
//     alert("Configuration error: Backend URL missing.");
//     window.location.href = './index.html';
//     return;
//   }

//   // Token verification

//   try {
//     const response = await fetch(`${BACKEND_URL}/api/Verify-Token`, {
//       method: 'GET',
//       credentials: 'include'
//     });

//     if (!response.ok) {
//       console.warn("Token verification failed:", response.status);
//       alert("Access denied. Redirecting to login...");
//       window.location.href = './index.html';
//       return;
//     }

//     // User is authenticated, reveal the page
//     document.documentElement.style.visibility = 'visible';

//   } catch (err) {
//     console.error("Token verification error:", err);
//     alert("Failed to verify access. Redirecting to login...");
//     window.location.href = './index.html';
//     return;
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {

//   const contractAddress = "0x0e01b6887CEF7770144297bdfc79C2335BF09F62";
//   const contractABI = [

//   ];

//   let provider, signer, contract, electionId;
//   let selectedCandidateIndex = null;

//   // DOM elements from the integrated layout
//   const electionTopicEl = document.getElementById('electionTopic');
//   const electionIdDisplayEl = document.getElementById('electionIdDisplay');
//   const optionsContainerEl = document.getElementById('optionsContainer');
//   const connectWalletBtn = document.getElementById('connectWalletBtn');
//   const submitVoteBtn = document.getElementById('submitVoteBtn');
//   const statusMessageEl = document.getElementById('statusMessage');
//   const copyResultLinkBtn = document.getElementById('copyResultLinkBtn'); // copy result link
//   const searchForm = document.getElementById('electionSearchForm');
//   const searchInput = document.getElementById('electionSearchInput');
//   const loadingMessage = document.getElementById('loadingMessage');
//   //  *******************************************

//   async function checkEligibilityAndUpdateUI(electionId) {
//     const res = await fetch(`${BACKEND_URL}/api/CheckPublicClaim`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ election_id: electionId }),
//     });

//     const data = await res.json();

//     if (!res.ok || !data.eligible) {
//       // Disable voting button
//       submitVoteBtn.disabled = true;
//       submitVoteBtn.textContent = "Not Eligible to Vote";
//       // Mark failed criteria
//       if (data.failedCriteria) markFailedCriteria(data.failedCriteria);
//       statusMessageEl.textContent = "You are not eligible to vote in this election.";
//       return null;
//     } else {
//       // Enable voting button
//       window.publicRegisteredCommitment = data.publicRegisteredCommitment;
//       window.publicSecret = data.secret;
//       window.publicAttestationNonce = data.attestationNonce; // Store attestation nonce globally

//       try {
//         // Ensure contract and signer are initialized
//         if (!contract || !signer) {
//           statusMessageEl.textContent = "Please connect your wallet first.";
//           return null;
//         }
//         console.log("Checking if commitment is registered:", data.publicRegisteredCommitment, contract ? "Contract ready" : "Contract not ready");

//         const alreadyRegistered = await contract.isRegistered(data.publicRegisteredCommitment);
//         if (!alreadyRegistered) {
//           console.log("Registering commitment on-chain:", data.publicRegisteredCommitment);
//           const tx = await contract.registerCommitment(data.publicRegisteredCommitment);
//           await tx.wait();
//           statusMessageEl.textContent = "Commitment registered on-chain. You can now vote!";
//         } else {
//           statusMessageEl.textContent = "Commitment already registered. You can now vote!";
//         }
//         console.log("alreadyRegistered value:", alreadyRegistered);

//       } catch (err) {
//         statusMessageEl.textContent = "Failed to register commitment: " + (err.reason || err.message);
//         return null;
//       }

//       submitVoteBtn.disabled = false;
//       submitVoteBtn.textContent = "Select a Candidate";
//       statusMessageEl.textContent = "You are eligible to vote!";
//       markFailedCriteria([]); // Clear any previous failed criteria
//       return data.publicRegisteredCommitment;
//     }
//   }

//   function markFailedCriteria(failedKeys) {
//     // Assumes each .criteria-item has a data-key attribute set to the criteria key
//     document.querySelectorAll('.criteria-item').forEach(item => {
//       const key = item.getAttribute('data-key');
//       if (failedKeys.includes(key)) {
//         item.classList.add('criteria-failed');
//       } else {
//         item.classList.remove('criteria-failed');
//       }
//     });
//   }



//   function getElectionIdFromURL() {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('electionId');
//   }

//   function setElectionId(newId) {
//     electionId = newId;
//     electionIdDisplayEl.textContent = `ID: ${electionId}`;
//     document.getElementById('electionIdLabel').textContent = electionId; // Update input field
//   }

//   function resetElectionDetails() {
//     optionsContainerEl.innerHTML = "";
//     submitVoteBtn.style.display = 'none';
//     submitVoteBtn.disabled = true;
//     selectedCandidateIndex = null;
//   }

//   async function connectAndLoad() {
//     if (typeof window.ethereum === 'undefined') {
//       return alert("Please install MetaMask.");
//     }
//     try {
//       statusMessageEl.textContent = "Connecting wallet...";

//       // Step 1: Accounts request karein
//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       // Step 2: Naya provider banayein
//       provider = new ethers.providers.Web3Provider(window.ethereum);

//       // Step 3: Network check karein (yeh aadat achhi hai)
//       const network = await provider.getNetwork();
//       const baseSepoliaChainId = 84532; // Base Sepolia ka Chain ID

//       if (network.chainId !== baseSepoliaChainId) {
//         statusMessageEl.textContent = `Please switch to Base Sepolia network in MetaMask.`;
//         try {
//           await window.ethereum.request({
//             method: 'wallet_switchEthereumChain',
//             params: [{ chainId: '0x' + baseSepoliaChainId.toString(16) }], // Chain ID ko hex mein bhejna hota hai
//           });
//           // Switch karne ke baad provider reload karein
//           provider = new ethers.providers.Web3Provider(window.ethereum);
//         } catch (switchError) {
//           // Agar user switch cancel kar de
//           console.error(switchError);
//           statusMessageEl.textContent = "Wallet connection failed: Please select the correct network.";
//           return;
//         }
//       }

//       // Step 4: Signer prapt karein
//       signer = provider.getSigner();

//       // Step 5: Sahi variables ka upyog karke contract ka instance banayein
//       // Yahan 'contract' variable ka istemal kiya gaya hai jo script mein global hai
//       contract = new ethers.Contract(contractAddress, contractABI, signer);

//       statusMessageEl.textContent = "Wallet connected. Loading election...";
//       const userAddress = await signer.getAddress();
//       connectWalletBtn.textContent = `Connected: ${userAddress.substring(0, 6)}...`;
//       connectWalletBtn.disabled = true;
//       submitVoteBtn.style.display = 'block';

//       // Step 6: Yadi electionId maujood hai to details load karein
//       if (electionId) {
//         // 'loadElectionDetails' ko contract ka instance pass karein
//         await loadElectionDetails(contract);
//         await checkEligibilityAndUpdateUI(electionId);
//       } else {
//         statusMessageEl.textContent = "Wallet connected. Please search for an election.";
//       }

//     } catch (e) {
//       statusMessageEl.textContent = "Wallet connection failed.";
//       console.error(e);
//     }
//   }


//   async function loadElectionDetails(contractInstance) {
//     if (!electionId) {
//       statusMessageEl.textContent = "No Election ID provided.";
//       resetElectionDetails();
//       return;
//     }
//     optionsContainerEl.innerHTML = '<p>Loading candidates...</p>';
//     try {
//       const isOver = await contractInstance.showResult(electionId);
//       const blockSearchRange = -5000;

//       if (isOver) {
//         optionsContainerEl.innerHTML = "<p style='text-align:center;'>This election has ended.</p>";
//         submitVoteBtn.disabled = true;
//         submitVoteBtn.textContent = "Election Ended";
//         return;
//       }

//       const filter = contractInstance.filters.ElectionCreated(electionId);
//       const events = await contractInstance.queryFilter(filter, blockSearchRange, 'latest');

//       const candidateCount = await contractInstance.getCandidateCount(electionId);
//       optionsContainerEl.innerHTML = '';
//       for (let i = 0; i < candidateCount.toNumber(); i++) {
//         const candidateName = await contractInstance.getCandidateName(electionId, i);
//         const optionButton = document.createElement('div');
//         optionButton.className = 'option-btn';
//         optionButton.textContent = candidateName;
//         optionButton.dataset.index = i;
//         optionButton.addEventListener('click', async () => {
//           document.querySelectorAll('.option-btn.selected').forEach(btn => btn.classList.remove('selected'));
//           optionButton.classList.add('selected');
//           selectedCandidateIndex = parseInt(optionButton.dataset.index, 10);

//           const eligible = await checkEligibilityAndUpdateUI(electionId);
//           if (eligible) {
//             submitVoteBtn.disabled = false;
//             submitVoteBtn.textContent = `Submit Vote for "${candidateName}"`;
//           } else {
//             submitVoteBtn.disabled = true;
//             submitVoteBtn.textContent = "Not Eligible to Vote";
//           }
//         });
//         optionsContainerEl.appendChild(optionButton);
//       }
//       statusMessageEl.textContent = "Please select a candidate.";
//     } catch (error) {
//       statusMessageEl.textContent = "Could not load election details.";
//       console.error(error);
//     }
//   } 
//     async function loadProofAndPublicSignals() {
//       const proofRes = await fetch("/proof.json");
//       const publicRes = await fetch("/public.json");
//       const proof = await proofRes.json();
//       const publicSignals = await publicRes.json();
//       return { proof, publicSignals };
//     }


//   async function handleVoteProcess() {
//     if (selectedCandidateIndex === null) {
//       return alert("Please select a candidate first.");
//     }
//     submitVoteBtn.disabled = true;

//     // =========================================================================
//     // ===== Commitment registration wala hissa yahan se HATA DIYA GAYA HAI =====
//     // Kyunki yeh kaam ab admin pehle hi kar chuka hai.
//     // Frontend vote karte waqt commitment register nahi karega.
//     // =========================================================================

//     statusMessageEl.textContent = "Preparing your vote...";

//     // Backend se mili eligibility aur commitment ki jaankari prapt karna
//     const commitment = window.publicRegisteredCommitment;
//     const secret = window.publicSecret;
//     const attestationNonce = window.publicAttestationNonce;
//     if (!commitment || !secret || !attestationNonce) {
//       statusMessageEl.textContent = "Missing eligibility data. Please check eligibility again.";
//       submitVoteBtn.disabled = false;
//       return;
//     }

//     const publicClaim = ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(electionId)));
//     const publicAttestationNonce = ethers.BigNumber.from(attestationNonce);
//     const publicRegisteredCommitment = ethers.BigNumber.from(commitment);

//     let proof, publicSignals;
//     try {
//       ({ proof, publicSignals } = await loadProofAndPublicSignals());
//     } catch (err) {
//       statusMessageEl.textContent = "Failed to load ZK proof or public signals.";
//       submitVoteBtn.disabled = false;
//       return;
//     }
//     // Format input array for contract
//     const formattedPublicSignals = [
//       publicClaim,
//       publicAttestationNonce,
//       publicRegisteredCommitment,
//       0 // Padding for 4th input
//     ];

//     // Yahan proofInput taiyaar hoga...
//     try {
//       statusMessageEl.textContent = "Submitting vote with ZK proof...";

//       const voteTx = await contract.voteWithZKProof(
//         electionId,
//         [proof.pi_a[0], proof.pi_a[1]],
//         [
//           [proof.pi_b[0][0], proof.pi_b[0][1]],
//           [proof.pi_b[1][0], proof.pi_b[1][1]]
//         ],
//         [proof.pi_c[0], proof.pi_c[1]],
//         formattedPublicSignals,
//         selectedCandidateIndex
//       );
//       await voteTx.wait();
//       statusMessageEl.textContent = "Vote cast successfully! Thank you.";
//       submitVoteBtn.textContent = "Voted Successfully";
//       submitVoteBtn.disabled = true;

//     } catch (error) {
//       const reason = error.reason || (error.data ? error.data.message : "Final vote failed.");
//       statusMessageEl.textContent = `Error: ${reason}`;
//       submitVoteBtn.disabled = false;
//       console.error("Final vote submission failed:", error);
//     }
//   }




//   // --- NEW: Handle search bar election ID entry ---
//   searchForm.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const enteredId = searchInput.value.trim();
//     if (!enteredId) {
//       statusMessageEl.textContent = "Please enter a valid Election ID.";
//       return;
//     }
//     loadingMessage.style.display = 'block';
//     setElectionId(enteredId);
//     resetElectionDetails();
//     statusMessageEl.textContent = "Please connect wallet to see candidates.";
//     // Fetch and update the topic from backend
//     await updateElectionTopic(enteredId);
//     await updateElectionCriteria(enteredId);

//     // Automatically check eligibility and register commitment
//     await checkEligibilityAndUpdateUI(enteredId);

//     // Optionally, if wallet is already connected, reload details
//     if (provider && signer && contract) {
//       await loadElectionDetails(contract);
//     }
//     loadingMessage.style.display = 'none';
//   });

//   connectWalletBtn.addEventListener('click', connectAndLoad);
//   submitVoteBtn.addEventListener('click', handleVoteProcess);

//   function init() {
//     const urlId = getElectionIdFromURL();
//     if (urlId) {
//       setElectionId(urlId);
//       statusMessageEl.textContent = "Please connect wallet to see candidates.";
//       updateElectionTopic(urlId);
//       updateElectionCriteria(urlId);
//       checkEligibilityAndUpdateUI(urlId);
//     } else {
//       electionIdDisplayEl.textContent = "ID: ...";
//       statusMessageEl.textContent = "Enter or search for an Election ID.";
//     }
//   }

//   init();
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const searchForm = document.getElementById('electionSearchForm');
//   const loadingMessage = document.getElementById('loadingMessage');

//   searchForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     loadingMessage.style.display = 'block';

//     // Simulate async search (replace with your actual logic)
//     setTimeout(function () {
//       loadingMessage.style.display = 'none';
//       // Handle search result here
//     }, 2000);
//   });
// });

// // Example function to update the topic text
// async function updateElectionTopic(electionId) {
//   const topicEl = document.getElementById('electionTopicText');
//   topicEl.textContent = "Loading topic...";
//   try {
//     const res = await fetch(`${BACKEND_URL}/api/election-criteria/${encodeURIComponent(electionId)}`);
//     if (!res.ok) {
//       topicEl.textContent = "Topic not found.";
//       return;
//     }
//     const data = await res.json();
//     topicEl.textContent = data.topic || "Topic not found.";
//   } catch (err) {
//     topicEl.textContent = "Failed to load topic.";
//   }
// }

// function getCriteriaSentence(key) {
//   const mapping = {
//     onlyIITP: "Only recipients of an IITP ID can vote.",
//     account10Days: "Only users whose account is older than 10 days are eligible.",
//     completedPartX: "Only users who has connected X account are eligible.",
//     connectedGoogleAccount: "Only users who have connected their Google account can vote."
//   };
//   return mapping[key] || key;
// }

// async function updateElectionCriteria(electionId) {
//   const container = document.getElementById('criteriaContainer');
//   container.innerHTML = '<div class="criteria-loading">Loading eligibility criteria...</div>';

//   try {
//     const res = await fetch(`${BACKEND_URL}/api/election-criteria/${encodeURIComponent(electionId)}/criteria`);
//     if (!res.ok) {
//       container.innerHTML = '<div class="criteria-error">No criteria found for this election.</div>';
//       return;
//     }
//     const data = await res.json();
//     const criteriaKeys = data.criteria || [];

//     if (criteriaKeys.length === 0) {
//       container.innerHTML = '<div class="criteria-empty">No eligibility criteria set for this election.</div>';
//       return;
//     }

//     let html = '<ul class="criteria-list">';
//     criteriaKeys.forEach(key => {
//       html += `<li class="criteria-item" data-key="${key}">${getCriteriaSentence(key)}</li>`;
//     });
//     html += '</ul>';
//     container.innerHTML = `
//       <h3 class="criteria-title">Eligibility Criteria</h3>
//       ${html}
//     `;
//   } catch (err) {
//     container.innerHTML = '<div class="criteria-error">Failed to load criteria.</div>';
//   }
// }

// function markFailedCriteria(failedKeys) {
//   document.querySelectorAll('.criteria-item').forEach(item => {
//     const key = item.getAttribute('data-key');
//     if (failedKeys.includes(key)) {
//       item.classList.add('criteria-failed');
//       item.classList.remove('criteria-success');
//     } else {
//       item.classList.remove('criteria-failed');
//       item.classList.add('criteria-success');
//     }
//   });
// }



























import { BACKEND_URL } from "../config.js";

document.addEventListener('DOMContentLoaded', () => {
  const contractAddress = "0x0e01b6887CEF7770144297bdfc79C2335BF09F62"; // ← update this
  const contractABI = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      }
    ],
    "name": "StringsInsufficientHexLength",
    "type": "error"
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
      }
    ],
    "name": "CandidateAdded",
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
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
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
        "internalType": "address",
        "name": "voter",
        "type": "address"
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
    "inputs": [
      {
        "internalType": "string",
        "name": "electionId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "durationInMinutes",
        "type": "uint256"
      }
    ],
    "name": "createElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "electionExists",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "electionIds",
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
        "internalType": "string",
        "name": "electionId",
        "type": "string"
      }
    ],
    "name": "endElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllElectionIds",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "electionId",
        "type": "string"
      }
    ],
    "name": "getCandidates",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct UniVote.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "electionId",
        "type": "string"
      }
    ],
    "name": "getElectionDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "durationMinutes",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isEnded",
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
        "name": "electionId",
        "type": "string"
      }
    ],
    "name": "getResults",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct UniVote.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalElections",
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
        "name": "electionId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

  let provider, signer, contract, electionId;
  let selectedCandidateIndex = null;

  const electionTopicEl = document.getElementById('electionTopicText');
  const electionIdDisplayEl = document.getElementById('electionIdDisplay');
  const optionsContainerEl = document.getElementById('optionsContainer');
  const connectWalletBtn = document.getElementById('connectWalletBtn');
  const submitVoteBtn = document.getElementById('submitVoteBtn');
  const statusMessageEl = document.getElementById('statusMessage');
  const searchForm = document.getElementById('electionSearchForm');
  const searchInput = document.getElementById('electionSearchInput');
  const loadingMessage = document.getElementById('loadingMessage');

  function getElectionIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('electionId');
  }

  function setElectionId(newId) {
    electionId = newId;
    electionIdDisplayEl.textContent = `ID: ${electionId}`;
    document.getElementById('electionIdLabel').textContent = electionId;
  }

  function resetElectionDetails() {
    optionsContainerEl.innerHTML = "";
    submitVoteBtn.style.display = 'none';
    submitVoteBtn.disabled = true;
    selectedCandidateIndex = null;
  }

  async function connectAndLoad() {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      const userAddress = await signer.getAddress();
      connectWalletBtn.textContent = `Connected: ${userAddress.substring(0, 6)}...`;
      connectWalletBtn.disabled = true;

      if (electionId) {
        await loadElectionDetails();
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  }

  async function loadElectionDetails() {
    try {
      const isEnded = await contract.showResult(electionId);
      if (isEnded) {
        optionsContainerEl.innerHTML = "<p style='text-align:center;'>This election has ended.</p>";
        submitVoteBtn.disabled = true;
        submitVoteBtn.textContent = "Election Ended";
        return;
      }

      const candidateCount = await contract.getCandidateCount(electionId);
      optionsContainerEl.innerHTML = '';
      for (let i = 0; i < candidateCount.toNumber(); i++) {
        const name = await contract.getCandidateName(electionId, i);
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.textContent = name;
        btn.dataset.index = i;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.option-btn.selected').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedCandidateIndex = parseInt(btn.dataset.index, 10);
          submitVoteBtn.disabled = false;
          submitVoteBtn.textContent = `Vote for "${name}"`;
        });
        optionsContainerEl.appendChild(btn);
      }

      submitVoteBtn.style.display = 'block';
      statusMessageEl.textContent = "Please select a candidate.";
    } catch (err) {
      console.error("Error loading candidates:", err);
      statusMessageEl.textContent = "Could not load election details.";
    }
  }

  async function handleVote() {
    if (selectedCandidateIndex === null) {
      alert("Please select a candidate.");
      return;
    }
    try {
      const tx = await contract.vote(electionId, selectedCandidateIndex);
      await tx.wait();
      statusMessageEl.textContent = "Vote cast successfully!";
      submitVoteBtn.textContent = "Voted Successfully";
      submitVoteBtn.disabled = true;
    } catch (err) {
      console.error("Vote failed:", err);
      statusMessageEl.textContent = "Failed to cast vote.";
    }
  }

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const enteredId = searchInput.value.trim();
    if (!enteredId) {
      statusMessageEl.textContent = "Please enter a valid Election ID.";
      return;
    }
    loadingMessage.style.display = 'block';
    setElectionId(enteredId);
    resetElectionDetails();
    await loadElectionDetails();
    loadingMessage.style.display = 'none';
  });

  connectWalletBtn.addEventListener('click', connectAndLoad);
  submitVoteBtn.addEventListener('click', handleVote);

  // Init
  const idFromURL = getElectionIdFromURL();
  if (idFromURL) {
    setElectionId(idFromURL);
    loadElectionDetails();
  }
});
