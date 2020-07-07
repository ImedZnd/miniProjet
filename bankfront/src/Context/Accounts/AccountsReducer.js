import {

    ALL_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT, FAIL_ACCOUNT, ADD_TRANSACTION, TRANSFER_SOLDE

} from '../Types';

export default (state, action) => {
    switch (action.type) {

        case ALL_ACCOUNTS:

            console.log(action.payload);
            return {
                ...state,
                accounts: action.payload
            }
        case ADD_ACCOUNT:
            console.log("add account");
            return {
                ...state,
                accounts: [action.payload, ...state.accounts]
            }
        case DELETE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.filter(account => account._id !== action.payload)
            }
        case UPDATE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.map(account =>
                    account._id === action.payload._id ? action.payload : account
                )
            }


        case FAIL_ACCOUNT:
            console.log("fail acc")
            return {
                ...state,
                error: "FAIL_ACCOUNT"
            }


        default: return state;
    }
}