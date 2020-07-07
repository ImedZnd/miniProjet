import React, { useReducer } from 'react';
import axios from 'axios';


import ClientContext from './ClientContext';
import ClientReducer from './ClientReducer';

import {

    LOAD_ACCOUNTS, LOAD_TRANSACTIONS

} from '../Types';

const ClientState = props => {
    const initialState = {
        accounts: [],
        error: null,
        transactions: []
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const loadAccounts = async (id) => {
        console.log("called load all accounts")
        console.log("id:" + id);
        try {
            const res = await axios.get(`http://localhost:5454/api/account/${id}`);

            dispatch({
                type: LOAD_ACCOUNTS,
                payload: res.data
            });
        } catch (err) {
            //dispatch({ type: FAIL_ACCOUNT });
            console.log(err);
        }
    }

    const loadTransactions = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5454/api/transaction/byuser/${id}`);

            dispatch({
                type: LOAD_TRANSACTIONS,
                payload: res.data
            });
        } catch (err) {
            //dispatch({ type: FAIL_ACCOUNT });
            console.log(err);
        }
    }



    return (
        <ClientContext.Provider
            value={{
                accounts: state.accounts,
                error: state.error,
                transactions: state.transactions,
                loadAccounts, loadTransactions

            }}
        >
            {props.children}
        </ClientContext.Provider>
    );
};

export default ClientState;