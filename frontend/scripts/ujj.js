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
            const copyResultLinkBtn = document.getElementById('copyResultLinkBtn'); // copy result link *******************************************


            function init() {
                electionId = getElectionIdFromURL();
                if (!electionId) {
                    electionTopicEl.textContent = "Error";
                    statusMessageEl.textContent = "No Election ID provided in URL.";
                    connectWalletBtn.style.display = 'none';
                    return;
                }
                electionIdDisplayEl.textContent = `ID: ${electionId}`;
                statusMessageEl.textContent = "Please connect wallet to see candidates.";
                connectWalletBtn.addEventListener('click', connectAndLoad);
                submitVoteBtn.addEventListener('click', handleVoteProcess);

            }

            async function connectAndLoad() {
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
                    if (events.length > 0) {
                        electionTopicEl.textContent = events[events.length - 1].args.name;
                    } else {
                        electionTopicEl.textContent = "Election Name Not Found";
                    }

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

            function getElectionIdFromURL() {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get('electionId');
            }

            // init();

            function getElectionIdFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('electionId');
        }

        // इस फंक्शन को कॉपी करने का लॉजिक हैंडल करने के लिए जोड़ें
        function handleCopyResultLink() {
            if (!electionId) {
                alert(" Election ID not found.");
                return;
            }
            // result.html का लिंक बनाएं (मान लें कि यह उसी फ़ोल्डर में है)
            const resultLink = `${window.location.origin}/result.html?electionId=${electionId}`;
            
            navigator.clipboard.writeText(resultLink).then(() => {
                const copyBtn = document.getElementById('copyResultLinkBtn');
                const originalText = copyBtn.textContent;
                copyBtn.textContent = ' Link copied successfully!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000); // 2 सेकंड के बाद टेक्स्ट वापस बदल दें
            }).catch(err => {
                console.error(' Failed to copy the link: ', err);
                alert(" Could not copy the link.");
            });
        }

        function init() {
            electionId = getElectionIdFromURL();
            if (!electionId) {
                electionTopicEl.textContent = "Error";
                statusMessageEl.textContent = "There is no election ID in the URL.";
                connectWalletBtn.style.display = 'none';
                return;
            }
            electionIdDisplayEl.textContent = `ID: ${electionId}`;
            statusMessageEl.textContent = " Please connect your wallet to view the candidates.";
            connectWalletBtn.addEventListener('click', connectAndLoad);
            submitVoteBtn.addEventListener('click', handleVoteProcess);
            
            // कॉपी बटन के लिए इवेंट लिस्नर जोड़ें
            document.getElementById('copyResultLinkBtn').addEventListener('click', handleCopyResultLink);
        }

        init();
    });
