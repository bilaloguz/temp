import {
    GET_ROOMS,
    ROOM_ERROR,
    ADD_ROOM,
    DELETE_ROOM,
    UPDATE_ROOM
} from '../actions/types';

const initialState = {
    rooms: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms: payload,
                loading: false
            }
        case ADD_ROOM:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false
            }
        case UPDATE_ROOM:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false
            }
        case DELETE_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter(room => room._id !== payload),
                loading: false
            }
        case ROOM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}