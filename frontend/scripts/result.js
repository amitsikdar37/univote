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







// document.addEventListener('DOMContentLoaded', () => {


//     const electionTopicEl = document.getElementById('electionTopic');
//     const electionIdDisplayEl = document.getElementById('electionIdDisplay');
//     const resultsContainerEl = document.getElementById('resultsContainer');
//     const statusMessageEl = document.getElementById('statusMessage');
//     const countdownEl = document.getElementById("countdownTimer");
//     const endTimeEl = document.getElementById("electionEndTime");

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

//             statusMessageEl.textContent = "Checking election timing...";
//             const details = await contract.getElectionDetails(electionId);
//             const startTime = parseInt(details.startTime.toString()) * 1000;
//             const durationMinutes = parseInt(details.durationMinutes.toString());
//             const endTime = startTime + durationMinutes * 60 * 1000;

//             const endTimeText = new Date(endTime).toLocaleString();
//             endTimeEl.textContent = `Ends at: ${endTimeText}`;

//             const now = Date.now();
//             if (now >= endTime) {
//                 statusMessageEl.textContent = "Election ended. Fetching results...";
//                 await loadResults(contract, electionId);
//             } else {
//                 const timeLeft = endTime - now;
//                 showCountdown(endTime);
//                 statusMessageEl.textContent = "Election is still running. Results will appear once it ends.";
//                 setTimeout(async () => {
//                     statusMessageEl.textContent = "Election ended. Fetching results...";
//                     await loadResults(contract, electionId);
//                 }, timeLeft);
//             }
//         } catch (e) {
//             statusMessageEl.textContent = "Wallet connection failed or was rejected.";
//             console.error(e);
//         }
//     }

//     function showCountdown(endTime) {
//         const interval = setInterval(() => {
//             const now = Date.now();
//             const diff = endTime - now;
//             if (diff <= 0) {
//                 clearInterval(interval);
//                 countdownEl.textContent = "⏰ Election ended. Loading result...";
//             } else {
//                 const mins = Math.floor(diff / 60000);
//                 const secs = Math.floor((diff % 60000) / 1000);
//                 countdownEl.textContent = `⏳ Time left: ${mins}m ${secs}s`;
//             }
//         }, 1000);
//     }

//     async function loadResults(contract, electionId) {
//         try {
//             const isElectionOver = await contract.showResult(electionId);
//             if (!isElectionOver) {
//                 statusMessageEl.textContent = "This election has not ended yet. Results are not public.";
//                 resultsContainerEl.innerHTML = '';
//                 return;
//             }

//             const filter = contract.filters.ElectionCreated(electionId);
//             const events = await contract.queryFilter(filter, -5000, 'latest');
//             if (events.length > 0) {
//                 electionTopicEl.textContent = events[events.length - 1].args.name;
//             } else {
//                 electionTopicEl.textContent = "Election Name Not Found";
//             }

//             const candidateCount = await contract.getCandidateCount(electionId);
//             let totalVotes = 0;
//             resultsContainerEl.innerHTML = '';

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

//     init();
// });






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
//     const countdownEl = document.getElementById("countdownTimer");
//     const endTimeEl = document.getElementById("electionEndTime");

//     async function init() {
//         const urlParams = new URLSearchParams(window.location.search);
//         const electionId = urlParams.get('electionId');

//         if (!electionId) {
//             statusMessageEl.textContent = "❌ Election ID URL mein nahi mila.";
//             return;
//         }

//         electionIdDisplayEl.textContent = `ID: ${electionId}`;

//         if (typeof window.ethereum === 'undefined') {
//             statusMessageEl.textContent = "❌ MetaMask install karo result dekhne ke liye.";
//             return;
//         }

//         try {
//             statusMessageEl.textContent = "🔗 Connecting to wallet...";
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             await provider.send("eth_requestAccounts", []);
//             const contract = new ethers.Contract(contractAddress, contractABI, provider);

//             statusMessageEl.textContent = "⏳ Fetching election timing...";
//             const details = await contract.getElectionDetails(electionId);
//             const startTime = parseInt(details.startTime.toString());
//             const duration = parseInt(details.durationMinutes.toString());
//             const endTime = startTime + duration * 60;
//             const now = Math.floor(Date.now() / 1000);

//             // Show end time
//             endTimeEl.textContent = `Ends at: ${new Date(endTime * 1000).toLocaleString()}`;

//             // ✅ Add your showResult() logic here
//             const isElectionOver = await contract.showResult(electionId);
//             if (!isElectionOver) {
//                 statusMessageEl.textContent = "⏳ This election has not ended yet. Results are not public.";
//                 return;
//             }

//             statusMessageEl.textContent = "✅ Election ended. Fetching results...";
//             await loadResults(contract, electionId);

//         } catch (e) {
//             statusMessageEl.textContent = "❌ Wallet connection failed ya reject ho gaya.";
//             console.error(e);
//         }
//     }

//     async function loadResults(contract, electionId) {
//         try {
//             const candidates = await contract.getCandidates(electionId);
//             let totalVotes = 0;
//             resultsContainerEl.innerHTML = ''; // Clear previous

//             candidates.forEach((c, i) => {
//                 const resultItem = document.createElement('div');
//                 resultItem.className = 'result-item';

//                 const nameSpan = document.createElement('span');
//                 nameSpan.className = 'candidate-name';
//                 nameSpan.textContent = `${i + 1}. ${c.name}`;

//                 const voteSpan = document.createElement('span');
//                 voteSpan.className = 'vote-count';
//                 voteSpan.textContent = `Votes: ${c.voteCount.toString()}`;

//                 resultItem.appendChild(nameSpan);
//                 resultItem.appendChild(voteSpan);
//                 resultsContainerEl.appendChild(resultItem);

//                 totalVotes += parseInt(c.voteCount.toString());
//             });

//             statusMessageEl.textContent = `✅ Results loaded. Total votes: ${totalVotes}`;

//         } catch (error) {
//             statusMessageEl.textContent = "❌ Could not load election results.";
//             console.error(error);
//         }
//     }

//     init();
// });




// document.addEventListener('DOMContentLoaded', async () => {
//     const contractAddress = "0x5ac18C2b545795e4573CCD75EEC2375939502b83";
//     const rpcURL = "https://sepolia.base.org"; // Use your Base Sepolia RPC URL or Infura/Alchemy
//     const provider = new ethers.providers.JsonRpcProvider(rpcURL);

//     // const contractABI = [ /* --- your full ABI here --- */ ];
//     // const contractAddress = "0x5ac18C2b545795e4573CCD75EEC2375939502b83";
//     const contractABI = [{
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "value",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "length",
//                 "type": "uint256"
//             }
//         ],
//         "name": "StringsInsufficientHexLength",
//         "type": "error"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "name",
//                 "type": "string"
//             }
//         ],
//         "name": "CandidateAdded",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "creator",
//                 "type": "address"
//             }
//         ],
//         "name": "ElectionCreated",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             }
//         ],
//         "name": "ElectionEnded",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "voter",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "candidateIndex",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Voted",
//         "type": "event"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "name",
//                 "type": "string"
//             }
//         ],
//         "name": "addCandidate",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "name",
//                 "type": "string"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "durationInMinutes",
//                 "type": "uint256"
//             }
//         ],
//         "name": "createElection",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "name": "electionExists",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "electionIds",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             }
//         ],
//         "name": "endElection",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getAllElectionIds",
//         "outputs": [
//             {
//                 "internalType": "string[]",
//                 "name": "",
//                 "type": "string[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             }
//         ],
//         "name": "getCandidates",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "string",
//                         "name": "name",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "voteCount",
//                         "type": "uint256"
//                     }
//                 ],
//                 "internalType": "struct UniVote.Candidate[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             }
//         ],
//         "name": "getElectionDetails",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "id",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "name",
//                 "type": "string"
//             },
//             {
//                 "internalType": "address",
//                 "name": "creator",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "startTime",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "durationMinutes",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "bool",
//                 "name": "isEnded",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             }
//         ],
//         "name": "getResults",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "string",
//                         "name": "name",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "voteCount",
//                         "type": "uint256"
//                     }
//                 ],
//                 "internalType": "struct UniVote.Candidate[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "totalElections",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "electionId",
//                 "type": "string"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "candidateIndex",
//                 "type": "uint256"
//             }
//         ],
//         "name": "vote",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }];
//     const contract = new ethers.Contract(contractAddress, contractABI, provider);

//     const electionTopicEl = document.getElementById('electionTopic');
//     const electionIdDisplayEl = document.getElementById('electionIdDisplay');
//     const resultsContainerEl = document.getElementById('resultsContainer');
//     const statusMessageEl = document.getElementById('statusMessage');
//     const countdownEl = document.getElementById("countdownTimer");
//     const endTimeEl = document.getElementById("electionEndTime");
//     const copyBtn = document.getElementById("copyLinkBtn");

//     const urlParams = new URLSearchParams(window.location.search);
//     const electionId = urlParams.get('electionId');

//     if (!electionId) {
//         statusMessageEl.textContent = "❌ Election ID URL mein nahi mila.";
//         return;
//     }

//     electionIdDisplayEl.textContent = `ID: ${electionId}`;

//     try {
//         const details = await contract.getElectionDetails(electionId);
//         const startTime = parseInt(details.startTime.toString());
//         const duration = parseInt(details.durationMinutes.toString());
//         const endTime = startTime + duration * 60;

//         const electionName = details.name;
//         electionTopicEl.textContent = electionName || "Election";

//         const now = Math.floor(Date.now() / 1000);
//         endTimeEl.textContent = `🕓 Ends at: ${new Date(endTime * 1000).toLocaleString()}`;

//         if (now >= endTime || details.isEnded) {
//             await showResults();
//         } else {
//             statusMessageEl.textContent = "⏳ Election is ongoing...";
//             startCountdown(endTime - now);
//         }

//         copyBtn.addEventListener("click", () => {
//             const link = `${window.location.origin}${window.location.pathname}?electionId=${electionId}`;
//             navigator.clipboard.writeText(link)
//                 .then(() => {
//                     copyBtn.textContent = "✅ Link copied!";
//                     setTimeout(() => copyBtn.textContent = "📋 Copy Result Link", 2000);
//                 })
//                 .catch(() => {
//                     copyBtn.textContent = "❌ Failed to copy";
//                 });
//         });

//     } catch (e) {
//         statusMessageEl.textContent = "❌ Error fetching election details.";
//         console.error(e);
//     }

//     async function showResults() {
//         try {
//             statusMessageEl.textContent = "✅ Election ended. Loading results...";
//             const candidates = await contract.getCandidates(electionId);
//             resultsContainerEl.innerHTML = "";
//             let totalVotes = 0;

//             candidates.forEach((c, i) => {
//                 const resultItem = document.createElement('div');
//                 resultItem.className = 'result-item';

//                 const nameSpan = document.createElement('span');
//                 nameSpan.className = 'candidate-name';
//                 nameSpan.textContent = `${i + 1}. ${c.name}`;

//                 const voteSpan = document.createElement('span');
//                 voteSpan.className = 'vote-count';
//                 voteSpan.textContent = `Votes: ${c.voteCount}`;

//                 resultItem.appendChild(nameSpan);
//                 resultItem.appendChild(voteSpan);
//                 resultsContainerEl.appendChild(resultItem);

//                 totalVotes += parseInt(c.voteCount.toString());
//             });

//             statusMessageEl.textContent = `✅ Results loaded. Total votes: ${totalVotes}`;
//             countdownEl.textContent = "";
//         } catch (err) {
//             statusMessageEl.textContent = "❌ Failed to load results.";
//             console.error(err);
//         }
//     }

//     function startCountdown(seconds) {
//         const interval = setInterval(() => {
//             if (seconds <= 0) {
//                 clearInterval(interval);
//                 showResults();
//                 return;
//             }
//             const m = Math.floor(seconds / 60);
//             const s = seconds % 60;
//             countdownEl.textContent = `⏳ Ends in: ${m}m ${s}s`;
//             seconds--;
//         }, 1000);
//     }
// });




// document.addEventListener('DOMContentLoaded', async () => {
//     const contractAddress = "0x5ac18C2b545795e4573CCD75EEC2375939502b83";
//     const rpcURL = "https://sepolia.base.org";
//     const provider = new ethers.providers.JsonRpcProvider(rpcURL);

//     let connectedProvider = null;
//     let signer = null;

//     const contractABI = [
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "value",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "length",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "StringsInsufficientHexLength",
//             "type": "error"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "string",
//                     "name": "name",
//                     "type": "string"
//                 }
//             ],
//             "name": "CandidateAdded",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 },
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "creator",
//                     "type": "address"
//                 }
//             ],
//             "name": "ElectionCreated",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "ElectionEnded",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "voter",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "candidateIndex",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "Voted",
//             "type": "event"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "name",
//                     "type": "string"
//                 }
//             ],
//             "name": "addCandidate",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "name",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "durationInMinutes",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "createElection",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "name": "electionExists",
//             "outputs": [
//                 {
//                     "internalType": "bool",
//                     "name": "",
//                     "type": "bool"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "electionIds",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "endElection",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "getAllElectionIds",
//             "outputs": [
//                 {
//                     "internalType": "string[]",
//                     "name": "",
//                     "type": "string[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "getCandidates",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "string",
//                             "name": "name",
//                             "type": "string"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "voteCount",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct UniVote.Candidate[]",
//                     "name": "",
//                     "type": "tuple[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "getElectionDetails",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "id",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "name",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "creator",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "startTime",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "durationMinutes",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "bool",
//                     "name": "isEnded",
//                     "type": "bool"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "getResults",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "string",
//                             "name": "name",
//                             "type": "string"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "voteCount",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct UniVote.Candidate[]",
//                     "name": "",
//                     "type": "tuple[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "totalElections",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "electionId",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "candidateIndex",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "vote",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         } 
//     ];

//     const readOnlyContract = new ethers.Contract(contractAddress, contractABI, provider);

//     const electionTopicEl = document.getElementById('electionTopic');
//     const electionIdDisplayEl = document.getElementById('electionIdDisplay');
//     const resultsContainerEl = document.getElementById('resultsContainer');
//     const statusMessageEl = document.getElementById('statusMessage');
//     const countdownEl = document.getElementById("countdownTimer");
//     const endTimeEl = document.getElementById("electionEndTime");
//     const copyBtn = document.getElementById("copyLinkBtn");
//     const connectBtn = document.getElementById("connectWalletBtn");

//     const urlParams = new URLSearchParams(window.location.search);
//     const electionId = urlParams.get('electionId');

//     if (!electionId) {
//         statusMessageEl.textContent = "❌ Election ID URL mein nahi mila.";
//         return;
//     }

//     electionIdDisplayEl.textContent = `ID: ${electionId}`;

//     connectBtn.addEventListener("click", async () => {
//         if (typeof window.ethereum === 'undefined') {
//             alert("⚠️ Please install MetaMask.");
//             return;
//         }
//         try {
//             const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
//             await web3Provider.send("eth_requestAccounts", []);
//             signer = web3Provider.getSigner();
//             connectedProvider = new ethers.Contract(contractAddress, contractABI, signer);
//             connectBtn.textContent = "✅ Wallet Connected";
//             connectBtn.disabled = true;
//         } catch (err) {
//             alert("❌ Wallet connection rejected.");
//             console.error(err);
//         }
//     });

//     try {
//         const details = await readOnlyContract.getElectionDetails(electionId);
//         const startTime = parseInt(details.startTime.toString());
//         const duration = parseInt(details.durationMinutes.toString());
//         const endTime = startTime + duration * 60;

//         const electionName = details.name;
//         electionTopicEl.textContent = electionName || "Election";

//         const now = Math.floor(Date.now() / 1000);
//         endTimeEl.textContent = `🕓 Ends at: ${new Date(endTime * 1000).toLocaleString()}`;

//         if (now >= endTime || details.isEnded) {
//             await showResults();
//         } else {
//             statusMessageEl.textContent = "⏳ Election is ongoing...";
//             startCountdown(endTime - now);
//         }

//         copyBtn.addEventListener("click", () => {
//             const link = `${window.location.origin}${window.location.pathname}?electionId=${electionId}`;
//             navigator.clipboard.writeText(link)
//                 .then(() => {
//                     copyBtn.textContent = "✅ Link copied!";
//                     setTimeout(() => copyBtn.textContent = "📋 Copy Result Link", 2000);
//                 })
//                 .catch(() => {
//                     copyBtn.textContent = "❌ Failed to copy";
//                 });
//         });

//     } catch (e) {
//         statusMessageEl.textContent = "❌ Error fetching election details.";
//         console.error(e);
//     }

//     async function showResults() {
//         try {
//             statusMessageEl.textContent = "✅ Election ended. Loading results...";
//             const candidates = await readOnlyContract.getCandidates(electionId);
//             resultsContainerEl.innerHTML = "";
//             let totalVotes = 0;

//             candidates.forEach((c, i) => {
//                 const resultItem = document.createElement('div');
//                 resultItem.className = 'result-item';

//                 const nameSpan = document.createElement('span');
//                 nameSpan.className = 'candidate-name';
//                 nameSpan.textContent = `${i + 1}. ${c.name}`;

//                 const voteSpan = document.createElement('span');
//                 voteSpan.className = 'vote-count';
//                 voteSpan.textContent = `Votes: ${c.voteCount}`;

//                 resultItem.appendChild(nameSpan);
//                 resultItem.appendChild(voteSpan);
//                 resultsContainerEl.appendChild(resultItem);

//                 totalVotes += parseInt(c.voteCount.toString());
//             });

//             statusMessageEl.textContent = `✅ Results loaded. Total votes: ${totalVotes}`;
//             countdownEl.textContent = "";
//         } catch (err) {
//             statusMessageEl.textContent = "❌ Failed to load results.";
//             console.error(err);
//         }
//     }

//     function startCountdown(seconds) {
//         const interval = setInterval(() => {
//             if (seconds <= 0) {
//                 clearInterval(interval);
//                 showResults();
//                 return;
//             }
//             const m = Math.floor(seconds / 60);
//             const s = seconds % 60;
//             countdownEl.textContent = `⏳ Ends in: ${m}m ${s}s`;
//             seconds--;
//         }, 1000);
//     }
// });











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
