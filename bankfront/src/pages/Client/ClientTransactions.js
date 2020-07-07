import React from "react"

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const ClientTransactions = (props) => {


    const TransactionCard = (p) => {
        return (
            <div className="tr-card">
                <MDBRow>
                    <div className="tr-row">Transaction ID: {p.tr._id}</div>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={2}>
                        <div className="uppder-text">
                            From
                      </div>
                        <div>
                            {p.tr.fromNum}
                        </div>
                    </MDBCol>
                    <MDBCol md={2}>
                        <div className="uppder-text">
                            To
                      </div>
                        <div>
                            {p.tr.toNum}
                        </div>
                    </MDBCol>
                    <MDBCol md={2}>
                        <div className="uppder-text">
                            Amount
                      </div>
                        <div>
                            {p.tr.value + " TND"}
                        </div>
                    </MDBCol>
                    <MDBCol md={2}>
                        <div className="uppder-text">
                            Action
                      </div>
                        <div>
                            {p.tr.type}
                        </div>
                    </MDBCol>
                    <MDBCol md={3}>
                        <div className="uppder-text">
                            Description
                      </div>
                        <div>
                            {p.tr.description}
                        </div>
                    </MDBCol>
                </MDBRow>
            </div>)
    }

    const Transactions = () => {

        return (props.transactions.map((tr, i) => {
            return (<div>
                <TransactionCard key={i} tr={tr} />
            </div>);

        }))
    }

    const NoTransactions = () => {
        return (<div>
            <h2>
                No Transactions have been made
            </h2>
        </div>)
    }

    return (
        <div>
            <div style={{ "height": "30px" }}></div>
            <h2 style={{ "textAlign": "left" }}>
                Your Transactions
                </h2>
            <div>
                {props.transactions.length === 0 ? <NoTransactions /> : <Transactions />}
            </div>
        </div>
    )


}


export default ClientTransactions;