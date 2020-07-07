import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'react-notifications/lib/notifications.css';

import AuthState from './Context/Auth/AuthState';
import UserState from './Context/Users/UserState';
import AccountState from './Context/Accounts/AccountsState';
import ClientState from "./Context/Client/ClientState";
import PageContainer from "./pages/PageContainer";


function App() {

  return (
    <div className="App">
      <AuthState>
        <UserState>
          <AccountState>
            <ClientState>
              <PageContainer />
            </ClientState>
          </AccountState>
        </UserState>
      </AuthState>
    </div>
  );
}

export default App;
