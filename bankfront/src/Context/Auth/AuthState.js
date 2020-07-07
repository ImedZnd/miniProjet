import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from "./setAuthToken";

import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import {

    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR

} from '../Types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: "",
        loading: true,
        user: '',
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);



    //load user 
    const loadUser = async () => {
        setAuthToken(localStorage.token);

        try {
            const res = await axios.get('http://localhost:5454/api/auth/me');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    }


    //login
    const login = async data => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5454/api/auth', data, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            console.log("logged")
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response
            });
            return ("LOGIN ERROR");
        }
    }


    const logout = () => dispatch({ type: LOGOUT });


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,

                login,
                logout,
                loadUser,

            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;