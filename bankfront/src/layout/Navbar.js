import React, { useState, Fragment, useContext } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBBtn,
    MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';


import "../css/Navbar.css"

import LoginModal from "../Components/LoginModal";


const Navbar = (props) => {



    const [isOpen, setIsOpen] = useState(false);

    const [toggledLogin, setToggledLogin] = useState(false)

    const ToggleLogin = () => {
        setToggledLogin(!toggledLogin);
    }

    const ToggleCollapse = () => {
        setIsOpen(!isOpen);

    }

    const NotLoggedNavBar = () => {
        return (<Fragment>


            <MDBNavItem>
                <MDBBtn className="login" color="indigo" onClick={ToggleLogin}>
                    Login
                </MDBBtn>
            </MDBNavItem>  </Fragment>)
    }

    const LoggedNavBar = () => {
        return (<Fragment>
            <MDBNavItem>

                <h5 style={{ "color": "white" }}>
                    {props.auth.user.role}
                </h5>

            </MDBNavItem>

            <MDBNavItem>


                <MDBBtn onClick={props.auth.logout} color="indigo">Logout</MDBBtn>

            </MDBNavItem>

        </Fragment>)
    }


    return (
        <Fragment>
            <MDBNavbar className="navbar" dark light color="secondary" expand="md">
                <MDBNavbarBrand className="logo">
                    <strong className="white-text">DANOUS</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={ToggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav className="right-nav" right>

                        {props.auth.isAuthenticated ? <LoggedNavBar /> : <NotLoggedNavBar />}
                    </MDBNavbarNav>
                </MDBCollapse>

            </MDBNavbar>

            <LoginModal isOpen={toggledLogin} toggle={ToggleLogin} collapse={ToggleCollapse} auth={props.auth} />

        </Fragment>

    );
}


export default Navbar;