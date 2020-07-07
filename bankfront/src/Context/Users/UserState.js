import React, { useReducer } from 'react';
import axios from 'axios';


import UserContext from './UserContext';
import userReducer from './UserReducer';
import {

    ALL_USERS, FETCH_FAIL, USER, DELETE_USER, ADD_USER, UPDATE_USER, ALL_TRANSACTION

} from '../Types';

const UserState = props => {
    const initialState = {
        users: [],
        transactions: [],
        error: null
    };

    const [state, dispatch] = useReducer(userReducer, initialState);


    const loadAllUsers = async () => {

        console.log("called load all users")
        try {

            const res = await axios.get('http://localhost:5454/api/users/all');

            dispatch({
                type: ALL_USERS,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: FETCH_FAIL });
        }
    }

    const loadUser = async () => {

        console.log("called load  user")
        try {

            const res = await axios.get('http://localhost:5454/api/users/');

            dispatch({
                type: USER,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: FETCH_FAIL });
        }
    }

    const loadTransactions = async () => {

        console.log("called load  user")
        try {

            const res = await axios.get('http://localhost:5454/api/transaction/');

            dispatch({
                type: ALL_TRANSACTION,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: FETCH_FAIL });
        }
    }


    const addUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5454/api/users/', user, config);

            dispatch({
                type: ADD_USER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_FAIL,
                payload: err.response.msg
            });
            return ("ADD USER FAILED");
        }
    };


    const deleteUser = async id => {
        try {
            await axios.delete(`http://localhost:5454/api/users/${id}`);

            dispatch({
                type: DELETE_USER,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: FETCH_FAIL,
                payload: err.response.msg
            });
        }
    };

    const updateUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`http://localhost:5454/api/users/${user._id}`, user, config);

            dispatch({
                type: UPDATE_USER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_FAIL,
                payload: err.response.msg
            });
        }
    };


    return (
        <UserContext.Provider
            value={{
                users: state.users,
                error: state.error,
                transactions: state.transactions,
                loadAllUsers,
                addUser,
                deleteUser,
                updateUser,
                loadTransactions
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;