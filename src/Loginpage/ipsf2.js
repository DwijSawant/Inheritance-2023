import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMDRhNTY4ZC01YTQyLTQ3YWMtOTU3NC05N2RlNWY4YzRkMWYiLCJlbWFpbCI6ImR3aWpwcmFtb2RzYXdhbnRAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2E5NTljYTVhZGE1OTliYWE4MjUiLCJzY29wZWRLZXlTZWNyZXQiOiJjNGQ2YjEyYTFjMWZlNWYwN2ZiZDQyN2Q1MTNhODY2N2EyMmJkNjI3ZTY1YjhiMzQ0N2RlYjU4MmY1NzVhMmQ5IiwiaWF0IjoxNzA3NTg3OTk1fQ.JX1b5uUi5lR2tcr9OZz93wlzPccbdN7zUebN_Xen6QM';

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
  const fileContent = new Blob([file]);
  formData.append('file',fileContent);
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