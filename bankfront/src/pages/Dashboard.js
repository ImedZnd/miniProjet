import React, { useContext } from 'react';

import AuthContext from '../Context/Auth/AuthContext';
import UserContext from '../Context/Users/UserContext';

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ClientDashboard from "../pages/Client/ClientDashboard";


const Dashboard = () => {

    const authContext = useContext(AuthContext);

    const { user } = authContext;

    const userContext = useContext(UserContext);

    const renderSwitch = () => {
        switch (user.role) {
            case 'client':
                return <ClientDashboard auth={authContext} />
            case 'admin':
                return <AdminDashboard users={userContext} />
            default:
                return <ClientDashboard auth={authContext} />
        }
    }
    return (
        <div>
            {renderSwitch()}
        </div>
    );

}

export default Dashboard;