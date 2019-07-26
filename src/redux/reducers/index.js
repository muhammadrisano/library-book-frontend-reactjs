import { combineReducers } from 'redux';
import users from './users';
import books from './books';

const appReducer = combineReducers({
    users,
    books

});

export default appReducer;