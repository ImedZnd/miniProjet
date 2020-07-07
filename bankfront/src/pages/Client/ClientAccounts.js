import React from "react";

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import "../../css/Scrollbar.css"
import "../../css/Client.css"

const ClientAccounts = (props) => {

    const AccComponent = (p) => {
        return (
            <div className="top-section" style={{ "marginTop": "10px" }}>

                <MDBRow>
                    <MDBCol>
                        <div className="uppder-text">
                            Account Number:
                        </div>
                        <div className="downer-text">
                            {p.acc.num}
                        </div>
                    </MDBCol>

                    <MDBCol>
                        <div className="uppder-text">Balance:</div>
                        <div className="downer-text"> {p.acc.solde}  TND</div>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }

    const TransComponent = (p) => {
        return (
            <div className="top-section">
                <MDBRow>
                    <MDBCol>
                        <div className="uppder-text">
                            From:
                        </div>
                        <div className="downer-text">
                            {p.tr.fromNum}
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div className="uppder-text">
                            To:
                        </div>
                        <div className="downer-text"> {p.tr.toNum}</div>
                    </MDBCol>
                    <MDBCol>
                        <div className="uppder-text">
                            Amount:
                        </div>
                        <div className="downer-text"> {p.tr.value}</div>
                    </MDBCol>
                    <MDBCol>
                        <div className="uppder-text">
                            Action:
                        </div>
                        <div>{p.tr.type}</div>
                    </MDBCol>
                    <MDBCol>
                        <div className="uppder-text">
                            Date:
                        </div>
                        <div className="downer-text">{p.tr.date}</div>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }

    const Accs = () => {
        if (props.accounts.length === 0) {
            return (
                <h3>
                    You do not have any bank account
                </h3>
            )
        }

        return (props.accounts.map((acc, i) => {
            return <div>
                <AccComponent key={i} acc={acc} />
            </div>;
        }))
    };

    const Trans = () => {
        if (props.transactions.length === 0) {
            return (
                <div>
                    You do not have any transactions
                </div>
            )
        } else if (props.transactions.length === 1) {
            return (
                <div>
                    <TransComponent tr={props.transactions[0]} />
                </div>

            )
        } else if (props.transactions.length >= 2) {
            return (
                <div>
                    <TransComponent tr={props.transactions[0]} />
                    <TransComponent tr={props.transactions[1]} />
                </div>
            )
        }
        else if (props.transactions.length >= 3) {
            return (
                <div>
                    <TransComponent tr={props.transactions[0]} />
                    <TransComponent tr={props.transactions[1]} />
                    <TransComponent tr={props.transactions[2]} />
                </div>
            )
        }
    }


    return (
        <div>
            <div className="">

            </div>
            <div>
                <div style={{ "height": "30px" }}></div>
                <h2 style={{ "textAlign": "left" }}>
                    Your Accounts
                </h2>
                <div >
                    <div style={{ "height": "200px" }} className="scrollbar scrollbar-primary">

                        <div>
                            <Accs />
                        </div>

                    </div>
                </div>
            </div>


            <div>
                <div style={{ "height": "30px" }}></div>
                <h2 style={{ "textAlign": "left" }}>
                    Recent Transactions
                </h2>
                <div >
                    <div style={{ "height": "200px" }} className="scrollbar scrollbar-primary">

                        <div>
                            <Trans />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}


export default ClientAccounts;