import React, { useState } from "react";

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import { NotificationManager } from "react-notifications";

const ClientWithdraw = (props) => {
    const [form, setForm] = useState({
        from: "default",
        amount: 0,
        description: ''

    })

    const onSubmit = async (e) => {

        if (form.from !== 'default' && form.amount > 0) {
            const res = await props.accountsContext.updateSolde({
                from: form.from,
                to: form.from,
                amount: Number(-form.amount)
            })

            if (res) {
                NotificationManager.error("Check the amount")
            } else {
                props.accountsContext.addTransaction({

                    fromNum: form.from,
                    type: "Retrait",
                    value: Number(-form.amount),
                    toNum: form.from,
                    description: form.description

                })
                setForm({
                    from: '',

                    amount: 0,
                    description: ''
                })
                NotificationManager.success("Money withdrawal success");
            }
        } else {
            NotificationManager.error("Verify the fields", "FIELDS ERROR")
        }


    }

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    }



    const AccountsSelect = () => {
        return (
            props.accounts.map((account, i) => {
                return <option value={account.num}>{account.num} </option>;
            })
        )
    }

    return (
        <MDBContainer>
            <div style={{ "height": "30px" }}></div>
            <h2 style={{ "textAlign": "left" }}>
                Withdraw Money
            </h2>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <form id="transferForm" >
                                <p className="h4 text-center py-4">Withdraw</p>
                                <div className="grey-text">
                                    <label>Select an account</label>
                                    <select onChange={onChange} name="from" value={form.from} className="browser-default custom-select">
                                        <option value="default">Select an account</option>
                                        <AccountsSelect />
                                    </select>

                                    <MDBInput
                                        label="Amount"
                                        name="amount"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        value={form.amount}
                                        onChange={onChange}
                                    />
                                    <div>
                                        <MDBInput onChange={onChange} type="textarea" label="Description" rows="5" name="description" value={form.description} />
                                    </div>
                                </div>

                                <div className="text-center py-4 mt-3">
                                    <MDBBtn color="secondary" onClick={onSubmit}>
                                        Withdraw
                            </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>)
}

export default ClientWithdraw;