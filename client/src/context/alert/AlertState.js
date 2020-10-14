import React, { useReducer } from 'react'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import { v4 } from 'uuid'

import {
    REMOVE_ALERT,
    SET_ALERT
} from '../types'

const AlertState = props => {
    const initialState = []

    const [state, dispatch] = useReducer(alertReducer, initialState)

    //  SET ALERT
    const setAlert = (msg, type, timeout = 3500) => {
        const id = v4()
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })

        setTimeout(() => {
            dispatch(({ type: REMOVE_ALERT, payload: id }))
        }, timeout)

    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )

}
export default AlertState