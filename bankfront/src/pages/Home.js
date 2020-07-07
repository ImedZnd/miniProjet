import React from "react"

import Navbar from "../layout/Navbar";

import "../App.css"

import heroImage from "../img/bankCard.png"
import Typewriter from 'typewriter-effect';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardBody, MDBCardText, MDBCardTitle, MDBFooter } from "mdbreact";

const Home = (props) => {
    return (
        <div className="jumbo">
            <div style={{ "height": "25px" }}></div>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol>

                        <img className="credit-card"
                            src={heroImage}
                            alt="Call to Action Image" />


                    </MDBCol>

                </MDBRow>
                <MDBRow>
                    <MDBCol><div className="typewriter">
                        <Typewriter
                            options={{
                                strings: ['Fast', 'Secure', 'Stay home'],
                                autoStart: true,
                                loop: true,
                            }}
                        /></div>
                        <div className="home-text">An online banking app</div>
                        <div className="home-text ">Mini projet BD</div>
                    </MDBCol>
                </MDBRow>
                <MDBFooter>
                    <div className="footer-copyright text-center py-3" style={{ "backgroundColor": "white", "color": "black" }}>
                        <MDBContainer fluid>
                            Mini projet BD    {new Date().getFullYear()}
                        </MDBContainer>
                    </div>
                </MDBFooter>
            </MDBContainer>


        </div >
    );
}


export default Home;