import React, { useState, useEffect, useContext } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import "../css/Modal.css"

import 'react-notifications/lib/notifications.css';

import { NotificationManager } from 'react-notifications';

import AuthContext from "../Context/Auth/AuthContext";

const LoginModal = (props) => {

    let history = useHistory();
    const authContext = useContext(AuthContext);

    const { isAuthenticated } = authContext;
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {


        if (isAuthenticated && props.isOpen) {

            props.toggle();
            history.push('/dashboard');
        }

    }, [isAuthenticated, props.isOpen]);


    const { email, password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
        e.preventDefault();

        const res = await props.auth.login({
            "email": email,
            "password": password,

        });
        if (res) {
            console.log(res);
            NotificationManager.error('Verify your email and password', 'Login Failed');

        }
        await close();

    }


    const close = () => {
        if (props.auth.isAuthenticated) {
            props.toggle();
        }
    }

    return (
        <MDBContainer>
            <MDBModal isOpen={props.isOpen} toggle={props.toggle} centered>
                <MDBModalHeader toggle={props.toggle}>
                    <p className="h4 text-center ">Sign in</p>
                </MDBModalHeader>
                <MDBModalBody>

                    <MDBRow>
                        <MDBCol >
                            <form>


                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Your email
                                </label>
                                <input type="email" id="defaultFormLoginEmailEx" name="email" value={email} onChange={onChange} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Your password
                                </label>
                                <input type="password" id="defaultFormLoginPasswordEx" name="password" value={password} onChange={onChange} className="form-control" />
                                <hr></hr>
                                <div className="login-btn">
                                    <MDBBtn className="" color="indigo" type="submit" onClick={onSubmit}>Login</MDBBtn>
                                </div>
                            </form>

                        </MDBCol>
                    </MDBRow>

                </MDBModalBody>

            </MDBModal>
        </MDBContainer>
    )
}


export default LoginModal;