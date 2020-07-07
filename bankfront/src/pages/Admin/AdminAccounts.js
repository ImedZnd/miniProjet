import React, { useState } from "react"

import { MDBDataTable, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBContainer } from 'mdbreact';

import TransactionSection from "./TransactionSection";

import { NotificationManager } from "react-notifications";

const AdminAccounts = (props) => {


    const [activeTransactions, setActiveTransactions] = useState('');

    const [form, setForm] = useState({
        num: '',
        cin: '',
        solde: 0

    })

    const onSubmit = async (e) => {
        e.preventDefault();

        if (form.cin === "" || form.num === "") {
            NotificationManager.error("Make sure to fill all fields", "EMPTY FIELDS");
        } else {
            const res = await props.accountContext.addAccountByCin(
                {
                    num: form.num,
                    cin: form.cin,
                    solde: form.solde
                }
            )
            console.log(res);
            await test(res);

        }
    }

    const test = (r) => {
        if (r === "ADD ACCOUNT FAIL") {
            NotificationManager.error("Verify the fields", "ADD ACCOUNT FAIL");
        } else {
            NotificationManager.success("Account added", "ADD SUCCESS");
            setForm({
                num: '',
                type: '',
                solde: 0
            })
        }
    }



    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const viewTransaction = (t) => {
        setActiveTransactions(t)
        console.log(t);
    }

    const DeleteAccount = (u) => {
        props.accountContext.deleteAccount(u);
        NotificationManager.success("Account deleted", "ADD SUCCESS");
    }


    const columns = [
        {
            label: 'Num',
            field: 'num',
            sort: 'asc',

        },
        {
            label: 'User',
            field: 'user',
            sort: 'asc',

        }, {
            label: 'Solde',
            field: 'solde',
            sort: 'asc',
        },
        {
            label: 'Transactions',
            field: 'view',
            sort: 'asc',
        },
        {
            label: 'Delete',
            field: 'delete',
            sort: 'asc',
        }

    ]

    const rows = props.accounts.map(account => ({
        id: account._id, num: account.num, user: account._id, solde: account.solde + " TND",
        view: <MDBBtn color="secondary" onClick={() => viewTransaction(account.transactions)} > View</MDBBtn >,
        delete: <MDBBtn color="secondary" onClick={() => DeleteAccount(account._id)}> delete</MDBBtn>
    }));

    const data = {
        columns: columns, rows: rows
    }

    const Trs = () => {
        return (activeTransactions.map((transaction) => {
            return <div><TransactionSection transaction={transaction} /></div>;
        }))
    };



    return (
        <div>
            <div style={{ "height": "30px" }}></div>
            <h1 style={{ "textAlign": "left" }}>
                Bank Accounts Management
           </h1>


            <MDBRow>



                <MDBCol md="12">
                    <div className="form-unit">
                        <MDBCard>
                            <MDBCardBody>
                                <form id="transferForm" >
                                    <div style={{ "textAlign": "left" }}>
                                        <div className="h4 text-center py-4">Create a banking account</div>
                                    </div>

                                    <div className="grey-text">
                                        <MDBInput
                                            label="Client CIN"
                                            name="cin"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={form.cin}
                                            onChange={onChange}
                                        />

                                        <MDBInput
                                            label="Account Number"
                                            name="num"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={form.num}
                                            onChange={onChange}
                                        />

                                        <MDBInput
                                            label="Solde"
                                            name="solde"
                                            group
                                            type="Number"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={form.solde}
                                            onChange={onChange}
                                        />

                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn color="secondary" onClick={onSubmit}>
                                            CREATE
                            </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard></div>
                </MDBCol>
            </MDBRow>
            <div style={{ "height": "30px" }}></div>
            <h2 style={{ "textAlign": "left" }}>
                Bank Accounts Management
           </h2>

            <div>
                <MDBRow>
                    <MDBCol md={11}>

                        <MDBDataTable
                            data={data}
                        />
                    </MDBCol>
                </MDBRow>
            </div>
            <div>
                <h2 style={{ "textAlign": "left" }}>
                    Transactions
                </h2>
                <div>
                    {activeTransactions !== '' ? <Trs /> : <div></div>}
                    {activeTransactions.length === 0 ? <h3> Select a transaction to view </h3> : <div></div>}
                </div>
            </div>

        </div>

    )
}

export default AdminAccounts;