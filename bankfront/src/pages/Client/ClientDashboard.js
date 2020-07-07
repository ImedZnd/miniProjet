import React, { useEffect, useState, useContext } from "react";

import { MDBRow, MDBCol } from "mdbreact";


import AccountsContext from "../../Context/Accounts/AccountsContext";
import ClientMenu from "./ClientMenu"
import ClientContext from "../../Context/Client/ClientContext";
import ClientAccounts from "../Client/ClientAccounts";
import ClientTransactions from "../Client/ClientTransactions";
import ClientTransfer from "../Client/ClientTransfer";
import ClientWithdraw from "../Client/ClientWithdraw";

const ClientDashboard = (props) => {

    const accountContext = useContext(AccountsContext)
    const clientContext = useContext(ClientContext);

    const [page, setPage] = useState("accounts");

    useEffect(() => {
        //accountContext.loadAccounts();
        clientContext.loadAccounts(props.auth.user._id);
        clientContext.loadTransactions(props.auth.user._id);

        // console.log(clientContext.accounts);
    }, [props.auth.user._id])

    const onChangePage = e => {
        e.preventDefault();
        setPage(e.target.name)
    }

    const renderSwitch = (page) => {
        switch (page) {

            case 'accounts':
                return <ClientAccounts accounts={clientContext.accounts} transactions={clientContext.transactions} />
            case 'transactions':
                return <ClientTransactions transactions={clientContext.transactions} />;
            case 'transfer':
                return <ClientTransfer accounts={clientContext.accounts} accountsContext={accountContext} />;
            case 'withdraw':
                return <ClientWithdraw accounts={clientContext.accounts} accountsContext={accountContext} />;
            default:
                return page;
        }
    }

    return (
        <div>

            <MDBRow>
                <MDBCol lg="2">
                    <ClientMenu onChange={onChangePage} page={page} />
                </MDBCol>
                <MDBCol>
                    {renderSwitch(page)}
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default ClientDashboard;
