import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

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
    const loadUser = async () => {
        //  LOAD TOKEN INTO GLOBAL HEADERS
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }


        try {
            const res = await axios.get('/api/auth')

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
    //  REGISTER USER
    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            loadUser()

        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }
    //  LOGIN USER

    //  LOGOUT 

    //  CLEAR ERRORS
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    })
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                clearErrors,
                loadUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthState