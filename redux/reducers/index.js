import { combineReducers } from 'redux';
import User from './user_reducer';
import Cart from './carts'
import Spinner from './spinner'
const rootReducer = combineReducers({
    User, Cart, Spinner
});
export default rootReducer;