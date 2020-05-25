import axios from 'axios'
import {setAlert} from './alert'
import {
    GET_ROOMS, 
    ROOM_ERROR, 
    ADD_ROOM,
    DELETE_ROOM,
    UPDATE_ROOM
} from './types'

export const getRooms = () => async dispatch => {
    try {
        const res = await axios.get('/api/room');
        dispatch ({
            type: GET_ROOMS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: ROOM_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const addRoom = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
       const res = await axios.post('/api/room', formData, config);
        dispatch ({
            type: ADD_ROOM,
            payload: res.data
        })

        dispatch (setAlert('Room has been successfully created', 'success'))
    } catch (err) {
        dispatch({
            type: ROOM_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const deleteRoom = roomId => async dispatch => {
    try {
        await axios.delete(`/api/room/${roomId}`);
        dispatch ({
            type: DELETE_ROOM,
            payload: roomId
        })

        dispatch (setAlert('Room has been successfully deleted', 'success'))
    } catch (err) {
        dispatch({
            type: ROOM_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const updateRoom = roomId => async dispatch => {
    try {
        await axios.put(`/api/room/${roomId}`);
        dispatch ({
            type: UPDATE_ROOM,
            payload: roomId
        })
        dispatch (setAlert('Room updated', 'success'))
    } catch (err) {
        dispatch({
            type: ROOM_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}