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

                    {/*<MDBNavLink className={(props.page === "dashboard") ? "active-link" : "non-active-link"}
                              onClick={props.onChange} name="dashboard"><i class="uil uil-dashboard zicon"></i> <span
                        className="ztext"> Dashboard</span></MDBNavLink>

                    <MDBNavLink className={(props.page === "MyCar") ? "active-link" : "non-active-link"}
                              onClick={props.onChange} name="MyCar"><i className="uil uil-car zicon"> </i> <span
                        className="ztext"> Ma voiture</span></MDBNavLink>

                    <MDBNavLink className={(props.page === "appointments") ? "active-link" : "non-active-link"}
                              onClick={props.onChange} name="appointments"><i class="uil uil-schedule zicon"></i> <span
                        className="ztext"> Mes RDV</span></MDBNavLink>

                    <MDBNavLink className={(props.page === "analytics") ? "active-link" : "non-active-link"}
                              onClick={props.onChange} name="analytics"><i
                        class="uil uil-chart-line zicon"></i> Analytique</MDBNavLink>*/}
                    <MDBNavLink to="#!" className={(props.page === "dashboard") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="dashboard"><i class="uil uil-analytics zicon"></i> <span
                            className="ztext"> Dashboard</span></MDBNavLink>

                    <MDBNavLink to="#!" className={(props.page === "clients") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="clients"><i className="uil uil-users-alt zicon"> </i> <span
                            className="ztext"> Clients</span></MDBNavLink>

                    <MDBNavLink to="#!" className={(props.page === "accounts") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="accounts"><i class="uil uil-card-atm zicon"></i> <span
                            className="ztext"> Accounts</span></MDBNavLink>
                    <MDBNavLink to="#!" className={(props.page === "transfer") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="transfer"><i class="uil uil-exchange zicon"></i> <span
                            className="ztext"> Transfer</span></MDBNavLink>
                    <MDBNavLink to="#!" className={(props.page === "add") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="add"><i class="uil uil-money-withdraw zicon"></i> <span
                            className="ztext"> Add</span></MDBNavLink>
                    <MDBNavLink to="#!" className={(props.page === "remove") ? "active-link" : "non-active-link"}
                        onClick={props.onChange} name="remove"><i class="uil uil-money-insert zicon"></i> <span
                            className="ztext"> Remove</span></MDBNavLink>



                </MDBNav>

            </aside>
        </div>
    )
}

export default Menu;