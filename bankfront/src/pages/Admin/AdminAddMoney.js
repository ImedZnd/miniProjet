import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import { NotificationManager } from "react-notifications"

const AdminTransferMoney = (props) => {

    const [form, setForm] = useState({
        num: '',
        amount: 0,
        description: ''

    })

    const onSubmit = async (e) => {


        if (form.from === '' && form.amount === 0) {
            NotificationManager.error("Verify the fields", "FIELDS ERROR")
        } else {


            const res = await props.accountsContext.updateAccount({
                num: form.num,
                amount: Number(form.amount)
            })
            if (!res) {
                setForm({
                    num: '',
                    amount: 0,
                    description: ''
                })

                props.accountsContext.addTransaction(
                    {
                        fromNum: "Admin BANK",
                        type: "Virement",
                        value: form.amount,
                        toNum: form.num,
                        description: form.description,
                        aId: props.authContext.user._id
                    }
                )

                NotificationManager.success("Money added with success", "TRANSFER SUCCESS");
            } else {
                NotificationManager.error("Add money failed", "TRANSFER FAIL")
            }

        }
    }

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <MDBContainer>
            <div style={{ "height": "30px" }}></div>
            <h2 style={{ "textAlign": "left" }}>
                Add balance
           </h2>
            <MDBRow>
                <MDBCol md="12">
                    <div className="form-unit">
                        <MDBCard>
                            <MDBCardBody>
                                <form id="transferForm" >
                                    <p className="h4 text-center py-4">Add balance</p>
                                    <div className="grey-text">
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
                                            label="Amount"
                                            name="amount"
                                            group
                                            type="Number"
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
                        </MDBCard> </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default AdminTransferMoney;