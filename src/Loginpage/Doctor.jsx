import React from 'react';
import './Doctor.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useFileUpload, pinFileToIPFS } from './ipsf2.js';

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
const contractAddress = "0xf74521381cf4f0fe83b3216ccc0f77d41890429b"; // Contract address
const abi =[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "uploader",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "FileUploaded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "fileHashes",
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
        "name": "getFileHashes",
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
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "uploadFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export default function Doctor() {
    const [name, setName] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [contract, setContract] = useState(null);

    const handleProfileUpload2 = async () => {
        try {
            await provider.send("eth_requestAccounts", []);
            const accounts = await provider.listAccounts();
            const signer = provider.getSigner(accounts[0]);

            // Prepare profile data
            const profileData = {
                name,
                hospitalName
            };

            // Convert profile data to JSON and pin it to IPFS
            const ipfsHash = await pinFileToIPFS(JSON.stringify(profileData));

            // Set contract
            const contract = new ethers.Contract(contractAddress, abi, signer);

            // Upload IPFS hash to the blockchain
            await contract.uploadFile(ipfsHash);

            console.log("IPFS Hash:", ipfsHash);
        } catch (error) {
            console.error("Error during profile upload:", error);
        }
    };

    const fetchProfileInformation = async () => {
        if(contract){
            try {
                // Fetch IPFS hash from the blockchain
                const ipfsHash = await contract.getFileHashes();

                // Fetch profile data from IPFS
                const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);

                // Update profile state with fetched data
                const { name, hospitalName } = response.data;
                setName(name);
                setHospitalName(hospitalName);
            } catch (error) {
                console.error("Error fetching profile information:", error);
            }
        }
    };
 
    useEffect(() => {
        async function setupContract() {
            try {
                await provider.send("eth_requestAccounts", []);
                const accounts = await provider.listAccounts();
                const signer = provider.getSigner(accounts[0]);
                const contract = new ethers.Contract(contractAddress, abi, signer);
                setContract(contract);
                await fetchProfileInformation(); 
            } catch (error) {
                console.error("Error setting up contract:", error);
            }
        }
        
        setupContract();

    }, []);

    return (
        <div className='logincard'>
            <form class="form-control" action="">
                <p class="title">Create Your Profile</p>
                <div class="input-field">
                    <input required="" class="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label class="label" for="input">Enter Name</label>
                </div>
                <div class="input-field">
                    <input required="" class="input" type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                    <label class="label" for="input">Enter Hospital's Name</label>
                </div>
                <button type='button' class="submit-btn" onClick={handleProfileUpload2}>Create</button>
            </form>
        </div>
    )
}