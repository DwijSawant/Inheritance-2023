import "./Navbar.css";
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
async function SignUp() {
  try {
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    const signer = provider.getSigner(accounts[0]);

    const signature = await signer.signMessage("Connect_wallet"); //mock
    document.getElementById("add").innerText = accounts[0];

  } catch (error) {
    console.error("Error!!!", error);
  }
};
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="Navbar">
      <img src={logo} alt="logo" />
      <span className="nav-logo" onClick={() => navigate("/")}>MediBlock</span>
      <div className='nav-items'>
        <button class='btn' onClick={() => navigate("/Loginpage")}>Profile</button>
        <button class='btn' onClick={() => navigate("/Datapage")}>Documents</button>
        <button id="add" className="btn" onClick={SignUp}>Connect Wallet</button>
      </div>
    </div>
  );
};

export default Navbar;
