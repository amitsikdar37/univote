// document.addEventListener('DOMContentLoaded', () => {
// const contractAddress = "0x5ac18C2b545795e4573CCD75EEC2375939502b83";
// const contractABI = [{
//     "inputs": [
//         {
//             "internalType": "uint256",
//             "name": "value",
//             "type": "uint256"
//         },
//         {
//             "internalType": "uint256",
//             "name": "length",
//             "type": "uint256"
//         }
//     ],
//     "name": "StringsInsufficientHexLength",
//     "type": "error"
// },
// {
//     "anonymous": false,
//     "inputs": [
//         {
//             "indexed": true,
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         },
//         {
//             "indexed": false,
//             "internalType": "string",
//             "name": "name",
//             "type": "string"
//         }
//     ],
//     "name": "CandidateAdded",
//     "type": "event"
// },
// {
//     "anonymous": false,
//     "inputs": [
//         {
//             "indexed": true,
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         },
//         {
//             "indexed": true,
//             "internalType": "address",
//             "name": "creator",
//             "type": "address"
//         }
//     ],
//     "name": "ElectionCreated",
//     "type": "event"
// },
// {
//     "anonymous": false,
//     "inputs": [
//         {
//             "indexed": true,
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         }
//     ],
//     "name": "ElectionEnded",
//     "type": "event"
// },
// {
//     "anonymous": false,
//     "inputs": [
//         {
//             "indexed": true,
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         },
//         {
//             "indexed": false,
//             "internalType": "address",
//             "name": "voter",
//             "type": "address"
//         },
//         {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "candidateIndex",
//             "type": "uint256"
//         }
//     ],
//     "name": "Voted",
//     "type": "event"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         },
//         {
//             "internalType": "string",
//             "name": "name",
//             "type": "string"
//         }
//     ],
//     "name": "addCandidate",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "name",
//             "type": "string"
//         },
//         {
//             "internalType": "uint256",
//             "name": "durationInMinutes",
//             "type": "uint256"
//         }
//     ],
//     "name": "createElection",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//         }
//     ],
//     "name": "electionExists",
//     "outputs": [
//         {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//         }
//     ],
//     "name": "electionIds",
//     "outputs": [
//         {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         }
//     ],
//     "name": "endElection",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
// },
// {
//     "inputs": [],
//     "name": "getAllElectionIds",
//     "outputs": [
//         {
//             "internalType": "string[]",
//             "name": "",
//             "type": "string[]"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         }
//     ],
//     "name": "getCandidates",
//     "outputs": [
//         {
//             "components": [
//                 {
//                     "internalType": "string",
//                     "name": "name",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "voteCount",
//                     "type": "uint256"
//                 }
//             ],
//             "internalType": "struct UniVote.Candidate[]",
//             "name": "",
//             "type": "tuple[]"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         }
//     ],
//     "name": "getElectionDetails",
//     "outputs": [
//         {
//             "internalType": "string",
//             "name": "id",
//             "type": "string"
//         },
//         {
//             "internalType": "string",
//             "name": "name",
//             "type": "string"
//         },
//         {
//             "internalType": "address",
//             "name": "creator",
//             "type": "address"
//         },
//         {
//             "internalType": "uint256",
//             "name": "startTime",
//             "type": "uint256"
//         },
//         {
//             "internalType": "uint256",
//             "name": "durationMinutes",
//             "type": "uint256"
//         },
//         {
//             "internalType": "bool",
//             "name": "isEnded",
//             "type": "bool"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         }
//     ],
//     "name": "getResults",
//     "outputs": [
//         {
//             "components": [
//                 {
//                     "internalType": "string",
//                     "name": "name",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "voteCount",
//                     "type": "uint256"
//                 }
//             ],
//             "internalType": "struct UniVote.Candidate[]",
//             "name": "",
//             "type": "tuple[]"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "inputs": [],
//     "name": "totalElections",
//     "outputs": [
//         {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "electionId",
//             "type": "string"
//         },
//         {
//             "internalType": "uint256",
//             "name": "candidateIndex",
//             "type": "uint256"
//         }
//     ],
//     "name": "vote",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
// }];


//     const electionTopicEl = document.getElementById('electionTopic');
//     const electionIdDisplayEl = document.getElementById('electionIdDisplay');
//     const resultsContainerEl = document.getElementById('resultsContainer');
//     const statusMessageEl = document.getElementById('statusMessage');

//     async function init() {
//         const urlParams = new URLSearchParams(window.location.search);
//         const electionId = urlParams.get('electionId');

//         if (!electionId) {
//             statusMessageEl.textContent = "Error: No Election ID found in URL.";
//             return;
//         }

//         electionIdDisplayEl.textContent = `ID: ${electionId}`;

//         if (typeof window.ethereum === 'undefined') {
//             statusMessageEl.textContent = "Please install MetaMask to view results.";
//             return;
//         }

//         try {
//             statusMessageEl.textContent = "Connecting to wallet...";
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             await provider.send("eth_requestAccounts", []);
//             const contract = new ethers.Contract(contractAddress, contractABI, provider);

//             statusMessageEl.textContent = "Fetching results...";
//             await loadResults(contract, electionId);

//         } catch (e) {
//             statusMessageEl.textContent = "Wallet connection failed or was rejected.";
//             console.error(e);
//         }
//     }

//     async function loadResults(contract, electionId) {
//         try {
//             // जांचें कि चुनाव खत्म हो गया है या नहीं
//             const isElectionOver = await contract.showResult(electionId);
//             if (!isElectionOver) {
//                 statusMessageEl.textContent = "This election has not ended yet. Results are not public.";
//                 resultsContainerEl.innerHTML = '';
//                 return;
//             }

//             // चुनाव का नाम प्राप्त करें
//             const filter = contract.filters.ElectionCreated(electionId);
//             const events = await contract.queryFilter(filter, -5000, 'latest');
//             if (events.length > 0) {
//                 electionTopicEl.textContent = events[events.length - 1].args.name;
//             } else {
//                 electionTopicEl.textContent = "Election Name Not Found";
//             }

//             const candidateCount = await contract.getCandidateCount(electionId);
//             let totalVotes = 0;
//             resultsContainerEl.innerHTML = ''; // पुराने परिणामों को साफ़ करें

//             for (let i = 0; i < candidateCount.toNumber(); i++) {
//                 const candidateName = await contract.getCandidateName(electionId, i);
//                 const voteCount = await contract.getVotesForCandidate(electionId, i);

//                 const resultItem = document.createElement('div');
//                 resultItem.className = 'result-item';

//                 const nameSpan = document.createElement('span');
//                 nameSpan.className = 'candidate-name';
//                 nameSpan.textContent = candidateName;

//                 const voteSpan = document.createElement('span');
//                 voteSpan.className = 'vote-count';
//                 voteSpan.textContent = `Votes: ${voteCount.toString()}`;

//                 resultItem.appendChild(nameSpan);
//                 resultItem.appendChild(voteSpan);
//                 resultsContainerEl.appendChild(resultItem);

//                 totalVotes += voteCount.toNumber();
//             }
//             statusMessageEl.textContent = `Results loaded successfully. Total votes cast: ${totalVotes}`;

//         } catch (error) {
//             statusMessageEl.textContent = "Could not load election results.";
//             console.error(error);
//         }
//     }









//     // Set timestamp text for each step
//     function setStepTimestamp(step, ts) {
//         const el = document.getElementById(`ts-${step}`);
//         if (el) el.textContent = ts;
//     }

//     // Function to track transaction status live and update UI
//     async function trackTransaction(txHash) {
//         if (!provider) return;

//         // Step 1: Transaction passed ZKP circuit (assumed immediate)
//         setStepperStatus(1);
//         setStepTimestamp(1, new Date().toLocaleString());

//         // Step 2: Transaction signed (immediate)
//         setStepperStatus(2);
//         setStepTimestamp(2, new Date().toLocaleString());

//         // Step 3: Waiting for block confirmation (immediate simulation)
//         setStepperStatus(3);
//         setStepTimestamp(3, new Date().toLocaleString());

//         // Step 4: Wait for actual blockchain confirmation
//         try {
//             const receipt = await provider.waitForTransaction(txHash);
//             setStepperStatus(4);
//             setStepTimestamp(4, new Date().toLocaleString());
//         } catch (err) {
//             console.error("Transaction confirmation error:", err);
//             // Optionally handle error UI here
//         }
//     }








//     init();
// });







document.addEventListener('DOMContentLoaded', () => {
    const contractAddress = "0x5ac18C2b545795e4573CCD75EEC2375939502b83";
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

    const electionTopicEl = document.getElementById('electionTopic');
    const electionIdDisplayEl = document.getElementById('electionIdDisplay');
    const resultsContainerEl = document.getElementById('resultsContainer');
    const statusMessageEl = document.getElementById('statusMessage');
    const countdownEl = document.getElementById("countdownTimer");
    const endTimeEl = document.getElementById("electionEndTime");

    async function init() {
        const urlParams = new URLSearchParams(window.location.search);
        const electionId = urlParams.get('electionId');

        if (!electionId) {
            statusMessageEl.textContent = "Error: No Election ID found in URL.";
            return;
        }

        electionIdDisplayEl.textContent = `ID: ${electionId}`;

        if (typeof window.ethereum === 'undefined') {
            statusMessageEl.textContent = "Please install MetaMask to view results.";
            return;
        }

        try {
            statusMessageEl.textContent = "Connecting to wallet...";
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            statusMessageEl.textContent = "Checking election timing...";
            const details = await contract.getElectionDetails(electionId);
            const startTime = parseInt(details.startTime.toString()) * 1000;
            const durationMinutes = parseInt(details.durationMinutes.toString());
            const endTime = startTime + durationMinutes * 60 * 1000;

            const endTimeText = new Date(endTime).toLocaleString();
            endTimeEl.textContent = `Ends at: ${endTimeText}`;

            const now = Date.now();
            if (now >= endTime) {
                statusMessageEl.textContent = "Election ended. Fetching results...";
                await loadResults(contract, electionId);
            } else {
                const timeLeft = endTime - now;
                showCountdown(endTime);
                statusMessageEl.textContent = "Election is still running. Results will appear once it ends.";
                setTimeout(async () => {
                    statusMessageEl.textContent = "Election ended. Fetching results...";
                    await loadResults(contract, electionId);
                }, timeLeft);
            }
        } catch (e) {
            statusMessageEl.textContent = "Wallet connection failed or was rejected.";
            console.error(e);
        }
    }

    function showCountdown(endTime) {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = endTime - now;
            if (diff <= 0) {
                clearInterval(interval);
                countdownEl.textContent = "⏰ Election ended. Loading result...";
            } else {
                const mins = Math.floor(diff / 60000);
                const secs = Math.floor((diff % 60000) / 1000);
                countdownEl.textContent = `⏳ Time left: ${mins}m ${secs}s`;
            }
        }, 1000);
    }

    async function loadResults(contract, electionId) {
        try {
            const isElectionOver = await contract.showResult(electionId);
            if (!isElectionOver) {
                statusMessageEl.textContent = "This election has not ended yet. Results are not public.";
                resultsContainerEl.innerHTML = '';
                return;
            }

            const filter = contract.filters.ElectionCreated(electionId);
            const events = await contract.queryFilter(filter, -5000, 'latest');
            if (events.length > 0) {
                electionTopicEl.textContent = events[events.length - 1].args.name;
            } else {
                electionTopicEl.textContent = "Election Name Not Found";
            }

            const candidateCount = await contract.getCandidateCount(electionId);
            let totalVotes = 0;
            resultsContainerEl.innerHTML = '';

            for (let i = 0; i < candidateCount.toNumber(); i++) {
                const candidateName = await contract.getCandidateName(electionId, i);
                const voteCount = await contract.getVotesForCandidate(electionId, i);

                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';

                const nameSpan = document.createElement('span');
                nameSpan.className = 'candidate-name';
                nameSpan.textContent = candidateName;

                const voteSpan = document.createElement('span');
                voteSpan.className = 'vote-count';
                voteSpan.textContent = `Votes: ${voteCount.toString()}`;

                resultItem.appendChild(nameSpan);
                resultItem.appendChild(voteSpan);
                resultsContainerEl.appendChild(resultItem);

                totalVotes += voteCount.toNumber();
            }

            statusMessageEl.textContent = `Results loaded successfully. Total votes cast: ${totalVotes}`;
        } catch (error) {
            statusMessageEl.textContent = "Could not load election results.";
            console.error(error);
        }
    }

    init();
});
