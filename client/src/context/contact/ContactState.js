import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import axios from 'axios'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [],
        error: null,
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // ADD CONTACT
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)

            dispatch({ type: ADD_CONTACT, payload: res.data })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    // DELETE CONTACT
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }
    // SET CURRENT CONTACT
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    // CLEAR CURRENT CONTACT
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    // UPDATE CONTACT
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }
    // FILTER CONTACTS
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    // CLEAR FILTER
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                clearFilter,
                filterContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )

}
export default ContactState