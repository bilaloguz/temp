import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import room from './room';
import user from './user';


export default combineReducers({
    alert,
    auth,
    room,
    user
});