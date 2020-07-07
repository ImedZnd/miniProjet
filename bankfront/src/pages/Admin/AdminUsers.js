import React, { useContext, useEffect, useState } from "react";

import UserContext from "../../Context/Users/UserContext";
import AccountsContext from "../../Context/Accounts/AccountsContext";

import UserCard from "./UserCard";

import CreateUserModal from "../Admin/CreateUserModal";
import CreateAccountModal from "../Admin/CreateAccountModal";


import { MDBDataTable, MDBBtn, MDBRow, MDBCol, MDBContainer } from 'mdbreact';

import { NotificationManager } from "react-notifications";


const AdminUsers = () => {

    const userContext = useContext(UserContext);
    const accountContext = useContext(AccountsContext);

    useEffect(() => {
        userContext.loadAllUsers();
    }, [])

    const [isOpen, setIsOpen] = useState(false);

    const [toggledLogin, setToggledLogin] = useState(false)

    const [user, setUser] = useState("");

    const ToggleLogin = () => {
        setToggledLogin(!toggledLogin);
    }

    const ToggleCollapse = () => {
        setIsOpen(!isOpen);

    }

    const [isOpenAcc, setIsOpenAcc] = useState(false);

    const [toggledLoginAcc, setToggledLoginAcc] = useState(false)

    const ToggleLoginAcc = () => {
        setToggledLoginAcc(!toggledLoginAcc);
    }

    const ToggleCollapseAcc = () => {
        setIsOpenAcc(!isOpenAcc);


    }



    const AddAccFunction = (u) => {
        setUser(u);
        ToggleLoginAcc();
    }



    const DeleteUser = (u) => {
        userContext.deleteUser(u);
        NotificationManager.success("User deleted sucess");
    }


    const columns2 = [
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',

        },
        {
            label: 'Email',
            field: 'email',
            sort: 'asc',

        },
        {
            label: 'Cin',
            field: 'cin',
            sort: 'asc',
        },
        {
            label: 'Phone',
            field: 'phone',
            sort: 'asc',
        },
        {
            label: 'Delete User',
            field: 'deleteBtn',
            sort: 'asc',
        },

        {
            label: 'Add Account',
            field: 'addAccBtn',
            sort: 'asc',
        }
    ]
    const rows = Array.from(userContext.users).map(user => ({
        id: user._id, name: user.name, email: user.email, cin: user.cin, phone: user.phone, user: user,
        deleteBtn: <MDBBtn color="secondary" onClick={() => DeleteUser(user._id)}> delete</MDBBtn>,
        addAccBtn: <MDBBtn color="success" onClick={() => AddAccFunction(user)}>+</MDBBtn>
    }));


    const data = {
        columns: columns2, rows: rows
    }

    if (userContext.users !== [] && userContext.users.length === 0) {
        return <div>

            <div style={{ "height": "30px" }}></div>
            <div style={{ "textAlign": "left" }}>
                <h1>
                    Client Management
                </h1>
            </div>
            <div>
                <MDBBtn color="secondary" onClick={ToggleLogin}> CREATE USER</MDBBtn>
            </div>

            <div>
                <MDBRow>
                    <MDBCol md={11}>
                        <MDBDataTable data={data} />
                    </MDBCol>
                </MDBRow>

            </div>
            <CreateUserModal isOpen={toggledLogin} toggle={ToggleLogin} />
            <CreateAccountModal isOpen={toggledLoginAcc} toggle={ToggleLoginAcc} user={user} />
        </div>;
    }


    return (
        <div>
            <div style={{ "height": "30px" }}></div>
            <div style={{ "textAlign": "left" }}>
                <h1>
                    Client Management
                </h1>
            </div>
            <div>
                <MDBBtn color="secondary" onClick={ToggleLogin}> CREATE USER</MDBBtn>
            </div>

            <div>
                <MDBRow>
                    <MDBCol md={11}>
                        <MDBDataTable data={data} />
                    </MDBCol>
                </MDBRow>

            </div>
            <CreateUserModal isOpen={toggledLogin} toggle={ToggleLogin} />
            <CreateAccountModal isOpen={toggledLoginAcc} toggle={ToggleLoginAcc} user={user} />
        </div>

    )
}


export default AdminUsers;
