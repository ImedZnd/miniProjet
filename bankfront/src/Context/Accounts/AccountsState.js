import React, { useReducer } from 'react';
import axios from 'axios';


import AccountsContext from './AccountsContext';
import AccountsReducer from './AccountsReducer';

import {

    ALL_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT, FAIL_ACCOUNT, ADD_TRANSACTION, TRANSFER_SOLDE

} from '../Types';

const AccountState = props => {
    const initialState = {
        accounts: [],

        error: null
    };

    const [state, dispatch] = useReducer(AccountsReducer, initialState);

    const loadAccounts = async () => {
        console.log("called load all accounts")
        try {
            const res = await axios.get('http://localhost:5454/api/account/all');

            dispatch({
                type: ALL_ACCOUNTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: FAIL_ACCOUNT });
        }
    }

    const addTransaction = async (transaction) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5454/api/transaction/bynum', transaction, config);
            loadAccounts();

        } catch (err) {
            dispatch({
                type: FAIL_ACCOUNT,
                payload: err.response
            });
        }
    }



    const updateSolde = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`http://localhost:5454/api/account/transfer`, data, config);

            console.log("account 1 " + res.data[0])
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: res.data[0]
            });
            console.log("account 2 " + res.data[1])
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: res.data[1]
            });
        } catch (err) {
            dispatch({
                type: FAIL_ACCOUNT,
                payload: err.response.msg
            });
            return ("UPDATE SOLDE FAIL");
        }

    }

    const addAccount = async acc => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log("add account");
        console.log(acc);
        try {
            const res = await axios.post('http://localhost:5454/api/account/', acc, config);

            dispatch({
                type: ADD_ACCOUNT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FAIL_ACCOUNT,
                payload: err.msg
            });
            return ("ADD ACCOUNT FAIL");
        }
    };


    const addAccountByCin = async acc => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log("add account");
        console.log(acc);
        try {
            const res = await axios.post('http://localhost:5454/api/account/bycin', acc, config);

            dispatch({
                type: ADD_ACCOUNT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FAIL_ACCOUNT,
                payload: err.msg
            });

            return ("ACCOUNT ADD FAIL");
        }
    };

    const deleteAccount = async id => {
        try {
            await axios.delete(`http://localhost:5454/api/account/${id}`);

            dispatch({
                type: DELETE_ACCOUNT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: FAIL_ACCOUNT,
                payload: err.response.msg
            });
        }
    };


    const updateAccount = async account => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`http://localhost:5454/api/account/solde`, account, config);

            dispatch({
                type: UPDATE_ACCOUNT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FAIL_ACCOUNT,
                payload: err.response.msg
            });
            return ("UPDATE ACCOUNT FAIL");
        }
    };



    return (
        <AccountsContext.Provider
            value={{
                accounts: state.accounts,
                error: state.error,
                loadAccounts,
                addAccount,
                deleteAccount,
                updateAccount,
                updateSolde,
                addTransaction,
                addAccountByCin
            }}
        >
            {props.children}
        </AccountsContext.Provider>
    );
};

export default AccountState;