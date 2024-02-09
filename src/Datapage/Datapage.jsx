import './Datapage.css';
import Upload from './Upload';
import Display from './Display';
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Datapage = () => {
    const [active,setActive] = useState("upload");
    return (
        <div>
            <Navbar/>
            <div class='btn2'>
                <button onClick={() => setActive('upload')}>BlockUI</button>
            </div>
            {active === 'upload' && <Upload />}
            {active === 'display' && <Display />}
        </div>
    );
};
export default Datapage;