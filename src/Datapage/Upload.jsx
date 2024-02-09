import React from 'react';
import { IoCloudUploadOutline } from "react-icons/io5"
import './Upload.css'
import { useState } from 'react';
import { useFileUpload, pinFileToIPFS } from "./ipfs.js";
import { ethers } from 'ethers';
import axios from 'axios';
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
const contractAddress = "0xf74521381cf4f0fe83b3216ccc0f77d41890429b"; //adress'o
const abi = [
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
const FileUploader = () => {
    const { file, handleFileChange } = useFileUpload();
    const [contract, setContract] = useState(null);
    const [ipfsLinks, setIpfsLinks] = useState([]);


    const handleUpload = async () => {
        if (file) {
            try {
                await provider.send("eth_requestAccounts", []);
                const accounts = await provider.listAccounts();
                const signer = provider.getSigner(accounts[0]);
                const ipfsHash = await pinFileToIPFS(file);

                // Set contract 
                const contract = new ethers.Contract(contractAddress, abi, signer);
                setContract(contract);

                // Upload ipfsHash to the blockchain
                await contract.uploadFile(ipfsHash);

                console.log("IPFS Hash:", ipfsHash);

            } catch (error) {
                console.error("Error during upload:", error);
            }
        } else {
            console.log('No file selected');
        }
    };
    const fetchFromIPFS = async () => {
        if (contract) {
            try {
                const ipfsHashes = await contract.getFileHashes();

                const links = ipfsHashes.map(hash => `https://gateway.pinata.cloud/ipfs/${hash}`);

                setIpfsLinks(links);
            } catch (error) {
                console.error("Error fetching files from IPFS:", error);
            }
        }
    };

    return (
        <div className="wrapper">
            <header>File Uploader/Fetcher</header>
            <input type="file" onChange={handleFileChange} className='selectfile'/>
            <div>
            <button onClick={handleUpload} className='Backbotm'>Upload</button>
            </div>
                <IoCloudUploadOutline size='100px' />
                <p>Browse File to Upload</p>
            <div className='fetchgang'> {/* fetchwalathing */}
            <button onClick={fetchFromIPFS} className='Backbotm'>Fetch</button>
            <div>
		<ul>
			{ipfsLinks.map((link, index) => (
				<li key={index}>
					<a href={link} target="_blank" rel="noopener noreferrer" className='links'>File {index + 1}</a>
				</li>
			))}
		</ul>
        </div>
        </div>
            
        </div>
    );
};

export default FileUploader;
