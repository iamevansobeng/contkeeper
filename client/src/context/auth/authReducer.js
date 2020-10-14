import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REMOVE_ALERT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_ERRORS
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                ...action.payload,
                isAuthenticated: null,
                loading: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}