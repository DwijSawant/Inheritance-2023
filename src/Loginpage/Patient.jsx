import React from 'react';
import './Patient.css';
import upload from './upload.jpeg'
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ethers } from 'ethers';
import axios from 'axios';
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
]; // ABI of your contract

export default function Patient() {
    const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contract, setContract] = useState(null);
  const [bloodGroup, setBloodGroup,setProfilePicture] = useState('');
  const { file: profilePictureFile, handleFileChange: handleProfilePictureChange, } = useFileUpload();

  const handleProfileUpload = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();
      const signer = provider.getSigner(accounts[0]);

      // Prepare profile data
      const profileData = {
        name,
        age,
        bloodGroup,
        profilePicture: profilePictureFile
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
	  const { name, age, bloodGroup, profilePicture } = response.data;
	  setName(name);
	  setAge(age);
	  setBloodGroup(bloodGroup);
	  // Update profile picture if available
	  setProfilePicture(profilePicture);
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
                <div className='profilepic'>
                    {/* <img src={URL.createObjectURL(profilePictureFile)} alt='upload' id='pic' /> */}
                    <label for='file' id='labelforpic'>Update Image</label>
                    <input type='file' accept='image/jpeg,image.png,image.jpg'onChange={handleProfilePictureChange} />
                    {profilePictureFile && (
                <div>
                   <img src={URL.createObjectURL(profilePictureFile)} alt='upload' id='pic' />
                   
                </div>
            )}
                </div>
                <div class="input-field">
                    <input required="" class="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label class="label" for="input">Enter Name</label>
                </div>
                <div class="input-field">
                    <input required="" class="input" type="text" value={age} onChange={(e) => setAge(e.target.value)}  />
                    <label class="label" for="input">Enter Age</label>
                </div>
                <div class="input-field">
                    <input required="" class="input" type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}/>
                    <label class="label" for="input">Enter Blood Group</label>
                </div>
                <button class="submit-btn" type='button' onClick={handleProfileUpload}>Create</button>
            </form>
        </div>
    )
}
