import axios from 'axios'
import {setAlert} from './alert'
import {
    GET_USERS,
    USER_ERROR,
    DELETE_USER,
    ADD_USER
    
} from './types'

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/user');
        dispatch ({
            type: GET_USERS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const addUser = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
       const res = await axios.post('/api/user', formData, config);
        dispatch ({
            type: ADD_USER,
            payload: res.data
        })

        dispatch (setAlert('User successfully created', 'success'))
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const deleteUser = userId => async dispatch => {
    try {
        await axios.delete(`/api/user/${userId}`);
        dispatch ({
            type: DELETE_USER,
            payload: userId
        })

        dispatch (setAlert('User successfully deleted', 'success'))
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}


