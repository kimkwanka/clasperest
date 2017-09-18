import { combineReducers } from 'redux';
import user from './userReducer';
import allClasps from './allClaspsReducer';

export default combineReducers({ user, allClasps });
