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


            const electionTopicEl = document.getElementById('electionTopic');
            const electionIdDisplayEl = document.getElementById('electionIdDisplay');
            const resultsContainerEl = document.getElementById('resultsContainer');
            const statusMessageEl = document.getElementById('statusMessage');

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

                    statusMessageEl.textContent = "Fetching results...";
                    await loadResults(contract, electionId);

                } catch (e) {
                    statusMessageEl.textContent = "Wallet connection failed or was rejected.";
                    console.error(e);
                }
            }

            async function loadResults(contract, electionId) {
                try {
                    // जांचें कि चुनाव खत्म हो गया है या नहीं
                    const isElectionOver = await contract.showResult(electionId);
                    if (!isElectionOver) {
                        statusMessageEl.textContent = "This election has not ended yet. Results are not public.";
                        resultsContainerEl.innerHTML = '';
                        return;
                    }

                    // चुनाव का नाम प्राप्त करें
                    const filter = contract.filters.ElectionCreated(electionId);
                    const events = await contract.queryFilter(filter, -5000, 'latest');
                    if (events.length > 0) {
                        electionTopicEl.textContent = events[events.length - 1].args.name;
                    } else {
                        electionTopicEl.textContent = "Election Name Not Found";
                    }

                    const candidateCount = await contract.getCandidateCount(electionId);
                    let totalVotes = 0;
                    resultsContainerEl.innerHTML = ''; // पुराने परिणामों को साफ़ करें

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









            // Set timestamp text for each step
            function setStepTimestamp(step, ts) {
                const el = document.getElementById(`ts-${step}`);
                if (el) el.textContent = ts;
            }

            // Function to track transaction status live and update UI
            async function trackTransaction(txHash) {
                if (!provider) return;

                // Step 1: Transaction passed ZKP circuit (assumed immediate)
                setStepperStatus(1);
                setStepTimestamp(1, new Date().toLocaleString());

                // Step 2: Transaction signed (immediate)
                setStepperStatus(2);
                setStepTimestamp(2, new Date().toLocaleString());

                // Step 3: Waiting for block confirmation (immediate simulation)
                setStepperStatus(3);
                setStepTimestamp(3, new Date().toLocaleString());

                // Step 4: Wait for actual blockchain confirmation
                try {
                    const receipt = await provider.waitForTransaction(txHash);
                    setStepperStatus(4);
                    setStepTimestamp(4, new Date().toLocaleString());
                } catch (err) {
                    console.error("Transaction confirmation error:", err);
                    // Optionally handle error UI here
                }
            }








            init();
        });