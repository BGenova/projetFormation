import {ethers} from 'ethers';


const contractAddress = '0xdb84E906615015C6e7f0Fa36C2D1D72257Da781f'; // adresse du contrat à remplacer
const abi = [{
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256"}, {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "ContributionMade",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountRaised",
        "type": "uint256"
    }],
    "name": "FundingSuccessful",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256"}, {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }],
    "name": "ProjectCreated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256"}, {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256"}],
    "name": "RewardClaimed",
    "type": "event"
}, {
    "inputs": [{"internalType": "uint256", "name": "_projectId", "type": "uint256"}],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_projectId", "type": "uint256"}],
    "name": "closeProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_projectId", "type": "uint256"}],
    "name": "contribute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_name", "type": "string"}, {
        "internalType": "string",
        "name": "_description",
        "type": "string"
    }, {"internalType": "string", "name": "_imageUrl", "type": "string"}, {
        "internalType": "uint256",
        "name": "_fundingGoal",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "_endTime", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_totalSupply",
        "type": "uint256"
    }], "name": "createProject", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "projectCounter",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "projects",
    "outputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
        "internalType": "string",
        "name": "name",
        "type": "string"
    }, {"internalType": "string", "name": "description", "type": "string"}, {
        "internalType": "string",
        "name": "imageUrl",
        "type": "string"
    }, {"internalType": "uint256", "name": "fundingGoal", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "fundsRaised",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "endTime", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "totalSupply",
        "type": "uint256"
    }, {"internalType": "bool", "name": "closed", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}]; // ABI à remplacer

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, abi, signer);

console.log(contract);

/**
 * @class ContractManager
 * @description Manage smart contract Crowdfunding
 *
 */
export class ContractManager {

    __constructor() {
        this.project = [];
    }

    /**
     * @function createProject
     */
    async createProject(name,description,imageUrl,fundingGoal, endTime, totalSupply) {
        console.log(contract);
        console.log(fundingGoal, endTime, totalSupply);
        return await contract.createProject(name,description,imageUrl,fundingGoal, endTime, totalSupply);
    }

    /**
     * @function contribute
     */
    async contribute(projectId, amount) {
        return await contract.contribute(projectId, {value: amount});
    }

    /**
     * @function claimReward
     */
    async claimReward(projectId) {
        return await contract.claimReward(projectId);
    }

    /**
     * @function closeProject
     */
    async closeProject(projectId) {
        return await contract.closeProject(projectId);
    }

    /**
     * @function getProject
     */
    async getProject(projectId) {
        return await contract.projects(projectId);
    }

    /**
     * @function getProject
     */
    async getProjects() {
        let projects = [];
        for (let i = 0; i < await this.getProjectCounter(); i++) {
            projects.push(await contract.projects(i));
        }
        console.log(projects);
        return projects;
    }


    /**
     * @function getProjectCounter
     */
    async getProjectCounter() {
        return await contract.projectCounter();
    }
}