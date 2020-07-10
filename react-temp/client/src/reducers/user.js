import {
    GET_USERS,
    USER_ERROR,
    ADD_USER,
    DELETE_USER,
    UPDATE_USER

} from '../actions/types';

const initialState = {
    rooms: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                rooms: payload,
                loading: false
            }
        case ADD_USER:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false
            }
        case UPDATE_USER:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false
            }
        case DELETE_USER:
            return {
                ...state,
                rooms: state.rooms.filter(room => room._id !== payload),
                loading: false
            }
        case USER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}