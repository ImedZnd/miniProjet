import React, { useState, useEffect, useContext } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';

import "../../css/Modal.css";

import UserContext from "../../Context/Users/UserContext";

import AccountsContext from '../../Context/Accounts/AccountsContext';

import { NotificationManager } from "react-notifications";

const CreateAccountModal = (props) => {


    const accountContext = useContext(AccountsContext);

    const [account, setAccount] = useState({
        solde: "0",
        num: "",
    })


    const { solde, num } = account;

    const onChange = e => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
        e.preventDefault();
        console.log("solde: " + solde + " num: " + num + " user: " + props.user._id);

        if (account.num === "") {
            NotificationManager.error("Make sure to fill all fields", "ACC NUMBER EMPTY");
        } else {
            const res = await accountContext.addAccount({
                "num": num,
                "solde": solde,
                "user": props.user._id
            })

            console.log(res);
            if (res) {
                NotificationManager.error("Verify the account number field", "ADD ACCOUNT FAIL");
            } else {
                NotificationManager.success("Account added", "ADD SUCCESS");
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
                                    USER
                                </label>
                                <input type="text" id="defaultFormLoginEmailEx" name="userCin" value={props.user.cin} onChange={onChange} className="form-control" />

                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Number
                                </label>
                                <input type="text" id="defaultFormLoginEmailEx" name="num" value={num} onChange={onChange} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Solde
                                </label>
                                <input type="text" id="defaultFormLoginPasswordEx" name="solde" value={solde} onChange={onChange} className="form-control" />
                                <hr></hr>
                                <div className="login-btn">
                                    <MDBBtn className="" color="indigo" type="submit" onClick={onSubmit}>CREATE</MDBBtn>
                                </div>
                            </form>

                        </MDBCol>
                    </MDBRow>

                </MDBModalBody>

            </MDBModal>
        </MDBContainer>
    )
}


export default CreateAccountModal;