import {

    LOAD_ACCOUNTS, LOAD_TRANSACTIONS
} from '../Types';

export default (state, action) => {
    switch (action.type) {

        case LOAD_ACCOUNTS:

            console.log(action.payload);
            return {
                ...state,
                accounts: action.payload
            }

        case LOAD_TRANSACTIONS:

            console.log(action.payload);
            return {
                ...state,
                transactions: action.payload
            }



        default: return state;
    }
}