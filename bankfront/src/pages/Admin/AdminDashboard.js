import React, { useState, useEffect, useContext } from "react";

import AdminMenu from "./AdminMenu";
import AnalyticsDashboard from "./AnalyticsDashboard";
import AdminUsers from "./AdminUsers";
import AdminAccounts from "./AdminAccounts";
import AdminTransferMoney from "./AdminTransferMoney";
import AdminAddMoney from "./AdminAddMoney";
import AdminRemoveMoney from "./AdminRemoveMoney";

import { MDBRow, MDBCol } from "mdbreact";


import AccountsContext from "../../Context/Accounts/AccountsContext";
import AuthContext from "../../Context/Auth/AuthContext";
import UserContext from "../../Context/Users/UserContext";

const AdminDashboard = () => {

    const accountContext = useContext(AccountsContext)
    const authContext = useContext(AuthContext)
    const userContext = useContext(UserContext);

    const [page, setPage] = useState("dashboard");

    useEffect(() => {
        accountContext.loadAccounts();
        userContext.loadTransactions();

    }, [])

    const onChangePage = e => {
        e.preventDefault();
        setPage(e.target.name)
    }

    const renderSwitch = (page) => {
        switch (page) {
            case 'dashboard':
                return <AnalyticsDashboard accounts={accountContext} auth={authContext} user={userContext} />;
            case 'clients':
                return <AdminUsers />;
            case 'accounts':
                return <AdminAccounts accounts={accountContext.accounts} accountContext={accountContext} />;
            case 'transfer':
                return <AdminTransferMoney accountsContext={accountContext} />;
            case 'add':
                return <AdminAddMoney accountsContext={accountContext} authContext={authContext} />;
            case 'remove':
                return <AdminRemoveMoney accountsContext={accountContext} authContext={authContext} />;
            default:
                return page;
        }
    }

    return (
        <div>
            <MDBRow>
                <MDBCol lg="2">
                    <AdminMenu onChange={onChangePage} page={page} />
                </MDBCol>
                <MDBCol>
                    {renderSwitch(page)}
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default AdminDashboard;
