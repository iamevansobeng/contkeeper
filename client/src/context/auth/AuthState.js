import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'

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

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null

    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    //  LOADING USER

    //  REGISTER USER

    //  LOGIN USER

    //  LOGOUT 

    //  CLEAR ERRORS

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthState