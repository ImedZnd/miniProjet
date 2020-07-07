import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import { NotificationManager } from "react-notifications"

const AdminTransferMoney = (props) => {

    const [form, setForm] = useState({
        from: '',
        to: '',
        amount: 0,
        description: ''

    })

    const onSubmit = async (e) => {

        if (form.from === '' && form.to === '') {
            NotificationManager.error("Make sure to fill all fields", "FIELDS MISSING")
        } else {
            const res = await props.accountsContext.updateSolde({
                from: form.from,
                to: form.to,
                amount: Number(form.amount)
            })
            console.log(res);
            if (!res) {
                props.accountsContext.addTransaction(
                    {
                        fromNum: form.from,
                        type: "Transfer",
                        value: form.amount,
                        toNum: form.to,
                        description: form.description
                    }
                )
                setForm({
                    from: '',
                    to: '',
                    amount: 0,
                    description: ''
                })
                NotificationManager.success("Money transferred with success", "TRANSFER SUCCESS");
            }

            else {
                NotificationManager.error("Transfer didn't work", "TRANSFER FAIL")
            }
        }
    }


    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <MDBContainer>
            <div style={{ "height": "30px" }}></div>
            <h1 style={{ "textAlign": "left" }}>
                Transfer money
           </h1>
            <MDBRow>

                <MDBCol md="12">
                    <div className="form-unit">
                        <MDBCard>
                            <MDBCardBody>
                                <form id="transferForm" >
                                    <p className="h4 text-center py-4">Transfer</p>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="From (Account Number)"
                                            name="from"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={form.from}
                                            onChange={onChange}
                                        />
                                        <MDBInput
                                            label="To (Account Number)"
                                            name="to"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={form.to}
                                            onChange={onChange}
                                        />
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
                                        <MDBInput onChange={onChange} type="textarea" label="Description" rows="5" name="description" value={form.description} />

                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn color="secondary" onClick={onSubmit}>
                                            Transfer
                            </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard></div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default AdminTransferMoney;