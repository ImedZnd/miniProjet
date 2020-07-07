import React, { useContext, useEffect, Fragment } from "react";

import Home from "./Home";
import Dashboard from "./Dashboard";
import AdminUsers from "./Admin/AdminUsers";

import setAuthToken from '../Context/Auth/setAuthToken';

import AuthContext from '../Context/Auth/AuthContext';
import UserContext from '../Context/Users/UserContext';

import TopNavbar from "../layout/Navbar";

import { NotificationContainer } from "react-notifications"

import PrivateRoute from "../routes/PrivateRoute";
import { Switch, Route } from 'react-router-dom';



const PageContainer = () => {

    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        setAuthToken(localStorage.token);
        authContext.loadUser();
        userContext.loadAllUsers();
    }, [])


    return (
        <Fragment>
            <TopNavbar auth={authContext} users={userContext} />
            <NotificationContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/dashboard/" component={Dashboard} />

            </Switch>
        </Fragment>
    )
}

export default PageContainer