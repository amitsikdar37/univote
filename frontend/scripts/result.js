
import { BACKEND_URL } from "../config.js";

document.addEventListener('DOMContentLoaded', async () => {
    const contractAddress = "0x5ac18C2b545795e4573CCD75EEC2375939502b83";
    // const contractABI = [/* -- your existing ABI -- */];
    const contractABI = [
        {
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
        }
    ];


    const statusMessageEl = document.getElementById("statusMessage");
    const electionIdDisplayEl = document.getElementById("electionIdDisplay");
    const resultsContainerEl = document.getElementById("resultsContainer");
    const endTimeEl = document.getElementById("electionEndTime");
    const countdownEl = document.getElementById("countdownTimer");
    const connectBtn = document.getElementById("connectWalletBtn");

    let provider, signer, contract, electionId;

    // Connect wallet and initialize contract
    connectBtn.addEventListener('click', async () => {
        if (typeof window.ethereum === "undefined") {
            statusMessageEl.textContent = "❌ Please install MetaMask.";
            return;
        }

        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            connectBtn.style.display = "none";
            statusMessageEl.textContent = "✅ Wallet connected.";
            init();
        } catch (err) {
            console.error(err);
            statusMessageEl.textContent = "❌ Wallet connection failed.";
        }
    });

    async function init() {
        const urlParams = new URLSearchParams(window.location.search);
        electionId = urlParams.get("electionId");

        if (!electionId) {
            statusMessageEl.textContent = "❌ No electionId in URL.";
            return;
        }

        electionIdDisplayEl.textContent = `🆔 ${electionId}`;

        try {
            const details = await contract.getElectionDetails(electionId);
            const startTime = parseInt(details.startTime.toString());
            const duration = parseInt(details.durationMinutes.toString());
            const endTime = startTime + duration * 60;
            const now = Math.floor(Date.now() / 1000);

            endTimeEl.textContent = `🕓 Ends at: ${new Date(endTime * 1000).toLocaleString()}`;

            // Start countdown
            updateCountdown(endTime);
            const countdownInterval = setInterval(() => {
                const remaining = endTime - Math.floor(Date.now() / 1000);
                if (remaining <= 0) {
                    clearInterval(countdownInterval);
                    countdownEl.textContent = "✅ Election ended.";
                    loadResults();
                } else {
                    updateCountdown(endTime);
                }
            }, 1000);

            if (now >= endTime || details.isEnded) {
                countdownEl.textContent = "✅ Election ended.";
                loadResults();
            } else {
                statusMessageEl.textContent = "⏳ Election still ongoing. Results will appear after end time.";
            }
        } catch (err) {
            console.error(err);
            statusMessageEl.textContent = "❌ Error fetching election details.";
        }
    }

    function updateCountdown(endTime) {
        const now = Math.floor(Date.now() / 1000);
        const remaining = endTime - now;
        if (remaining <= 0) {
            countdownEl.textContent = "✅ Election ended.";
            return;
        }
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        countdownEl.textContent = `⏳ Time left: ${minutes}m ${seconds}s`;
    }

    async function loadResults() {
        try {
            const candidates = await contract.getCandidates(electionId);
            let totalVotes = 0;
            resultsContainerEl.innerHTML = "";

            candidates.forEach((c, i) => {
                const div = document.createElement("div");
                div.className = "result-item";

                const name = document.createElement("span");
                name.className = "candidate-name";
                name.textContent = `${i + 1}. ${c.name}`;

                const votes = document.createElement("span");
                votes.className = "vote-count";
                votes.textContent = `Votes: ${c.voteCount.toString()}`;

                div.appendChild(name);
                div.appendChild(votes);
                resultsContainerEl.appendChild(div);

                totalVotes += parseInt(c.voteCount.toString());
            });

            statusMessageEl.textContent = `✅ Results loaded. Total votes: ${totalVotes}`;
        } catch (err) {
            console.error(err);
            statusMessageEl.textContent = "❌ Error loading results.";
        }
    }
});

const gweiVersionSpan = document.querySelector('.gwei-indicator .version');

async function updateGwei() {
    try {
        // Adjust the endpoint as per your backend route
        const response = await fetch(`${BACKEND_URL}/api/Gwei`);
        if (!response.ok) {
            throw new Error('Failed to fetch gwei');
        }
        const data = await response.json();
        // Etherscan's API returns the value as a string, e.g., data.result.ProposeGasPrice
        let gwei = data.result?.SafeGasPrice;
        if (gwei && !isNaN(gwei)) {
            gwei = parseFloat(gwei).toFixed(2);
        } else {
            gwei = 'N/A';
        }
        gweiVersionSpan.textContent = gwei;
    } catch (err) {
        console.error('Error updating gwei:', err);
        gweiVersionSpan.textContent = 'N/A';
    }
}

// Initial fetch
updateGwei();

// Update every 5 seconds (5000 ms)
setInterval(updateGwei, 5000);


