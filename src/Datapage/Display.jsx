import './Display.css';
import React from 'react';
import './Upload.css'
import { useState }  from 'react';
import { useFileUpload, pinFileToIPFS } from "./ipfs.js";
import {ethers} from 'ethers';
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

export default function Display() {
    const { file, handleFileChange } = useFileUpload();
    const [contract, setContract] = useState(null);
	const [ipfsLinks, setIpfsLinks] = useState([]);


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
        <div class='display-page'>
            <div class="search">
            <button onClick={fetchFromIPFS}>Fetch from IPFS</button>
		<ul>
			{ipfsLinks.map((link, index) => (
				<li key={index}>
					<a href={link} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
				</li>
			))}
		</ul>
            </div>
        </div>
    );
};
