import React from "react";


import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const TransactionSection = (props) => {
    return (
        <div>

            <div className="transaction-unit">
                <MDBRow>
                    <MDBCol md={4}>
                        <div>From:{props.transaction.fromNum}</div>
                        <div>Type: {props.transaction.type}</div>
                    </MDBCol>
                    <MDBCol md={4}>
                        <div>To: {props.transaction.toNum}</div>
                        <div>Amount: {props.transaction.value}</div>
                    </MDBCol>
                    <MDBCol md={4}>
                        <div>Date: {props.transaction.date}</div>

                    </MDBCol>
                </MDBRow>
            </div>

        </div>
    )
}

export default TransactionSection;