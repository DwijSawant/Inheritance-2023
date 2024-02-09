import React from 'react';
import "./LoginForm.css";
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
const LoginForm = () => {
  return (
    <div className='wrapper'>
      <form action=''>
        <h1>Login</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' required></input>
          <FaUser className='icon'/>
        </div>
        <div className='input-box'>
          <input type='type' placeholder='Type' required></input>
          <FaBuilding className='icon' />
        </div>
        <div className='link-wallet'>
          <button type='button'>Add wallet</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm