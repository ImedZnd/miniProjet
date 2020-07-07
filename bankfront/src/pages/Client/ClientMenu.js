import React, { useContext } from "react";
//import {Nav} from "react-bootstrap";

import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

import "../../css/DashboardMenu.css";

import AuthContext from "../../Context/Auth/AuthContext";

const Menu = (props) => {

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    return (
        <div>

            <aside>
                <MDBNav className="flex-column card menu">
                    <div className="profile-div">


                        <div className="name">
                            {user.name}
                        </div>
                        <div className="email">
                            {user.email}
                        </div>
                    </div>




                    <MDBNavLink to="#!" className={(props.page === "accounts") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="accounts"><i className="uil uil-users-alt zicon"> </i> <span
                            className="ztext"> My Accounts</span></MDBNavLink>

                    <MDBNavLink to="#!" className={(props.page === "transactions") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="transactions"><i class="uil uil-card-atm zicon"></i> <span
                            className="ztext"> My Transactions</span></MDBNavLink>

                    <MDBNavLink to="#!" className={(props.page === "transfer") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="transfer"><i class="uil uil-money-withdraw zicon"></i> <span
                            className="ztext"> Transfer</span></MDBNavLink>

                    <MDBNavLink to="#!" className={(props.page === "withdraw") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="withdraw"><i class="uil uil-money-withdraw zicon"></i> <span
                            className="ztext"> Withdraw</span></MDBNavLink>




                </MDBNav>

            </aside>
        </div>
    )
}

export default Menu;