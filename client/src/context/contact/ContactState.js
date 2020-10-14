import React, { useReducer } from 'react'
import { v4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'
const fakeContacts = [
    {
        id: 1,
        name: 'Kooo Kusi',
        email: "kusi@gmail.com",
        phone: '123-245-776',
        type: 'personal'
    },
    {
        id: 2,
        name: 'Jason Statham',
        email: "jason@gmail.com",
        phone: '897-5659-776',
        type: 'professional'
    },
    {
        id: 3,
        name: 'James Bond',
        email: "james@gmail.com",
        phone: '445-245-776',
        type: 'personal'
    },
]
const ContactState = props => {
    const initialState = {
        contacts: fakeContacts, current: null, filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // ADD CONTACT
    const addContact = contact => {
        contact.id = v4()
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