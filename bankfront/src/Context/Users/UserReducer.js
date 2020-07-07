import {

    ALL_USERS, FETCH_FAIL, USER, ADD_USER, DELETE_USER, UPDATE_USER, ALL_TRANSACTION

} from '../Types';

export default (state, action) => {
    switch (action.type) {

        case ALL_USERS:

            console.log(action.payload);
            return {
                ...state,
                users: action.payload
            }
        case ALL_TRANSACTION:

            console.log(action.payload);
            return {
                ...state,
                transactions: action.payload
            }
        case FETCH_FAIL:
            console.log("error fetching all users");
            return {
                ...state,
                users: '',
                error: 'fetch all users fail'
            }
        case USER:
            return {
                ...state
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            }
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }

        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user =>
                    user._id === action.payload._id ? action.payload : user
                )
            };
        default: return state;
    }
}