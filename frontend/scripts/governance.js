// import { BACKEND_URL } from "../config.js";

// document.addEventListener('DOMContentLoaded', async () => {
//     // Fallback for BACKEND_URL
//     if (!BACKEND_URL) {
//         console.error("BACKEND_URL is not defined. Check config.js.");
//         alert("Configuration error: Backend URL missing.");
//         window.location.href = './index.html';
//         return;
//     }

//     // Token verification

//     try {
//         const response = await fetch(`${BACKEND_URL}/api/Verify-Token`, {
//             method: 'GET',
//             credentials: 'include'
//         });

//         if (!response.ok) {
//             console.warn("Token verification failed:", response.status);
//             alert("Access denied. Redirecting to login...");
//             window.location.href = './index.html';
//             return;
//         }

//         // User is authenticated, reveal the page
//         document.documentElement.style.visibility = 'visible';

//     }
//     catch (err) {
//         console.error("Token verification error:", err);
//         alert("Failed to verify access. Redirecting to login...");
//         window.location.href = './index.html';
//         return;
//     }


// });


// //  <script defer>
// document.addEventListener('DOMContentLoaded', () => {

//     if (typeof ethers === 'undefined') {
//         alert('CRITICAL ERROR: Ethers.js did not load. Please check your internet connection, disable ad-blockers, and perform a hard refresh (Ctrl+F5). The DApp cannot run without it.');
//         document.querySelectorAll('button').forEach(btn => btn.disabled = true);
//         document.getElementById('connectWalletBtn').textContent = 'Error: Library Missing';
//         return;
//     }

//     const contractAddress = "0x0e01b6887CEF7770144297bdfc79C2335BF09F62";
//     const contractABI = [
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "_verifier",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
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
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "endTime",
//                     "type": "uint256"
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
//                     "internalType": "uint256",
//                     "name": "candidateIndex",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "Voted",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "bytes32",
//                     "name": "commitment",
//                     "type": "bytes32"
//                 }
//             ],
//             "name": "VoterRegistered",
//             "type": "event"
//         },
//         {
//             "inputs": [],
//             "name": "admin",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "bytes32",
//                     "name": "",
//                     "type": "bytes32"
//                 }
//             ],
//             "name": "commitments",
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
//                     "internalType": "string",
//                     "name": "_name",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "_durationInMinutes",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "string[]",
//                     "name": "_candidateNames",
//                     "type": "string[]"
//                 }
//             ],
//             "name": "createElection",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "newElectionId",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "_electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "endElection",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "_electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "getCandidateCount",
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
//                     "name": "_electionId",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "index",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "getCandidateName",
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
//                     "internalType": "uint256",
//                     "name": "counter",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "getGeneratedElectionId",
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
//             "inputs": [],
//             "name": "getNextElectionCounter",
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
//                     "name": "_electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "getTotalVotes",
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
//                     "name": "_electionId",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "index",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "getVotesForCandidate",
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
//                     "internalType": "bytes32",
//                     "name": "_commitment",
//                     "type": "bytes32"
//                 }
//             ],
//             "name": "isRegistered",
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
//                     "internalType": "bytes32",
//                     "name": "_commitment",
//                     "type": "bytes32"
//                 }
//             ],
//             "name": "registerCommitment",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "_electionId",
//                     "type": "string"
//                 }
//             ],
//             "name": "showResult",
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
//             "inputs": [],
//             "name": "verifier",
//             "outputs": [
//                 {
//                     "internalType": "contract Verifier",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "_electionId",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256[2]",
//                     "name": "a",
//                     "type": "uint256[2]"
//                 },
//                 {
//                     "internalType": "uint256[2][2]",
//                     "name": "b",
//                     "type": "uint256[2][2]"
//                 },
//                 {
//                     "internalType": "uint256[2]",
//                     "name": "c",
//                     "type": "uint256[2]"
//                 },
//                 {
//                     "internalType": "uint256[4]",
//                     "name": "input",
//                     "type": "uint256[4]"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "candidateIndex",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "voteWithZKProof",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         }
//     ];




//     let provider, signer, contract;
//     let currentElectionId = null;
//     let lastTxHash = null;
//     let timerInterval;
//     let resultChart;

//     const connectWalletBtn = document.getElementById('connectWalletBtn');
//     const startVotingBtn = document.getElementById('startVotingBtn');
//     const endVotingBtn = document.getElementById('endVotingBtn');
//     const copyLinkBtn = document.getElementById('copyLinkBtn');
//     const copyTxnBtn = document.getElementById('copyTxnBtn');
//     const addCandidateBtn = document.getElementById('addCandidateBtn');
//     const electionIdDisplay = document.getElementById('electionIdDisplay');
//     const voteCountDisplay = document.getElementById('voteCount');
//     const timerDisplay = document.getElementById('timer');
//     const timerCircle = document.querySelector('.timer-circle');

//     function init() {
//         connectWalletBtn.addEventListener('click', connectWallet);
//         startVotingBtn.addEventListener('click', startElection);
//         endVotingBtn.addEventListener('click', endElection);
//         copyLinkBtn.addEventListener('click', copyVotingLink);
//         copyTxnBtn.addEventListener('click', () => copyText(lastTxHash));
//         addCandidateBtn.addEventListener('click', addCandidate);
//         initializeChart();
//         addCandidate();
//         addCandidate();
//     }

//     async function connectWallet() {
//         if (typeof window.ethereum === 'undefined') return alert('MetaMask is not installed.');
//         try {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             provider = new ethers.providers.Web3Provider(window.ethereum);
//             signer = provider.getSigner();
//             contract = new ethers.Contract(contractAddress, contractABI, signer);
//             const address = await signer.getAddress();

//             sessionStorage.setItem('connectedWallet', address);

//             connectWalletBtn.textContent = `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
//             connectWalletBtn.disabled = true;
//             startVotingBtn.disabled = false;
//             console.log("Wallet connected. Fetching latest election state...");
//             await updateDashboardWithLatestElection();
//         } catch (error) {
//             console.error("Failed to connect wallet:", error);
//             alert(`Error connecting wallet: ${error.message}`);
//         }
//     }

//     async function updateDashboardWithLatestElection() {
//         if (!contract) return;
//         clearInterval(timerInterval);
//         electionIdDisplay.textContent = "Loading...";
//         try {
//             const nextCounter = await contract.getNextElectionCounter();
//             if (nextCounter.eq(0)) {
//                 console.log("No elections created yet.");
//                 electionIdDisplay.textContent = "No elections yet";
//                 setCreateMode();
//                 resetUIForNewElection();
//                 return;
//             }

//             const latestElectionCounter = nextCounter;
//             currentElectionId = await contract.getGeneratedElectionId(latestElectionCounter);

//             if (!currentElectionId) {
//                 electionIdDisplay.textContent = `Could not find ID for counter ${latestElectionCounter}`;
//                 return;
//             }

//             electionIdDisplay.textContent = "Fetching details...";
//             const filter = contract.filters.ElectionCreated(currentElectionId, null, null);
//             const events = await contract.queryFilter(filter, -5000, 'latest');

//             if (events.length > 0) {
//                 const latestEvent = events[events.length - 1];
//                 const block = await latestEvent.getBlock();
//                 const startTime = block.timestamp;
//                 const endTime = latestEvent.args.endTime.toNumber();
//                 const electionName = latestEvent.args.name;

//                 lastTxHash = latestEvent.transactionHash;

//                 electionIdDisplay.textContent = currentElectionId;
//                 document.getElementById('votingTopic').value = electionName;
//                 copyLinkBtn.disabled = false;

//                 const nowInSeconds = Math.floor(Date.now() / 1000);
//                 const isOver = await contract.showResult(currentElectionId);

//                 if (isOver) {
//                     timerDisplay.textContent = "Ended";
//                     timerCircle.style.background = `conic-gradient(#ef4444 100%, #e5e7eb 100%)`;
//                     setCreateMode();
//                 } else {
//                     startBlockchainTimer(startTime, endTime);
//                     setVoteMode();
//                 }
//             } else {
//                 electionIdDisplay.textContent = `Event not found for ID: ${currentElectionId}`;
//             }
//             await updateTotalVoteCount();
//             await showResults();
//         } catch (error) {
//             console.error("Could not update dashboard:", error);
//             electionIdDisplay.textContent = "Error fetching ID";
//             if (error.code === -32603) {
//                 alert("Network Error: Could not fetch data (Gateway Timeout). Please check your network in MetaMask.");
//             }
//         }
//     }

//     async function updateTotalVoteCount() {
//         if (contract && currentElectionId) {
//             try {
//                 const count = await contract.getTotalVotes(currentElectionId);
//                 voteCountDisplay.textContent = count.toString();
//             } catch (err) {
//                 voteCountDisplay.textContent = 'N/A';
//             }
//         }
//     }

//     async function startElection() {
//         if (!contract) return alert('Please connect your wallet first.');

//         const topic = document.getElementById('votingTopic').value;
//         const duration = document.getElementById('timerInput').value;
//         const candidateInputs = document.querySelectorAll('.candidate-input');
//         const candidateNames = Array.from(candidateInputs).map(input => input.value).filter(name => name.trim() !== '');

//         if (!topic || !duration || candidateNames.length < 2) return alert('Please fill in topic, duration, and at least two candidates.');

//         startVotingBtn.textContent = 'Confirm in MetaMask...';
//         startVotingBtn.disabled = true;

//         try {
//             const tx = await contract.createElection(topic, duration, candidateNames);

//             trackTransaction(tx.hash);
//             startVotingBtn.textContent = 'Confirming on Blockchain...';

//             const receipt = await tx.wait();
//             lastTxHash = receipt.transactionHash;
//             console.log("Transaction confirmed:", receipt);

//             await updateDashboardWithLatestElection();
//             alert('Election created successfully! Updating dashboard...');

//             saveCriteria(currentElectionId);

//         } catch (error) {
//             console.error("Election creation failed:", error);
//             alert(`Error creating election: ${error.message || error}`);
//         } finally {
//             startVotingBtn.textContent = 'Start Voting';
//             if (signer) startVotingBtn.disabled = false;
//         }
//     }

//     async function endElection() {
//         if (!contract || !currentElectionId) return alert('No active election selected.');

//         endVotingBtn.textContent = "Ending...";
//         endVotingBtn.disabled = true;

//         try {
//             const tx = await contract.endElection(currentElectionId);
//             trackTransaction(tx.hash);
//             const receipt = await tx.wait();
//             lastTxHash = receipt.transactionHash;

//             await updateDashboardWithLatestElection();
//             alert('Election ended successfully!');

//         } catch (error) {
//             console.error("Failed to end election:", error);
//             alert(`Error ending election: ${error.message}`);
//         } finally {
//             endVotingBtn.textContent = "End Voting";
//             if (signer) endVotingBtn.disabled = false;
//         }
//     }

//     async function showResults() {
//         if (!contract || !currentElectionId) {
//             initializeChart([], []);
//             updateResultList([], []);
//             return;
//         };
//         try {
//             const canShowResult = await contract.showResult(currentElectionId);
//             if (!canShowResult) {
//                 initializeChart([], []);
//                 updateResultList([], []);
//                 return;
//             }
//             const candidateCountBigNum = await contract.getCandidateCount(currentElectionId);
//             const candidateCount = candidateCountBigNum.toNumber();
//             const labels = [];
//             const data = [];

//             for (let i = 0; i < candidateCount; i++) {
//                 const name = await contract.getCandidateName(currentElectionId, i);
//                 const votes = await contract.getVotesForCandidate(currentElectionId, i);
//                 labels.push(name);
//                 data.push(votes.toNumber());
//             }

//             initializeChart(labels, data);
//             updateResultList(labels, data);
//         } catch (err) {
//             console.error("Could not display results:", err);
//             initializeChart([], []);
//         }
//     }

//     function setCreateMode() {
//         startVotingBtn.classList.remove('hidden');
//         endVotingBtn.classList.add('hidden');
//         if (signer) startVotingBtn.disabled = false;
//     }

//     function setVoteMode() {
//         startVotingBtn.classList.add('hidden');
//         endVotingBtn.classList.remove('hidden');
//         if (signer) endVotingBtn.disabled = false;
//     }

//     function addCandidate() {
//         const box = document.getElementById("candidates");
//         const input = document.createElement("input");
//         input.className = "candidate-input";
//         input.placeholder = `Candidate ${box.children.length + 1} name...`;
//         box.appendChild(input);
//     }

//     function resetUIForNewElection() {
//         document.getElementById('votingTopic').value = '';
//         document.getElementById('timerInput').value = '';
//         document.getElementById('candidates').innerHTML = '';
//         addCandidate();
//         addCandidate();
//         timerDisplay.textContent = '00:00';
//         timerCircle.style.background = `conic-gradient(#e5e7eb 0%, #e5e7eb 100%)`;
//         initializeChart([], []);
//         updateResultList([], []);
//     }

//     function startBlockchainTimer(startTime, endTime) {
//         clearInterval(timerInterval);
//         const a_second_in_ms = 1000;
//         const totalDuration = endTime - startTime;

//         timerInterval = setInterval(() => {
//             const nowInSeconds = Math.floor(Date.now() / a_second_in_ms);
//             const secondsLeft = endTime - nowInSeconds;

//             if (secondsLeft < 0) {
//                 clearInterval(timerInterval);
//                 timerDisplay.textContent = "Ended";
//                 timerCircle.style.background = `conic-gradient(#ef4444 100%, #e5e7eb 100%)`;
//                 setCreateMode();
//                 showResults();
//                 return;
//             }

//             const min = Math.floor(secondsLeft / 60);
//             const sec = secondsLeft % 60;
//             timerDisplay.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

//             const elapsed = nowInSeconds - startTime;
//             const percentage = totalDuration > 0 ? Math.min(100, (elapsed / totalDuration) * 100) : 0;
//             timerCircle.style.background = `conic-gradient(#38bdf8 ${percentage}%, #e5e7eb ${percentage}%)`;

//             if (secondsLeft % 10 === 0) updateTotalVoteCount();
//         }, a_second_in_ms);
//     }

//     function initializeChart(labels = [], data = []) {
//         const ctx = document.getElementById("resultChart").getContext("2d");
//         const backgroundColors = ['#4ade80', '#f87171', '#38bdf8', '#fbbf24', '#a78bfa', '#f472b6', '#22d3ee', '#86efac'];
//         if (resultChart) resultChart.destroy();
//         resultChart = new Chart(ctx, {
//             type: "doughnut",
//             data: {
//                 labels: labels.length > 0 ? labels : ["No data"],
//                 datasets: [{ data: data.length > 0 ? data : [1], backgroundColor: data.length > 0 ? backgroundColors.slice(0, data.length) : ["#e5e7eb"], borderWidth: 0 }]
//             },
//             options: { cutout: "70%", plugins: { legend: { display: false }, tooltip: { enabled: data.length > 0 } }, responsive: true }
//         });
//     }

//     function updateResultList(labels, data) {
//         const list = document.getElementById('resultList');
//         list.innerHTML = '';
//         const totalVotes = data.reduce((sum, current) => sum + current, 0);
//         if (labels.length === 0 || !currentElectionId) {
//             const li = document.createElement('li');
//             li.textContent = 'Results are not available.';
//             list.appendChild(li);
//             return;
//         }
//         if (totalVotes === 0 && currentElectionId) {
//             const li = document.createElement('li');
//             li.textContent = 'No votes cast yet.';
//             list.appendChild(li);
//             return;
//         }
//         labels.forEach((label, index) => {
//             const percentage = totalVotes > 0 ? ((data[index] / totalVotes) * 100).toFixed(1) : 0;
//             const li = document.createElement('li');
//             li.textContent = `${percentage}% ${label} (${data[index]} votes)`;
//             list.appendChild(li);
//         });
//     }

//     function copyText(text) {
//         if (!text || text === '0xTxHash123...') return alert("Nothing to copy yet.");
//         navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!")).catch(err => {
//             alert("Failed to copy text.");
//             console.error('Clipboard copy failed', err);
//         });
//     }

//     function getVotingPagePath() {
//         // On localhost (any port), use /frontend/vote.html
//         if (
//             window.location.hostname === 'localhost' ||
//             window.location.hostname === '127.0.0.1'
//         ) {
//             return '/frontend/vote.html';
//         } else {
//             return '/vote.html';
//         }
//     }

//     function copyVotingLink() {
//         if (!currentElectionId) return alert("No election ID available to generate a link.");
//         const voteUrl = `${window.location.origin}${getVotingPagePath()}?electionId=${currentElectionId}`;
//         copyText(voteUrl);
//     }


//     function setStepperStatus(currentStep) {
//         for (let i = 1; i <= 4; i++) {
//             const step = document.getElementById(`step-${i}`);
//             if (!step) continue;
//             if (i < currentStep) {
//                 step.classList.add('completed');
//                 step.classList.remove('active');
//             } else if (i === currentStep) {
//                 if (i === 4) {
//                     step.classList.add('completed');
//                     step.classList.remove('active');
//                 } else {
//                     step.classList.add('active');
//                     step.classList.remove('completed');
//                 }

//             } else {
//                 step.classList.remove('active', 'completed');
//             }
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




//     // Start the application
//     init();
// });
// // </script>

// const saveCriteria = async (yourElectionId) => {

//     const criteria = {
//         onlyIITP: document.getElementById('onlyIITP').checked,
//         account10Days: document.getElementById('account10Days').checked,
//         completedPartX: document.getElementById('completedPartX').checked,
//         connectedGoogleAccount: document.getElementById('connectedGoogleAccount').checked
//     };

//     const topic = document.getElementById('votingTopic').value;

//     if (!topic.trim()) {
//         alert("Please enter a voting topic.");
//         return;
//     }

//     try {
//         const response = await fetch(`${BACKEND_URL}/api/Save-Election-Criteria`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//             body: JSON.stringify({
//                 election_id: yourElectionId, // Replace with actual election ID
//                 criteria: criteria,
//                 topic: topic
//             })
//         });
//         const data = await response.json();
//         // handle success (e.g., show a confirmation message)
//         if (data.status === "1") {
//             console.log("Criteria set successfully:", data);
//         } else {
//             console.warn("Failed to set criteria:", data.message);
//         }
//     } catch (error) {
//         console.error("Error setting criteria:", error);
//         alert("Failed to set election criteria. Please try again.");
//     }
// };

// // Update stepper UI based on current step (1 to 4)








// governance.js (Cleaned Version - No ZKP, No Commitment)

import { BACKEND_URL } from "../config.js";

document.addEventListener('DOMContentLoaded', async () => {
    if (!BACKEND_URL) {
        alert("Configuration error: Backend URL missing.");
        window.location.href = './index.html';
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/Verify-Token`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            alert("Access denied. Redirecting to login...");
            window.location.href = './index.html';
            return;
        }

        document.documentElement.style.visibility = 'visible';
    } catch (err) {
        console.error("Token verification error:", err);
        alert("Failed to verify access.");
        window.location.href = './index.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof ethers === 'undefined') {
        alert('CRITICAL ERROR: Ethers.js not found.');
        return;
    }
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

    let provider, signer, contract;
    let currentElectionId = null;
    let lastTxHash = null;

    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const startVotingBtn = document.getElementById('startVotingBtn');
    const endVotingBtn = document.getElementById('endVotingBtn');
    const addCandidateBtn = document.getElementById('addCandidateBtn');

    connectWalletBtn.addEventListener('click', connectWallet);
    startVotingBtn.addEventListener('click', startElection);
    endVotingBtn.addEventListener('click', endElection);
    addCandidateBtn.addEventListener('click', addCandidate);

    function addCandidate() {
        const box = document.getElementById("candidates");
        if (!box) {
            console.warn("Missing 'candidates' container");
            return;
        }
        const input = document.createElement("input");
        input.className = "candidate-input";
        input.placeholder = `Candidate ${box.children.length + 1} name...`;
        box.appendChild(input);
    }

    async function connectWallet() {
        if (!window.ethereum) return alert('Install MetaMask first.');

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            const address = await signer.getAddress();
            connectWalletBtn.textContent = `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
            connectWalletBtn.disabled = true;
            startVotingBtn.disabled = false;

            await updateElectionDetails();
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    }

    async function startElection() {
        const topic = document.getElementById('votingTopic').value;
        const duration = document.getElementById('timerInput').value;
        const candidateNames = Array.from(document.querySelectorAll('.candidate-input'))
            .map(i => i.value.trim()).filter(Boolean);

        if (!topic || !duration || candidateNames.length < 2) {
            return alert('Fill topic, duration, and at least 2 candidates.');
        }

        try {
            const tx = await contract.createElection(topic, duration, candidateNames);
            trackTransaction(tx.hash);
            await tx.wait();
            alert("Election created!");
            await updateElectionDetails();
        } catch (err) {
            console.error("Election creation failed:", err);
        }
    }

    async function endElection() {
        if (!currentElectionId) return;

        try {
            const tx = await contract.endElection(currentElectionId);
            trackTransaction(tx.hash);
            await tx.wait();
            alert("Election ended.");
            await updateElectionDetails();
        } catch (err) {
            console.error("Failed to end election:", err);
        }
    }

    async function updateElectionDetails() {
        try {
            const counter = await contract.getNextElectionCounter();
            currentElectionId = await contract.getGeneratedElectionId(counter);
            document.getElementById('electionIdDisplay').textContent = currentElectionId;

            const totalVotes = await contract.getTotalVotes(currentElectionId);
            document.getElementById('voteCount').textContent = totalVotes.toString();
        } catch (err) {
            console.error("Election details error:", err);
        }
    }

    async function trackTransaction(txHash) {
        if (!provider) return;

        setStepperStatus(1); setStepTimestamp(1, new Date().toLocaleString());
        setStepperStatus(2); setStepTimestamp(2, new Date().toLocaleString());

        try {
            await provider.waitForTransaction(txHash);
            setStepperStatus(3); setStepTimestamp(3, new Date().toLocaleString());
        } catch (err) {
            console.error("Transaction wait error:", err);
        }
    }

    function setStepperStatus(currentStep) {
        for (let i = 1; i <= 3; i++) {
            const step = document.getElementById(`step-${i}`);
            if (!step) continue;

            if (i < currentStep) step.classList.add('completed');
            else if (i === currentStep) step.classList.add('active');
            else step.classList.remove('active', 'completed');
        }
    }

    function setStepTimestamp(step, ts) {
        const el = document.getElementById(`ts-${step}`);
        if (el) el.textContent = ts;
    }

    // Initial candidate inputs
    addCandidate();
    addCandidate();
});
