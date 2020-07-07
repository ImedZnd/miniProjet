import React, { useState, useEffect, useContext } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import "../../css/Modal.css";

import UserContext from "../../Context/Users/UserContext";

import { NotificationManager } from "react-notifications";

const CreateUserModal = (props) => {


    const userContext = useContext(UserContext);


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cin: '',
        phone: ''
    })


    const { email, password, cin, name, phone } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (user.email === "" || user.name === "" || user.password === "" || user.cin === "" || user.password === ""

        ) {
            NotificationManager.error("Make sure to fill all fields", "EMPTY FIELD");
        }
        else {
            const res = await userContext.addUser({
                "email": email,
                "password": password,
                "cin": cin,
                "role": "client",
                "name": name,
                "phone": phone

            })

            console.log(res);
            if (res === "ADD USER FAILED") {
                NotificationManager.error("Verify provided information!", "CREATE USER FAILED");
                userContext.loadAllUsers();
            } else {
                NotificationManager.success("User created successfuly!", "CREATE USER SUCCESS");
                props.toggle();
            }
        }
    }


    return (
        <MDBContainer>
            <MDBModal isOpen={props.isOpen} toggle={props.toggle} centered>
                <MDBModalHeader toggle={props.toggle}>
                    <p className="h4 text-center ">Create a user account</p>
                </MDBModalHeader>
                <MDBModalBody>

                    <MDBRow>
                        <MDBCol >
                            <form>
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    CIN
                                </label>
                                <input type="text" id="defaultFormLoginEmailEx" name="cin" value={cin} onChange={onChange} className="form-control" />

                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Name
                                </label>
                                <input type="text" id="defaultFormLoginEmailEx" name="name" value={name} onChange={onChange} className="form-control" />


                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Phone
                                </label>
                                <input type="text" id="defaultFormLoginEmailEx" name="phone" value={phone} onChange={onChange} className="form-control" />
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Email
                                </label>
                                <input type="email" id="defaultFormLoginEmailEx" name="email" value={email} onChange={onChange} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Password
                                </label>
                                <input type="text" id="defaultFormLoginPasswordEx" name="password" value={password} onChange={onChange} className="form-control" />
                                <hr></hr>
                                <div className="login-btn">
                                    <MDBBtn className="" color="secondary" type="submit" onClick={onSubmit}>CREATE</MDBBtn>
                                </div>
                            </form>

                        </MDBCol>
                    </MDBRow>

                </MDBModalBody>

            </MDBModal>
        </MDBContainer>
    )
}


export default CreateUserModal;