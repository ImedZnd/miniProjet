import React from "react"

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const AnalyticsDashboard = (props) => {



    const NoUsers = () => {
        return (
            <div>
                <h4>
                    No recent clients
                </h4>
            </div>
        )
    }

    const RecentUserCard = (u) => {
        return (<div className="recent-unit">
            <MDBRow>
                <MDBCol md={4}>
                    <div>{u.user.name}</div>
                    <div>CIN: {u.user.cin}</div>
                </MDBCol>
                <MDBCol md={4}>
                    <div>{u.user.phone}</div>
                    <div>{u.user.email}</div>
                </MDBCol>
            </MDBRow>
        </div>)
    }


    const RecentTransactionCard = (u) => {
        return (<div className="recent-unit">
            <MDBRow>
                <MDBCol md={4}>
                    <div>From: {u.tr.fromNum}</div>
                    <div>Type: {u.tr.type}</div>
                </MDBCol>
                <MDBCol md={4}>
                    <div>To: {u.tr.toNum}</div>
                    <div>Amount: {u.tr.value}</div>
                </MDBCol>
            </MDBRow>
        </div>)
    }

    const RecentUsers = () => {
        if (props.user.users.length === 0) {
            return (
                <NoUsers></NoUsers>
            )
        } else {
            if (props.user.users.length >= 4) {


                return (
                    props.user.users.slice(props.user.users.length - 4).map((u) => {
                        return <RecentUserCard user={u} />;
                    })
                )
            } else {
                return (
                    props.user.users.map((u) => {
                        return <RecentUserCard user={u} />;
                    })
                )
            }
        }
    }


    const RecentTransactions = () => {
        if (props.user.transactions.length === 0) {
            return (
                <div>
                    <h4>
                        No recent transactions
                    </h4>
                </div>
            )
        } else {
            if (props.user.transactions.length >= 4) {

                const rev = props.user.transactions.reverse();
                return (
                    props.user.transactions.slice(props.user.transactions.length - 4).map((u) => {
                        return <RecentTransactionCard tr={u} />;
                    })
                )
            } else {

                return (
                    props.user.transactions.map((u) => {
                        return <RecentTransactionCard tr={u} />;
                    })
                )
            }
        }
    }


    return (
        <div style={{ "marginTop": "30px" }}>

            <div className="top-section-a">
                <MDBRow>
                    <MDBCol md={6}>
                        <div> <h3>Welcome back,</h3></div>
                        <div className="text-secondary"><h4>{props.auth.user.name}</h4></div>
                    </MDBCol>
                    <MDBCol md={3}>
                        <div> <h3>Clients</h3></div>
                        <div className="text-secondary"><h4>{props.user.users.length}</h4></div>
                    </MDBCol>
                    <MDBCol md={3}>
                        <div> <h3>Bank Accounts</h3></div>
                        <div className="text-secondary"><h4>{props.accounts.accounts.length}</h4></div>
                    </MDBCol>
                </MDBRow>
            </div>
            <div style={{ "height": "25px" }}></div>
            <div>
                <MDBRow>
                    <MDBCol md={6}>
                        <div style={{ "textAlign": "left" }} >
                            <h3>Most recent clients</h3>
                        </div>
                        <div className="top-section-a recents">
                            <RecentUsers></RecentUsers>
                        </div>
                    </MDBCol>
                    <MDBCol md={6}>
                        <div style={{ "textAlign": "left" }}>
                            <h3>Most recent transactions</h3>
                        </div>
                        <div className="top-section-a recents">
                            <RecentTransactions></RecentTransactions>
                        </div>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    )
}

export default AnalyticsDashboard;