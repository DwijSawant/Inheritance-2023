import Navbar from "../Navbar/Navbar";
import './Homepage.css';
import medbackvid from "../assets/medbackvid.mp4";
const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <div>
                <div className='video-background'>
                    <video src={medbackvid} autoPlay loop muted />
                </div>
                <h1 className="heading">
                    MediBlock
                    <div className="subheading">
                        Your health, your data, your control: Take ownership with our innovative blockchain-enabled platform.
                    </div>
                </h1>
            </div>
            <div className="container">
                <div className="box">
                    <span className="title">What is MediBlock?</span>
                    <div>
                        <p className="aboutus">
                            MediBlock is a non-profit project made to maintain the social security of delicate medical data of patients using the concept of blockchain. Our goal is to make the data of our users protected at all costs. By leveraging the transparency and immutability of the blockchain, MediBlock aims to empower individuals with greater control over their health information while fostering trust among healthcare providers. We believe that safeguarding sensitive medical data is not just a priority but a fundamental right, and through the continued development of our initiative, we strive to contribute to a more resilient and patient-centric healthcare system.
                        </p>
                    </div>
                </div>
            </div>
            <h1 id='features'>Features</h1>
            <div className='card-holder'>
                <div className="card" id="cA">HARD TO HACK</div>
                <div className="card" id="cB">DATA SECURITY</div>
                <div className="card" id="cC">PRIVACY</div>
                <div className="card" id="cD">TRANSPARENCY</div>
            </div>
            <div>
                <div className='howholder'><h1>How to use?</h1></div>
                <div className="card2" id='cardleft'>
                    <div className="num"><h1>1</h1></div>
                    <div className="textBox">
                        <div className="textContent">
                            <p className="h1">Prerequisites</p>
                        </div>
                        <p className="p">You need to have a Metamask account to use MediBlock. Click the following button to create your Metamask account <button className="link"><a href="https://metamask.io/download/" target="_blank">Create Metamask Wallet</a></button></p>
                        <div></div>
                    </div>
                </div>
                <div className="card2" id='cardright'>
                    <div className="num"><h1>2</h1></div>
                    <div className="textBox">
                        <div className="textContent">
                            <p className="h1">Link to MediBlock</p>
                        </div>
                        <p className="p">To access your reports, click the "Connect Wallet" button on the top right to link your Metamask account with MediBlock</p>
                        <div></div>
                    </div>
                </div>
                <div className="card2" id='cardleft'>
                    <div className="num"><h1>3</h1></div>
                    <div className="textBox">
                        <div className="textContent">
                            <p className="h1">Accessing files</p>
                        </div>
                        <p className="p">Once you're logged in with MediBlock, upload/select the patient report</p>
                        <div></div>
                    </div>
                </div>
            </div>
            <footer className='footer'>
                <h1>MediBlock</h1>
            </footer>
        </div>
    );
};

export default HomePage;
