import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZjk5NTYxZC00YjllLTQwZTUtODE1NC01MDEyNGY2ZWM1ODciLCJlbWFpbCI6Im51dGFucHJhbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjhkN2NhMTc4NGFlMTZkZTNkMTIiLCJzY29wZWRLZXlTZWNyZXQiOiJlMWE3NmI4MWM0NzQzZjhmMDE2YjNjNjQ2NDczNWUxZDFjNjcxZmJjZWZmNjBiMzU2OTJjMjgwYmI2NWNiOGUyIiwiaWF0IjoxNzA3MjA4MjgxfQ.xQv-2KITePcu5tVTHmpy04i5ljhFEz-9iCMBzPajwqY';

const useFileUpload = (initialFile = null) => {
  const [file, setFile] = useState(initialFile);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return { file, handleFileChange };
};

const pinFileToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const pinataMetadata = JSON.stringify({
    name: "file",
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`,
      },
      
    });
    const { IpfsHash } = res.data
console.log("Your IPFS CID is:", IpfsHash);
   return  IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export{useFileUpload,pinFileToIPFS};