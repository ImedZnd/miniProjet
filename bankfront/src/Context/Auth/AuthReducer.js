import {

    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT

} from '../Types';

export default (state, action) => {
    switch (action.type) {

        case AUTH_ERROR:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: '',
                error: 'Register failed'
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            console.log('login sucess');
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            }

        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            console.log('login fail');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: '',
                error: 'Login failed'
            }

        case USER_LOADED:

            console.log(action.payload);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }

        default: return state;
    }
}